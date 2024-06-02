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
        public UserService(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IHashPassword hashpass, IDapper dapper, Sendmail sendmail)
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
                    Register(model.Email, model.ConfirmPassword);
                   ValidateEmail(model.Email);
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
                if (result)
                {
                  var i = await IsUserVerified(model.Email);
                     response.ResponseText= i.ResponseText;
					 response.StatusCode= i.StatusCode;
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
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "LoginAsync",
                    Error = ex.Message,
                    ProcName = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
        }




        public IEnumerable<User> GetAllUsers()
        {
            string sp = "Proc_GetUser";
            IEnumerable<User> user = new List<User>();
            try
            {
                var usersWithRoles = _dapper.GetAll<User>(sp);
                usersWithRoles = user;
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
            return response;
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
                {
                    var skey = configuration["HashPassword:EncryptionKey"];
                    string otp = GenerateOTP("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");
                    string sub = "Verification of Email Address";
                    string body = $"Dear Customer,\n\nWe are reaching out to verify your email address in order to ensure the security and integrity of your account. As part of our authentication process, please find below the One-Time Password (OTP) required for verification:\n\nOTP: {otp}\n\nKindly enter the OTP provided above to complete the verification process. If you encounter any difficulties or have any questions, please do not hesitate to contact our support team for assistance.\n\nThank you for your cooperation.\n\nBest regards,\nThe DCS Team";
                    _sendmail.SendEmails(email, sub, body);
                    var param = new
                    {
                        Email = email,
                        OTP = otp
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
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "ValidateEmail",
                    Error = ex.Message,
                    ProcName = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
        }

        public static string GenOTP(int length)
        {
            const string chars = "0123456789";
            Random random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
        }



		public async Task<Response> IsUserVerified(string Email)
		{
			var res = new Response()
			{
				ResponseText = "Invalid OTP",
				StatusCode = ResponseStatus.FAILED,
			};
			var sp = "Proc_IsUserVerfied";
			try
			{
				var param = new
				{
					Email = Email,
				};
				var i = await _dapper.GetAsync<Response>(sp, param);
				if (i.StatusCode == ResponseStatus.SUCCESS)
				{
					res.ResponseText = "OTP Verified";
					res.StatusCode = ResponseStatus.SUCCESS;
				}
				res = i;
				return res;
			}
			catch (Exception ex)
			{
				var error = new Entities.ErrorLog
				{
					ClassName = GetType().Name,
					FuncName = "VerifyOTP",
					Error = ex.Message,
					ProcName = sp,
				};
				var _ = new ErrorLog_ML(_dapper).Error(error);
				return res;
			}
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
                    Email = validateEmail.Email,
                    OTP = validateEmail.OTP
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
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "VerifyOTP",
                    Error = ex.Message,
                    ProcName = sp,
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return res;
            }
        }


        private static string GenerateOTP(byte[] key, long counter, int digits = 6)
        {
            byte[] counterBytes = BitConverter.GetBytes(counter);
            if (BitConverter.IsLittleEndian)
                Array.Reverse(counterBytes);
            using (HMACSHA1 hmac = new HMACSHA1(key))
            {
                byte[] hash = hmac.ComputeHash(counterBytes);
                int offset = hash[hash.Length - 1] & 0x0F;
                int binary = ((hash[offset] & 0x7F) << 24)
                           | ((hash[offset + 1] & 0xFF) << 16)
                           | ((hash[offset + 2] & 0xFF) << 8)
                           | (hash[offset + 3] & 0xFF);
                int otp = binary % (int)Math.Pow(10, digits);
                return otp.ToString().PadLeft(digits, '0');
            }
        }

        public string GenerateOTP(string secret, int digits = 6)
        {
            try
            {
                byte[] key = Base32Decode(secret);
                long counter = DateTimeOffset.UtcNow.ToUnixTimeSeconds() / 30;
                return GenerateOTP(key, counter, digits);
            }
            catch (Exception ex)
            {
                var response = new Response()
                {
                    ResponseText = ex.Message,
                };
                var error = new ErrorLog
                {
                    ClassName = "UserService",
                    FuncName = "GenerateOTP",
                    Error = ex.Message,
                    ProcName = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return response.ResponseText;
            }

        }

        private static byte[] Base32Decode(string base32Encoded)
        {
            const string base32Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567";

            base32Encoded = base32Encoded.TrimEnd('=');

            var bits = base32Encoded
                .Select(c => Convert.ToString(base32Chars.IndexOf(c), 2).PadLeft(5, '0'))
                .Aggregate((a, b) => a + b);

            var result = Enumerable.Range(0, bits.Length / 8)
                .Select(i => Convert.ToByte(bits.Substring(i * 8, 8), 2))
                .ToArray();

            return result;
        }

    }
}
