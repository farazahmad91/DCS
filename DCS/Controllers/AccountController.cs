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
using API.AppCode.IML;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Microsoft.AspNetCore.Authorization;
using DCS.APIRequest;

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
        private readonly string domainname;
        private readonly IDapper _dapper;
        private readonly IBaseUrl _baseurl;
        public AccountController(IConfiguration configuration, IWebHostEnvironment webHostEnvironment, Sendmail sendmail, IDapper dapper, IBaseUrl baseUrl)
        {
			this._baseurl = baseUrl;
			this._configuration = configuration;
            _BaseUrl = baseUrl.GetBaseUrl();
            this.webHostEnvironment = webHostEnvironment;
            this._sendmail = sendmail;
            domainname = "";
            _dapper = dapper;
            
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
                if (authenticateResponse.Result==null || authenticateResponse.StatusCode==ResponseStatus.FAILED)
                {
                    return Json(authenticateResponse);
                }
                if (authenticateResponse.StatusCode == ResponseStatus.IsDeactiveUser)
                {
                    return Json(authenticateResponse);
                }

                if (authenticateResponse.StatusCode == ResponseStatus.EmailNotVerified)
                {
                    return Json(authenticateResponse);
                }
               

                var identity = new ClaimsIdentity(CookieAuthenticationDefaults.AuthenticationScheme);
                identity.AddClaim(new Claim("Token", authenticateResponse.Result.Token));
                identity.AddClaim(new Claim(ClaimTypes.Role, authenticateResponse.Result.Role));
                identity.AddClaim(new Claim(ClaimTypes.Email, authenticateResponse.Result.Email));
                identity.AddClaim(new Claim(ClaimTypes.Name, authenticateResponse.Result.Name));
                identity.AddClaim(new Claim("UserId", authenticateResponse.Result.UserId.ToString()));
				identity.AddClaim(new Claim("ProjectId", authenticateResponse.Result.ProjectId.ToString()));

				await HttpContext.SignInAsync(CookieAuthenticationDefaults.AuthenticationScheme, new ClaimsPrincipal(identity));

                if (authenticateResponse.StatusCode == ResponseStatus.SUCCESS)
                {
                    var list = new ProjectDetails();
                    var projectRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ProjectDetails/GetProjectDetailsByEmail/{loginRequest.Email}", null, null);
                    if (projectRes.Result != null)
                    {
                        list = JsonConvert.DeserializeObject<ProjectDetails>(projectRes.Result);
                        HttpContext.Session.SetString("projectdetail", JsonConvert.SerializeObject(list));
                    }
                }
                if (authenticateResponse.Result.Role == "Merchant" || authenticateResponse.Result.Role == "Admin" || authenticateResponse.Result.Role == "Client")
                {
                    var projectDetails = new ProjectDetails();
                    var listprojectJson = HttpContext.Session.GetString("projectdetail");
                    if (!string.IsNullOrEmpty(listprojectJson))
                    {
                        // Deserialize JSON string to an object. Use dynamic or a specific type if you know the structure.
                        projectDetails  = JsonConvert.DeserializeObject<ProjectDetails>(listprojectJson);
                    }
                    if (projectDetails==null || projectDetails.DomainName==null)
                    {
                        res.StatusCode=ResponseStatus.FAILED;
                        res.ResponseText = "Unfortunately, this email is not associated with any projects. Please consider creating a new project.";
                        
                        return Json(res);
                    }
                    else if (projectDetails.Status==0 || projectDetails.Status==null)
                    {
                        res.StatusCode=ResponseStatus.FAILED;
                        res.ResponseText = "The project is currently locked. We apologize for any inconvenience. Please contact our support team for assistance.";

                        return Json(res);
                    }
                    var param = new
                    {
                        loginRequest.Email,
                        DeviceName = GetDeviceName(),
                        BrowerName = GetBrowserName(),
                        SessionToken = Guid.NewGuid().ToString(),
                        IPAddress= GetIPAddress(),

                };
                    _dapper.GetById<Response>(param, "Proc_LoginInfoAsync");
                    string browser = GetBrowserName();
                    string IP = GetIPAddress();
                    string DeviceName = GetDeviceName();
                        var respons = new {
                        statusCode =1,
                        redirectUrl = $"/{projectDetails.DomainName}/admin",
                };

                    //string redirectUrl = "/admin";
                    return Json(respons);
                }
                else if (authenticateResponse.Result.Role == "User")
                {
                    var respons = new
                    {
                        statusCode = 1,
                        redirectUrl = "/User/Index",
                    };
                    return Json(respons);
                }
                else if (authenticateResponse.Result.Role == "Employee")
                {
                    var respons = new
                    {
                        statusCode = 1,
                        redirectUrl = "/Employee/Index",
                    };
                    return Json(respons);
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
        private string GetDeviceName()
        {
            var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();
            if (userAgent.Contains("iPhone"))
                return "iPhone";
            if (userAgent.Contains("iPad"))
                return "iPad";
            if (userAgent.Contains("Android"))
                return "Android Device";
            if (userAgent.Contains("Windows NT"))
                return "Windows PC";
            if (userAgent.Contains("Macintosh"))
                return "MacBook";

            return "Unknown Device";
        }
        private string GetBrowserName()
        {
            var userAgent = HttpContext.Request.Headers["User-Agent"].ToString();

            if (userAgent.Contains("Edg"))
                return "Microsoft Edge";
            if (userAgent.Contains("Chrome") && !userAgent.Contains("Chromium"))
                return "Chrome";
            if (userAgent.Contains("Safari") && !userAgent.Contains("Chrome"))
                return "Safari";
            if (userAgent.Contains("Firefox"))
                return "Firefox";
            if (userAgent.Contains("Opera") || userAgent.Contains("OPR"))
                return "Opera";
            if (userAgent.Contains("MSIE") || userAgent.Contains("Trident"))
                return "Internet Explorer";

            return "Unknown Browser";
        }
        private string GetIPAddress()
        {
            try
            {
                string hostName = Dns.GetHostName();
                IPHostEntry myHostEntry = Dns.GetHostEntry(hostName);
                string myIP = myHostEntry.AddressList.FirstOrDefault(ip => ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)?.ToString();
                if (myIP == null)
                {
                    throw new Exception("No IPv4 address found for the host.");
                }

                return myIP;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetIPAddress: {ex.Message}");
                return null;
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
        [Authorize]
        [Route("ChangePassword")]
        public async Task<IActionResult> ChangePassword()
        {
            return PartialView();
        }
        public async Task<IActionResult> SaveChangePassword(ChangePass changePassword)
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
                changePassword.UName=name;
                changePassword.Email=email;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/ChangePassword", JsonConvert.SerializeObject(changePassword), token);
                if (apiRes != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                }
                if (res.StatusCode==ResponseStatus.SUCCESS)
                {
                    res = _dapper.GetById<Response>(new { Email= email }, "Proc_UpdateISChangePasswordStatus");
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

        [Route("AddNewUser")]
        public async Task<IActionResult> AddNewUser()
        {
            return PartialView();
        }

        [Route("UserListInJson")]
        public async Task<IActionResult> UserListInJson()
        {
            var list = new List<User>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/AllUser", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<User>>(apiRes.Result);
            }
            return Json(list);
        }

        [Route("ForgotPassword")]
        [HttpGet]
        public async Task<IActionResult> ForgotPass()
        {

            return View();

        }

        [Route("SendOTP")]
        [HttpPost]
        public async Task<IActionResult> SendOTP(EmailType email)
        {
            var res = new Response()
            {
                ResponseText="email not register",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/SendOTP", JsonConvert.SerializeObject(email), null);
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
            string name = User.FindFirstValue(ClaimTypes.Name);
            var res = new Response()
            {
                ResponseText = "email not register",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {
                forgetPasswordReq.UName=name;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/ForgetPassword", JsonConvert.SerializeObject(forgetPasswordReq), null);
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);

                }
                if (res.StatusCode==ResponseStatus.SUCCESS)
                {
                   
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

        [Route("DecriptPassword")]
        [HttpPost]
        public async Task<IActionResult> DecriptPassword(string HashPass)
        {
            var res = new Response()
            {
                ResponseText="Decript Password FAILED",
                StatusCode = ResponseStatus.FAILED
            };
            if (HashPass== null)
            {

                    res.ResponseText="please select password";
                    return Json(res);
            }
            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/DecodePass/{HashPass}", null, null);
               
                if (apiRes.Result != null)
                {
                    
                    return Json(apiRes.Result);
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

        [Route("UpdateUserStatus")]
        [HttpPost]
        public async Task<IActionResult> UpdateUserStatus(UserStatus userStatus)
        {
            var res = new Response()
            {
                ResponseText="email not register",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/UpdateUserStatus", JsonConvert.SerializeObject(userStatus), null);
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

        [HttpGet]
        [Route("Logout")]
        public async Task<IActionResult> Logout()
        {
            string Email = User.GetLoggedInUserEmail();
            //string Role = User.GetLoggedInUserRole();
            await HttpContext.SignOutAsync(CookieAuthenticationDefaults.AuthenticationScheme);
             _dapper.GetById<Response>(new { Email }, "Proc_Logout");
            return LocalRedirect("/Account/Login");
        }

        [Route("CheckIsPasswordChange")]
        public async Task<IActionResult> CheckIsPasswordChange()
        {
            string Email = User.GetLoggedInUserEmail();
           
            var res =new Response()
            {
               ResponseText="",
                StatusCode=ResponseStatus.FAILED
            };
            res = _dapper.GetById<Response>(new { Email }, "Proc_ISChangePassword");
            if (res.StatusCode== ResponseStatus.FAILED)
            {
                return PartialView("ChangePassword");
            }
            return Json(res);
        }
    }
}
