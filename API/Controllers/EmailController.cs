using API.AppCode.IML;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EmailController : ControllerBase
    {
        private readonly IEmail _email;

        public EmailController(IEmail email)
        {
            _email=email;
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
    }
}
