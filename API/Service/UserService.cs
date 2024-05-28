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
using ErrorLog = Entities.Response.ErrorLog;

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
        public UserService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration,IHashPassword hashpass, IDapper dapper, Sendmail sendmail)
        {
            _signInManager = signInManager;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            _hashpass=hashpass;
            _dapper=dapper;
            _sendmail=sendmail;
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

                    EmailConfirmed = true,
                };
                var result = await userManager.CreateAsync(user, model.Password);

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
                    Register(model.Email,model.ConfirmPassword);
                }
                    return response;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FunctionName = "RegisterAsync",
                    ResponseText = ex.Message,
                    Proc_Name = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
        }

        public async Task<Response> Register(string email, string password)
        {
            Response res = new Response();
            var sp = "sp_insert_user";
            try
            {
            var pass =    _hashpass.EncodePasswordToBase64(password);
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
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FunctionName = "Register",
                    ResponseText = ex.Message,
                    Proc_Name = sp,
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
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
                    response.StatusCode = ResponseStatus.FAILED;
                    response.ResponseText = "Password did not match";
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

                string tokenAsString = new JwtSecurityTokenHandler().WriteToken(token);

                response.StatusCode = ResponseStatus.SUCCESS;
                response.ResponseText = ResponseStatus.SUCCESS.ToString();
                response.Result = new LoginResponse
                {
                    Email = userExists.Email,
                    UserId = userExists.Id,
                    UserName = userExists.UserName,
                    Name = userExists.Name, // Make sure 'Name' property exists in your user model
                    Token = tokenAsString,
                    Role = roleDetails.FirstOrDefault(),
                };

                return response;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FunctionName = "Login",
                    ResponseText = ex.Message,
                    Proc_Name = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
        }




        public IEnumerable<User> GetAllUsers()
        {
            string query = @"
        SELECT U.Id, U.Name, U.UserName, U.Email, R.Name AS Role
        FROM AspNetUsers U
        JOIN AspNetUserRoles UR ON U.Id = UR.UserId
        JOIN AspNetRoles R ON UR.RoleId = R.Id";

            var usersWithRoles =  _dapper.GetAll<User>(query);

            return usersWithRoles.ToList();
        }


        public async Task<Response> ValidateEmail(string email)
        {
            var response = new Response();

            try
            {
                response.ResponseText = "An error has occurred. Please try again later!";
                response.StatusCode = ResponseStatus.FAILED;
                //response.Result = false;

                var user = await userManager.FindByEmailAsync(email);

                if (user == null || string.IsNullOrEmpty(user.Id))
                {
                    response.ResponseText = "Email not found!";
                    return response;
                }
                else
                { string otp = GenerateOTP(6);
                    string sub  = "Testing";
                    string body = $"Your OTP is {otp}";
                    _sendmail.SendEmails(email, sub, body);
                    var param = new {
                        Email = email,
                        OTP =otp
                    };
                   _dapper.Insert(param, "sp_Validate_Email");
                    response.ResponseText = "OTP sent to your registered email!";
                    response.StatusCode = ResponseStatus.SUCCESS;
                    //response.Result = true;

                    return response;
                }
            }
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Exception occurred: {ex.Message}");

                // Update response indicating failure
                response.ResponseText = "An error has occurred. Please try again later!";
                response.StatusCode = ResponseStatus.FAILED;
                //response.Result = false;

                return response;
            }
        }

        public static string GenerateOTP(int length)
        {
            const string chars = "0123456789";
            Random random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public async Task<Response> VerifyOTP(ValidateEmail validateEmail)
        {
            var res = new Response()
            {
                ResponseText="Invalid OTP",
                StatusCode = ResponseStatus.FAILED,
           };
            var sp = "sp_VerifyOTP";
            try
            {
                var param = new
                {
                    Email= validateEmail.Email,
                    OTP= validateEmail.OTP
                };
                var i = await _dapper.GetAsync<Response>(sp, param);
                if (i.StatusCode==ResponseStatus.SUCCESS)
                {
                    res.ResponseText = "OTP Verified";
                    res.StatusCode = ResponseStatus.SUCCESS;
                }
                res = i;
                return res;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FunctionName = "VerifyOTP",
                    ResponseText = ex.Message,
                    Proc_Name = sp,
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return res;
            }
        }
    }
}
