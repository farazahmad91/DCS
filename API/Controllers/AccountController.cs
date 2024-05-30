using API.Claims;
using API.DBContext;
using API.DBContext.Entities;
using API.Service;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using API.SendEmail;
using Entities;
using Entities.Response;
using Azure;
using Response = Entities.Response.Response;


namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly UserManager<ApplicationUser> userManager;
        private readonly RoleManager<IdentityRole> roleManager;
        private readonly IConfiguration configuration;
        private readonly IUserService _userservice;
        private readonly IHashPassword _hashpass;
       
        public AccountController(SignInManager<ApplicationUser> signInManager, UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager, IConfiguration configuration, IUserService userservice,  IHashPassword hashpass)
        {
            _signInManager = signInManager;
            this.userManager = userManager;
            this.roleManager = roleManager;
            this.configuration = configuration;
            _userservice = userservice;
            _hashpass=hashpass;
        }

        [HttpPost(nameof(Registration))]

        public async Task<IActionResult> Registration(RegisterViewModel model)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Register",
                StatusCode = ResponseStatus.FAILED,
            };
            if (ModelState.IsValid)
            {
                var result = await _userservice.RegisterAsync(model);
                return Ok(result);
            }
            return Ok(response);
        }

        [HttpPost(nameof(Login))]
        public async Task<IActionResult> Login(LoginViewModel model)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Register",
                StatusCode = ResponseStatus.FAILED,
            };
            if (ModelState.IsValid)
            {
                var result = await _userservice.LoginAsync(model);
                return Ok(result);
            }
            return Ok(response);
        }


        [HttpPost(nameof(ChangePassword))]
        public async Task<IActionResult> ChangePassword(ChangePassword passwordReq)
        {
            var response = new Response
            {
                ResponseText = "An error has occured try after sometime!",
                StatusCode = ResponseStatus.FAILED
            };
            try
            {

                var user = await userManager.FindByEmailAsync(User.GetLoggedInUserName());
                var checkPassword = await userManager.CheckPasswordAsync(user, passwordReq.CurrentPassword);
                if (!checkPassword)
                {
                    response.ResponseText = "Invalid current password!";
                    response.StatusCode = ResponseStatus.FAILED;
                    return BadRequest(response);
                }
                var result = await userManager.ChangePasswordAsync(user, passwordReq.CurrentPassword, passwordReq.NewPassword);
                if (!result.Succeeded)
                {
                    response.ResponseText = "Something went wrong try after sometime!";
                    response.StatusCode = ResponseStatus.FAILED;
                    return BadRequest(response);
                }
                response.ResponseText = "Password has been changed successfully!";
                response.StatusCode = ResponseStatus.SUCCESS;
                return Ok(response);
            }
            catch (Exception ex)
            {
                throw;
            }
        }

        [HttpPost(nameof(AllUser))]
        public async Task<IActionResult> AllUser()
        {
            var i = _userservice.GetAllUsers();


            return Ok(i);
        }
        [HttpPost(nameof(ForgetPassword))]
        public async Task<IActionResult> ForgetPassword(ForgotPasswordViewModel forgetPasswordReq)
        {
            var result = await _userservice.ForgetPassword(forgetPasswordReq);
            if (result.StatusCode==ResponseStatus.FAILED)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }

        [HttpPost(nameof(EncodePassword))]
        public async Task<IActionResult> EncodePassword(string pass)
        {
          var i=  _hashpass.EncodePasswordToBase64(pass);

            return Ok(i);
        }

        [HttpPost(nameof(DecodePass))]
        public async Task<IActionResult> DecodePass(string pass)
        {
            var i = _hashpass.DecodeFrom64(pass);
            return Ok(i);
        }

        [Route(nameof(ValidateEmail)+"/{email}")]
        [HttpPost]
        public async Task<IActionResult> ValidateEmail(string email)
        {
            var response = new Entities.Response.Response<bool>
            {
                ResponseText = "An error has ocurred try after sometime!",
                StatusCode = ResponseStatus.SUCCESS
            };
            var user = await userManager.FindByEmailAsync(email);

            if (user == null || user.Id.Length == 0)
            {
                response.ResponseText = "Please enter valid email!";
                response.StatusCode=ResponseStatus.FAILED;
                return BadRequest(response);
            }
            var i = await _userservice.ValidateEmail(email);
                return Ok(i);
        }

        [Route(nameof(VerifyOTP))]
        [HttpPost]
        public async Task<IActionResult> VerifyOTP(ValidateEmail validateEmail)
        {
            var i = await _userservice.VerifyOTP(validateEmail);
            return Ok(i);
        }
    }
}
