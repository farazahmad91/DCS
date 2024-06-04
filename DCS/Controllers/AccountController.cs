using API.Claims;
using API.DBContext.Entities;
using Entities.Response;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages;
using Newtonsoft.Json;
using System.Net.Mail;
using System.Net;
using System.Security.Claims;
using DCS.Account;
using API.AppCode.APIRequest;
using System.Collections.Generic;
using Microsoft.AspNetCore.Identity.Data;
using Entities;
using API.SendEmail;
using API.RequestInfo;

namespace DCS.Controllers
{
    public class AccountController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly  IRequestInfo requestInfo;
        public string email, hostName;
        private readonly string _BaseUrl;
        private readonly IWebHostEnvironment webHostEnvironment;
         private readonly Sendmail _sendmail;
        public AccountController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment, Sendmail sendmail)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
            this.webHostEnvironment = webHostEnvironment;
            this._sendmail = sendmail;
        }


        [HttpGet]
        public IActionResult Index()
        {
            return View();
        }
        public async Task<IActionResult> AdminRegister()
        {

            return PartialView();
        }
		[Route("Register")]
		public IActionResult Register()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Register(RegisterViewModel model)
        {
            var res = new Response()
            {
                ResponseText = "Failed To Register User",
                StatusCode = ResponseStatus.FAILED
            };
            if (ModelState.IsValid)
            {
                try
                {
                    var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/Registration", JsonConvert.SerializeObject(model));
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    if (apiRes.Result != null)
                    {
                        

                        if (res.StatusCode == ResponseStatus.SUCCESS)
                        {
                            //_apirequest.Post("UserProfile/AddUserProfileDetails", model);.
                        }
                        return Json(res);

                    }
                    else
                    {
                        return Json(res);
                    }
                }
                catch (Exception ex)
                {
                    res.ResponseText=$"Registration failed. Exception: {ex.Message}";
                    res.StatusCode = ResponseStatus.FAILED;
                    return Json(res);
                }
            }
            else
            {
                res.ResponseText="Invalid request! Please check the provided data.";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
                
            }

        }

        [Route("Login")]
        [HttpGet]
        public IActionResult Login()
        {

            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Login(LoginRequests loginRequest)
        {
            var res = new Response()
            {
                ResponseText = "Failed To Login User",
                StatusCode = ResponseStatus.FAILED
            };

            if (!ModelState.IsValid)
            {
                return Json(res);
            }

            try
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/Login", JsonConvert.SerializeObject(loginRequest));
                var authenticateResponse = JsonConvert.DeserializeObject<Response<LoginResponse>>(apiRes.Result);
                if (string.IsNullOrEmpty(apiRes.Result))
                {
                    return Json(authenticateResponse);
                }

                
                if (authenticateResponse.StatusCode == ResponseStatus.ISEmailVerified)
                {
                      return Json(authenticateResponse);
                }

                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                identity.AddClaim(new Claim("Token", authenticateResponse.Result.Token));
                identity.AddClaim(new Claim(ClaimTypes.Role, authenticateResponse.Result.Role));
                identity.AddClaim(new Claim(ClaimTypes.Email, authenticateResponse.Result.Email));
                identity.AddClaim(new Claim(ClaimTypes.Name, authenticateResponse.Result.Name));
                identity.AddClaim(new Claim("UserId", authenticateResponse.Result.UserId.ToString()));

                await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                if (authenticateResponse.Result.Role == "Admin")
                {
                    string redirectUrl = "/Admin";
                    return Json(redirectUrl);
                }
                else if (authenticateResponse.Result.Role == "User")
                {
                    string Url = "/User/Index";
                    return Json(Url);
                }
                else if (authenticateResponse.Result.Role == "Employee")
                {
                    string Url = "/Employee/Index";
                    return Json(Url);
                }
                else
                {
                    return Json(authenticateResponse);
                }

            }
            catch (Exception ex)
            {
                res.ResponseText="An error occurred while processing the login request.";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }
        }

		[Route("IsVerified-User")]
		public IActionResult ConfirmationEmail()
		{
            return View();

        }

        public async Task<IActionResult> VerifyConfirmationEmail(ValidateEmail validateEmail)
        {
            var res = new Response()
            {
                ResponseText="email not register",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/VerifyConfirmationEmail", JsonConvert.SerializeObject(validateEmail), null);
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return Json(res);
                }
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText="Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }

        }

        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword()
        {
            return PartialView();
        }

        public async Task<IActionResult> SaveChangePassword(ChangePassword changePassword)
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            string name = User.FindFirstValue(ClaimTypes.Name);
            var res = new Response()
            {
                ResponseText="Failed To Change Password",
                StatusCode = ResponseStatus.FAILED
            };
            try
            {
                var token = User.GetLoggedInUserToken();
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/ChangePassword", JsonConvert.SerializeObject(changePassword), token);
                if (apiRes != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                }
                if (res.StatusCode==ResponseStatus.SUCCESS)
                {
                    var userip = _sendmail.GetIPAddress();
                    string subject = "Password Change Notification";
                    string body = $"Dear {name},\n\n" +
                                  "We would like to inform you of a recent update regarding your account at DCS.\n\n" +
                                  "As part of our commitment to security and ensuring the integrity of your account, we have initiated a password change process. Please find the details below:\n\n" +
                                  $"New Password: {changePassword.NewPassword}\n\n" +
                                  $"Initiated from IP Address: {userip}\n\n" +
                                  "If you did not request this change or have any concerns about the security of your account, please contact our support team immediately.\n\n" +
                                  "Thank you for your attention to this matter.\n\n" +
                                  "Best regards,\n" +
                                  "The DCS Team";


                    _sendmail.SendEmails(email, subject, body);
                }
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText = ex.Message;
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }

        }
        [Route("Users")]
        public async Task<IActionResult> Users()
        {
            return View();
        }
        [Route("_UserList")]
        public async Task<IActionResult> _UserList()
        {
            var list = new List<User>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/AllUser", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<User>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [HttpGet]
 
        public async Task<IActionResult> Logout()
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                //var apiResponse = await _apirequest.GetData<Entities.Response>($"Reviews/CheckUserReview?email={email}");

                // User has a review, redirect to login 
                string returnUrl = "/Login";
                await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
                HttpContext.Response.Cookies.Delete(".AspNetCore.Cookies");
                HttpContext.Response.Cookies.Delete(".AspNetCore.Identity.Application");

                return LocalRedirect(returnUrl);
            }
            catch (Exception ex)
            {
                throw;
            }
        }
        [Route("ForgotPassword")]
        [HttpGet]
        public async Task<IActionResult> ForgotPass()
        {

            return View();

        }

        [Route("Validate-Email")]
        [HttpPost]
        public async Task<IActionResult> ValidateEmail(string useremail)
        {
            var res = new Response()
            {
                ResponseText="email not register",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/ValidateEmail/{useremail}", null, null);
                if (apiRes.Result != null)
                {
                     res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return Json(res);
                }
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText="Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }

        }

        [Route("VerifyOTP")]
        public async Task<IActionResult> VerifyOTP()
        {

            return View();

        }
        [Route("Validate-OTP")]
        [HttpPost]
        public async Task<IActionResult> ValidateOTP(ValidateEmail validateEmail)
        {
            var res = new Response()
            {
                ResponseText="email not register",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/VerifyOTP", JsonConvert.SerializeObject(validateEmail), null);
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return Json(res);
                }
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText="Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }

        }
        [Route("ResetPassword")]
        [HttpGet]
        public async Task<IActionResult> ResetPassword()
        {

            return View();

        }
        [Route("Reset-Password")]
        [HttpPost]
        public async Task<IActionResult> ResetPassword(ForgotPasswordViewModel forgetPasswordReq)
        {
            string email = User.FindFirstValue(ClaimTypes.Email);
            string name = User.FindFirstValue(ClaimTypes.Name);
            var res = new Response()
            {
                ResponseText = "email not register",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/ForgetPassword", JsonConvert.SerializeObject(forgetPasswordReq), null);
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);

                }
                if (res.StatusCode==ResponseStatus.SUCCESS)
                {
                    var userip = _sendmail.GetIPAddress();
                    string subject = "Reset Password Notification";
                    string body = $"Dear {name},\n\n" +
                                  "We hope this message finds you well.\n\n" +
                                  "We are writing to inform you of an important update regarding your DCS account.\n\n" +
                                  "In accordance with our ongoing efforts to enhance account security and safeguard your personal information, we have initiated a password reset process for your account.\n\n" +
                                  "Below are the details of the password reset:\n\n" +
                                  $"New Password: {forgetPasswordReq.NewPassword}\n" +
                                  $"Initiated from IP Address: {userip}\n\n" +
                                  "If you have not initiated this password reset or suspect any unauthorized access to your account, we strongly encourage you to reach out to our dedicated support team immediately for assistance.\n\n" +
                                  "We appreciate your prompt attention to this matter as we strive to ensure the continued security of your account.\n\n" +
                                  "Thank you for your cooperation and understanding.\n\n" +
                                  "Best Regards,\n" +
                                  "The DCS Team";



                    _sendmail.SendEmails(email, subject, body);
                }
                return Json(res);
            }
            catch (Exception ex)
            {

                res.ResponseText="Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }

        }
        //[Route("/Profile")]
        //public async Task<IActionResult> UserProfile()
        //{
        //    var email = User.FindFirstValue(ClaimTypes.Email);
        //    var i = await _apirequest.GetData<UserProfile>($"UserProfile/UserProfileListByEmail?email={email}");
        //    return PartialView(i);
        //}

        //public async Task<IActionResult> UpdateUserProfileImg(UserProfile userProfile, IFormFile ImagePath)
        //{
        //    var email = User.FindFirstValue(ClaimTypes.Email);
        //    userProfile.Image = uploadImage.Image(ImagePath);
        //    userProfile.Email = email;
        //    var i = await _apirequest.Post("UserProfile/UpdateUserProfileImg", userProfile);
        //    return Json(i);
        //}
        //public async Task<IActionResult> EditProfile()
        //{
        //    var email = User.FindFirstValue(ClaimTypes.Email);
        //    var i = await _apirequest.GetData<UserProfile>($"UserProfile/UserProfileListByEmail?email={email}");
        //    return PartialView(i);
        //}
        //public async Task<IActionResult> UpdateUserProfile(UserProfile userProfile)
        //{
        //    var i = await _apirequest.Post("UserProfile/UpdateUserProfile", userProfile);
        //    return Json(i);
        //}
    }
}
