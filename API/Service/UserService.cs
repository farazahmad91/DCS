using API.DBContext.Entities;
using Entities.Response;
using API.DBContext;
using Microsoft.AspNetCore.Identity;
using API.AppCode.IML;
using API.AppCode.ML;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using API.SendEmail;
using Microsoft.AspNetCore.Http;
using static System.Net.WebRequestMethods;
using Entities;
using System.Security.Cryptography;
using Microsoft.AspNetCore.Identity.Data;
using System.Net.Http;

namespace API.Service
{
    public class UserService : IUserService
    {

        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly IHashPassword _hashpass;
        private readonly IDapper _dapper;
        private readonly Sendmail _sendmail;
        private readonly IUserValidation _userValidation;
        private readonly IHttpContextAccessor _httpContextAccessor;
        private readonly HttpClient _httpClient;
        public UserService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IHashPassword hashpass, IDapper dapper, Sendmail sendmail, IUserValidation userValidation, IHttpContextAccessor httpContextAccessor, HttpClient httpClient)
        {
            _signInManager = signInManager;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            _hashpass=hashpass;
            _dapper=dapper;
            _sendmail=sendmail;
            _userValidation=userValidation;
            _httpContextAccessor=httpContextAccessor;
            _httpClient=httpClient;
        }
        public async Task<Response> RegisterAsync(RegisterViewModel model)
        {
            var response = new Response()
            {
                StatusCode = ResponseStatus.FAILED,
                ResponseText = "The email is already in use. Please choose a different email or log in with the existing account.",
            };
            try
            {
                var userexists = await userManager.FindByEmailAsync(model.Email);
                if (userexists != null)
                {
                    response.ResponseText = "User Already Exists";
                    response.StatusCode = ResponseStatus.FAILED;
                    return response;
                }
                ApplicationUser user = new ApplicationUser()
                {
                    UserName = model.Email,
                    Email = model.Email,
                    Name = model.Name,
                    PhoneNo = model.PhoneNo,
                    ProjectId = model.ProjectId,
                    EmailConfirmed = true,
                };
                var result = await userManager.CreateAsync(user, model.Password);
                if (!result.Succeeded)
                {
                    response.ResponseText = "SignUp Sucessfully";
                    response.StatusCode = ResponseStatus.FAILED;
                }
                if (result.Succeeded)
                {
                    response.ResponseText = "SignUp Sucessfully";
                    response.StatusCode = ResponseStatus.SUCCESS;
                }
                if (!await roleManager.RoleExistsAsync(model.Role))
                {
                    await roleManager.CreateAsync(new IdentityRole(model.Role));
                }
                if (await roleManager.RoleExistsAsync(model.Role))
                {
                    await userManager.AddToRoleAsync(user, model.Role);
                    response.ResponseText = "Registration Successs";
                    response.StatusCode = ResponseStatus.SUCCESS;
                }
                if (result.Succeeded)
                {
                    Register(model.Email, model.ConfirmPassword);
                    _userValidation.ValidateEmail(model.Email);
					response.ResponseText = "OTP has been sent your email address for verify Account!!";
					response.StatusCode = ResponseStatus.SUCCESS;
				}
                return response;
            }
            catch (Exception ex)
            {
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "RegisterAsync",
                    Error = ex.Message,
                    ProcName = "",
                };
                 new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
        }

        public async Task<Response> Register(string email, string password)
        {
            Response res = new Response();
            var sp = "sp_insert_user";
            try
            {
                var pass = _hashpass.EncodePasswordToBase64(password);
                var param = new
                {
                    username = email,
                    PasswordHash = pass,
                };
                var i = await _dapper.GetAsync<Response>(sp, param);
                res=i;
                return res;
            }
            catch (Exception ex)
            {
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "RegisterAsync",
                    Error = ex.Message,
                    ProcName = "",
                };
                 new ErrorLog_ML(_dapper).Error(error);
                return res;
            }
        }

        public async Task<Response<LoginResponse>> LoginAsync(LoginViewModel model)
        {

            var response = new Response<LoginResponse>();

            try
            {
                var userExists = await userManager.FindByEmailAsync(model.Email);
                if (userExists == null)
                {
                    response.StatusCode = ResponseStatus.FAILED;
                    response.ResponseText = "Invalid Username or Password";
                    return response;
                }

                var result = await userManager.CheckPasswordAsync(userExists, model.Password);
                if (!result)
                {
                    // If Invalid Password, Add 1 in InvalidLoginAttempts field 
                    var param = new
                    {
                        Email= model.Email
                    };
                    var counts = _dapper.GetById<User>(param,"Proc_IncrementInvalidLoginAttempts");
                    if (counts.InvalidLoginAttempts > 3)
                    {
                        _dapper.GetById<User>(param, "Proc_LockedUser");
                        response.StatusCode = ResponseStatus.FAILED;
                        response.ResponseText = "Account locked due to multiple incorrect password attempts";

                        // Send email alert
                        var userip = _sendmail.GetIPAddress();
                        string email = model.Email;
                        string subject = "Account Login Alert";
                        string body = $"Dear Customer, We have detected multiple invalid login attempts to your account. For your account's security, it has been temporarily deactivated. If you did not initiate these login attempts, please contact our support team immediately for assistance. Additionally, the login attempts were made from the following IP address: {userip}. Thank you for your prompt attention to this matter. Best regards, The DCS Team";
                        _sendmail.SendEmails(email, subject, body);
                        return response;
                    }

                    response.StatusCode = ResponseStatus.FAILED;
                    response.ResponseText = "Password did not match";

                    return response;
                }
                if (userExists != null)
                {
                    var i = await _userValidation.IsUserVerified(model.Email);
                    response.ResponseText= i.ResponseText;
                    response.StatusCode= i.StatusCode;
                    if (i.StatusCode==ResponseStatus.FAILED || i.StatusCode==ResponseStatus.IsDeactiveUser)
                    {
                        return response;
                    }
                    

                }
                if (response.StatusCode== ResponseStatus.EmailNotVerified)
                {
                   var j= await _userValidation.ValidateEmail(model.Email);
                    response.ResponseText = j.ResponseText;
                    response.StatusCode = j.StatusCode;
                    return response;
                }
                await _signInManager.SignInAsync(userExists, isPersistent: true);
                var roleDetails = await userManager.GetRolesAsync(userExists);

                var claimList = new List<Claim>
                   {
                       new Claim(ClaimTypes.Role, roleDetails.FirstOrDefault() ?? ""),
                       new Claim(ClaimTypes.Name, userExists.UserName),
                       new Claim("UserId", userExists.Id.ToString()),
                   };

                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["AuthSettings:SecretKey"]));
                var token = new JwtSecurityToken(
                    issuer: configuration["AuthSettings:Issuer"],
                    audience: configuration["AuthSettings:Audience"],
                    claims: claimList,
                    expires: DateTime.UtcNow.AddDays(30), // Use UTC time
                    signingCredentials: new SigningCredentials(key, SecurityAlgorithms.HmacSha256)
                );
                if (result)
                {
                    // If login is successful, reset the failed attempts count
                    var param = new
                    {
                        Email = model.Email
                    };
                    var counts = _dapper.Update(param, "Proc_ResetInvalidLoginAttempts");
                }
                string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

                response.StatusCode = ResponseStatus.SUCCESS;
                response.ResponseText = ResponseStatus.SUCCESS.ToString();

                response.Result = new LoginResponse
                {
                    Email = userExists.Email,
                    UserId = userExists.Id,
                    ProjectId = userExists.ProjectId,
                    UserName = userExists.UserName,
                    Name = userExists.Name, // Make sure 'Name' property exists in your user model
                    Token = tokenAsString,
                    Role = roleDetails.FirstOrDefault(),
                };

                return response;
            }
            catch (Exception ex)
            {
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "LoginAsync",
                    Error = ex.Message,
                    ProcName = "",
                };
                 new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
        }

        public async Task<IEnumerable<User>> GetAllUsers()
        {
            IEnumerable<User> user = new List<User>();
            string sp = "Proc_GetUser";
           
            try
            {
                var usersWithRoles = await _dapper.GetAll<User>(sp);
                 user= usersWithRoles;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "GetAllUsers",
                    Error = ex.Message,
                    ProcName = sp,
                };
                 new ErrorLog_ML(_dapper).Error(error);
            }
            return user;
        }

        public async Task<Response<bool>> ForgetPassword(ForgotPasswordViewModel forgetPasswordReq)
        {
            var response = new Response<bool>
            {
                ResponseText = "An error has ocurred try after sometime!",
                StatusCode = ResponseStatus.SUCCESS
            };
            try
            {
                var user = await userManager.FindByEmailAsync(forgetPasswordReq.Email);

                if (user == null || user.Id.Length == 0)
                {
                    response.ResponseText = "User not found!";
                    response.StatusCode = ResponseStatus.FAILED;
                    response.Result = false;
                    return response;
                }


                response.ResponseText = "";
                response.StatusCode = response.StatusCode;
                if (response.StatusCode == ResponseStatus.SUCCESS)
                {
                    if (string.IsNullOrEmpty(forgetPasswordReq.NewPassword))
                    {
                        response.ResponseText = "Please provide password!";
                        response.StatusCode = ResponseStatus.FAILED;
                        response.Result = false;
                        return response;
                    }
                    var token = await userManager.GeneratePasswordResetTokenAsync(user);

                    var resetPassResult = await userManager.ResetPasswordAsync(user, token, forgetPasswordReq.NewPassword);
                    if (resetPassResult.Succeeded)
                    {
                        response.StatusCode = ResponseStatus.SUCCESS;
                        response.ResponseText = "Password changed successfully!";
                    }

                    else
                    {
                        response.StatusCode = ResponseStatus.FAILED;
                        response.ResponseText = resetPassResult.Errors.FirstOrDefault().ToString();
                    }
                }
                if (response.StatusCode == ResponseStatus.SUCCESS)
                {
                    return response;
                }
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "ForgetPassword",
                    Error = ex.Message,
                    ProcName = "",
                };
                 new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
            return response;
        }

        public async Task<Response<bool>> UpdateUserStatus(UserStatus userStatus)
        {
            var response = new Response<bool>
            {
                ResponseText = "An error has ocurred try after sometime!",
                StatusCode = ResponseStatus.SUCCESS,
                Result =false,
        };
            string sp = "Proc_UpdateUserStatus";

            try
            {
                var param = new
                {
                    Id = userStatus.UserId,
                    IsVerified = userStatus.IsVerified,
                    IsLocked = userStatus.IsLocked,
                    IsActive = userStatus.IsActive
                };
                var i = await _dapper.GetAsync<Response>(sp, param);
                response.ResponseText = i.ResponseText;
                response.StatusCode = ResponseStatus.SUCCESS;
                response.Result =true;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "Proc_UpdateUserStatus",
                    Error = ex.Message,
                    ProcName = sp,
                };
                 new ErrorLog_ML(_dapper).Error(error);
            }
            return response;
        }
    }
}
