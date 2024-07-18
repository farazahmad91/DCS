using API.AppCode.ML;
using API.SendEmail;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Identity;
using System.Security.Cryptography;
using API.AppCode.IML;
using API.DBContext;

namespace API.Service
{
    public class UserValidation : IUserValidation
    {
        private readonly UserManager<ApplicationUser> userManager;
        private readonly IConfiguration configuration;
        private readonly IHashPassword _hashpass;
        private readonly IDapper _dapper;
        private readonly Sendmail _sendmail;
        public UserValidation(UserManager<ApplicationUser> userManager, IConfiguration configuration, IHashPassword hashpass, IDapper dapper, Sendmail sendmail)
        {
            this.userManager = userManager;
            this.configuration = configuration;
            _hashpass=hashpass;
            _dapper=dapper;
            _sendmail=sendmail;
        }
        public async Task<Response> SendOTP(string email)
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
                    _sendmail.SendEmails(email, sub, otp);
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
                    FuncName = "SendOTP",
                    Error = ex.Message,
                    ProcName = "",
                };
                 new ErrorLog_ML(_dapper).Error(error);
                return response;
            }
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
                if (i.StatusCode == ResponseStatus.IsTempLock)
                {
                    SendOTP(Email);
                }
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
                 new ErrorLog_ML(_dapper).Error(error);
                return res;
            }
        }

        public async Task<Response> VerifyConfirmationEmail(ValidateEmail validateEmail)
        {
            var res = new Response()
            {
                ResponseText="Invalid OTP",
                StatusCode = ResponseStatus.FAILED,
            };
            var sp = "Proc_VerifyConfirmationEmail";
            try
            {
                var param = new
                {
                    Email = validateEmail.Email,
                    OTP = validateEmail.OTP,
                    Type=validateEmail.Type
                };
                var i = await _dapper.GetAsync<Response>(sp, param);
                res = i;
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
                 new ErrorLog_ML(_dapper).Error(error);
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
                 new ErrorLog_ML(_dapper).Error(error);
                return res;
            }
        }

        public static string GenOTP(int length)
        {
            const string chars = "0123456789";
            Random random = new Random();
            return new string(Enumerable.Repeat(chars, length)
              .Select(s => s[random.Next(s.Length)]).ToArray());
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
                 new ErrorLog_ML(_dapper).Error(error);
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
