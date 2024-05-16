using API.Claims;
using API.DBContext.Entities;
using API.DBContext.Response;
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

namespace DCS.Controllers
{
    public class AccountController : Controller
    {
       // private readonly APIrequest _apirequest;
        public string myIP, hostName;
        private readonly string _BaseUrl;
        private readonly IWebHostEnvironment webHostEnvironment;
       // private readonly UploadImage uploadImage;
        public AccountController(/*APIrequest aPIrequest,*/ IWebHostEnvironment webHostEnvironment/*, UploadImage uploadImage*/)
        {
            //this._apirequest = aPIrequest;
            _BaseUrl = "https://localhost:7079";
            this.webHostEnvironment = webHostEnvironment;
            //this.uploadImage = uploadImage;
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

                    if (apiRes.Result != null)
                    {
                        res = JsonConvert.DeserializeObject<Response>(apiRes.Result);

                        if (res.StatusCode == ResponseStatus.SUCCESS)
                        {
                            //_apirequest.Post("UserProfile/AddUserProfileDetails", model);
                            SendEmail(model.Email, model.Password);
                        }
                        return Json(res);

                    }
                    else
                    {
                        var errorMessage = $"Registration failed with status code: {apiRes.HttpStatusCode}, Message: {apiRes.HttpMessage}";
                        return Json(errorMessage);
                    }
                }
                catch (Exception ex)
                {

                    return Json($"Registration failed. Exception: {ex.Message}");
                }
            }
            else
            {

                return Json("Invalid request! Please check the provided data.");
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
            var loginVm = new LoginVM { message = "Invalid login request!" };

            if (!ModelState.IsValid)
            {
                return BadRequest(loginVm);
            }

            try
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/Login", JsonConvert.SerializeObject(loginRequest));

                if (string.IsNullOrEmpty(apiRes.Result))
                {
                    return BadRequest(loginVm);
                }

                var authenticateResponse = JsonConvert.DeserializeObject<Response<LoginResponse>>(apiRes.Result);

                if (authenticateResponse.StatusCode != ResponseStatus.SUCCESS)
                {
                    loginVm.message = authenticateResponse.ResponseText;
                    return BadRequest(loginVm);
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
                    return Json("Page Not Found");
                }

            }
            catch (Exception ex)
            {
                // Log the exception or handle it appropriately
                loginVm.message = "An error occurred while processing the login request.";
                return BadRequest(loginVm);
            }
        }

        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword()
        {
            return PartialView();
        }

        public async Task<IActionResult> SaveChangePassword(ChangePassword changePassword)
        {
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
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText = ex.Message;
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
                throw;
            }

        }
        public async Task<IActionResult> UserList()
        {
            var list = new List<User>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/AllUser", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<User>>(apiRes.Result);
            }
            return PartialView(list);
        }

        public void SendEmail(string email, string password)
        {

            try
            {
                using (MailMessage mail = new MailMessage())
                using (SmtpClient smtpServer = new SmtpClient("smtp.gmail.com"))
                {
                    string fromAddress = "cozmotest91@gmail.com";
                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(email);
                    mail.Subject = "New Register";
                    mail.Body = "Dear Customer,\n\nThank you for your new registration. Your password is: " + password + ". If you have any questions or need assistance, please contact us immediately.\n\nThank you for your attention.\n\nBest regards,\nFaraz Shaikh";
                    smtpServer.Port = 587;
                    smtpServer.Credentials = new System.Net.NetworkCredential("cozmotest91@gmail.com", "cuncfbllgbiwwyax");
                    smtpServer.EnableSsl = true;

                    smtpServer.Send(mail);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error sending email", ex);
            }
        }
        public void GetIPAddress()
        {
            try
            {
                hostName = Dns.GetHostName();
                IPHostEntry myHostEntry = Dns.GetHostEntry(hostName);
                myIP = myHostEntry.AddressList[0].ToString();

            }
            catch (Exception ex)
            {
            }
        }

        [HttpGet]
 
        public async Task<IActionResult> Logout()
        {
            try
            {
                var email = User.FindFirstValue(ClaimTypes.Email);
                //var apiResponse = await _apirequest.GetData<Entities.Response>($"Reviews/CheckUserReview?email={email}");

                // User has a review, redirect to login 
                string returnUrl = "/Account/Login";
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
        public async Task<IActionResult> ForgotPassword()
        {

            return View();

        }
        [Route("ForgotPassword")]
        [HttpPost]
        public async Task<IActionResult> ForgotPassword(int id)
        {

            return View();

        }

        [Route("ValidateOTP")]
        public async Task<IActionResult> VerifyOTP(int id)
        {

            return View();

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
