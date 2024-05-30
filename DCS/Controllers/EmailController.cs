using API.AppCode.APIRequest;
using API.Claims;
using API.DBContext.Entities;
using API.SendEmail;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Newtonsoft.Json;

namespace DCS.Controllers
{
	public class EmailController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
		private readonly Sendmail _sendmail;
        private readonly ILogger<EmailController> _logger;
        private readonly string _BaseUrl;
        public EmailController(Sendmail sendmail , IWebHostEnvironment webHostEnvironment, ILogger<EmailController> logger, IConfiguration configuration) 
		{
			_sendmail=sendmail;
			_webHostEnvironment=webHostEnvironment;
            _logger = logger;
            _BaseUrl = "https://localhost:7079";
        }

        [HttpGet]
		[Route("ComposeBulkEmail")]
        public IActionResult ComposeBulkEmail()
        {
            return View();
        }

        [Route("sendBulkEmails")]
        [HttpPost]
        public async Task<IActionResult> SendBulkEmails([FromBody] List<CreateEmail> emails)
        {
            var jsonEmails = JsonConvert.SerializeObject(emails); // Serialize the list to JSON string
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/SendBulkEmails", jsonEmails, User.GetLoggedInUserToken());
            List<User> list = null;
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<User>>(apiRes.Result);
            }
            return Json(list);
        }


        //[HttpPost("sendBulkEmails")]
        //public async Task<IActionResult> SendBulkEmails([FromBody] List<CreateEmail> emails)
        //{
        //    var response = new Entities.Response.Response<bool>
        //    {
        //        ResponseText = "An error has ocurred try after sometime!",
        //        StatusCode = ResponseStatus.SUCCESS
        //    };
        //    if (emails == null || emails.Count == 0)
        //    {
        //        response.ResponseText="Email list cannot be null or empty";
        //        response.StatusCode=ResponseStatus.FAILED;
        //        return Json(response);
        //    }

        //    var failedEmails = new List<string>();

        //    foreach (var email in emails)
        //    {
        //        try
        //        {
        //            _sendmail.SendEmailWithImage(email);
        //            //  await _sendmail.SendEmailWithImage(email); // Assuming SendEmailWithImage is an async method
        //        }
        //        catch (Exception ex)
        //        {
        //            _logger.LogError(ex, $"Failed to send email to {email.Emails}");
        //            failedEmails.Add(email.Emails);
        //        }
        //    }

        //    if (failedEmails.Count > 0)
        //    {
        //        response.ResponseText=$"Failed to send emails to the following recipients: {string.Join(", ", failedEmails)}";
        //        response.StatusCode=ResponseStatus.FAILED;
        //        return Json(response);
        //        //return StatusCode(500, $"Failed to send emails to the following recipients: {string.Join(", ", failedEmails)}");
        //    }
        //    response.ResponseText="Bulk emails sent successfully";
        //    response.StatusCode=ResponseStatus.FAILED;
        //    return Json(response);
        //}
    }
}





