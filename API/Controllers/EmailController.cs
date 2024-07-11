using API.AppCode.IML;
using API.SendEmail;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmail _email;
        private readonly Sendmail _emailsend;
        public EmailController(IEmail email, Sendmail emailsend)
        {
            _email=email;
            _emailsend=emailsend;
        }
        [HttpPost(nameof(SendBulkEmails))]
        public async Task<IActionResult> SendBulkEmails(List<CreateEmail> createEmail)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            foreach (var email in createEmail)
            {
                res=_email.SendBulkEmails(email);
            }
            return Ok(res);
        }

        [HttpPost(nameof(SendEmail))]
        public IActionResult SendEmail(CreateEmail createEmail)
        {
            var a = $@"{createEmail.Template}";
            createEmail.Template=a;
            _emailsend.SendEmail(createEmail);

            return Ok("");
        }

        [HttpPost(nameof(AddOrUpdateEmailTemplate))]
		public async Task<IActionResult> AddOrUpdateEmailTemplate([FromForm] EmailTemplate template)
        {
			var res = new Response
			{
				StatusCode = ResponseStatus.FAILED,
				ResponseText = "An error han occurred try after sometime."
			};
           
			res = await _email.AddOrUpdateEmailTemplate(template);
			if (res.StatusCode==ResponseStatus.SUCCESS)
			{
				return Ok(res);
			}
			return BadRequest(res);
		}


        [HttpPost(nameof(GetEmailTemplate))]
		public async Task<IActionResult> GetEmailTemplate()
        {
            var i = await _email.GetEmailTemplate();
            return Ok(i);
        }
        [HttpPost(nameof(GetEmailTemplate)+"/{Id}")]
        public async Task<IActionResult> GetEmailTemplate(int Id)
        {
            var i = await _email.GetEmailTemplateById(Id);
            return Ok(i);
        }
    }
}
