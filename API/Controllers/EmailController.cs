using API.AppCode.IML;
using API.SendEmail;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

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
        public IActionResult AddOrUpdateEmailTemplate(EmailTemplate template)
        {
            var i = _email.AddOrUpdateEmailTemplate(template);

            return Ok(i);
        }

        [HttpPost(nameof(GetEmailTemplate))]
        public IActionResult GetEmailTemplate()
        {
            var i = _email.GetEmailTemplate();
            return Ok(i);
        }
    }
}
