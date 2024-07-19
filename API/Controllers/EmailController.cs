using API.AppCode.Helper;
using API.AppCode.IML;
using API.Claims;
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
        private readonly FileUploadService _uploadService;
        public EmailController(IEmail email, Sendmail emailsend, FileUploadService uploadService)
        {
            _email=email;
            _emailsend=emailsend;
            _uploadService=uploadService;
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

        #region Email Template

        [HttpPost(nameof(AddOrUpdateEmailTemplate))]
		public async Task<IActionResult> AddOrUpdateEmailTemplate([FromForm] EmailTemplate template)
        {
			var res = new Response
			{
				StatusCode = ResponseStatus.FAILED,
				ResponseText = "An error han occurred try after sometime."
			};

            if (template.ImagePath != null)
            {
                template.TemplateImage = _uploadService.Image(template.ImagePath, FileUploadType.DoctorImage, FileUploadType.DoctorPrefix);
            }
            res = await _email.AddOrUpdateEmailTemplate(template);
			if (res.StatusCode==ResponseStatus.SUCCESS)
			{
				return Ok(res);
			}
			return BadRequest(res);
		}

        [HttpPost(nameof(GetEmailTemplateListOrById))]
		public async Task<IActionResult> GetEmailTemplateListOrById(Common common)
        {
            common.name="All";
            common.email="All";
            var i = await _email.GetEmailTemplateListOrById(common);
            return Ok(i);
        }
        # endregion

        #region Master Email type

        [HttpPost(nameof(AddOrUpdateMasterEmailTemplateType))]
        public async Task<IActionResult> AddOrUpdateMasterEmailTemplateType(MasterEmailTemplateType type)
        {
            var res = new Response
            {
                StatusCode = ResponseStatus.FAILED,
                ResponseText = "An error han occurred try after sometime."
            };

            res = await _email.AddOrUpdateMasterEmailTemplateType(type);
            if (res.StatusCode==ResponseStatus.SUCCESS)
            {
                return Ok(res);
            }
            return BadRequest(res);
        }

        [HttpPost(nameof(GetMasterEmailTemplateTypeListOrById))]
        public async Task<IActionResult> GetMasterEmailTemplateTypeListOrById(Common common)
        {
            common.name="All";
            common.email="All";
            var i = await _email.GetMasterEmailTemplateTypeListOrById(common);
            return Ok(i);
        }

       # endregion
    }
}
