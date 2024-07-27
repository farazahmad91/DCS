using API.AppCode.IML;
using API.SendEmail;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using API.AppCode.Helper;
using API.AppCode.IService;
using API.AppCode.Configuration;
using API.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectDetailsController : ControllerBase
    {
        private readonly IProjectDetails _details;
		private readonly FileUploadService _uploadService;
		private readonly Sendmail _sendmail;
        private readonly IDapper _dapper;
        public ProjectDetailsController(IProjectDetails details, FileUploadService uploadService, Sendmail sendmail, IDapper dapper)
        {
            _details=details;
			_uploadService=uploadService;
            _sendmail=sendmail;
            _dapper=dapper;

        }
        [HttpPost(nameof(AddorUpdateProjectDetails))]
        public async Task<IActionResult> AddorUpdateProjectDetails(ProjectDetails pdetails)
        {
			var res = new Response
			{
				StatusCode = ResponseStatus.FAILED,
				ResponseText = "An error han occurred try after sometime."
			};

			if (pdetails.ImagePath != null)
			{
				pdetails.Logo = _uploadService.Image(pdetails.ImagePath, FileUploadType.ProjectImage, FileUploadType.ProjectPrefix);
			}
            if (pdetails.Logo!= null)
            {
                res = await _details.AddorUpdateProjectDetails(pdetails);
				if (res.StatusCode==ResponseStatus.SUCCESS)
				{
                    
                    if (pdetails.Id == 0 || pdetails.Id == null)
                    {
                        try
                        {
                            var param = new
                            {
                                EmailType = EmailTemplateType.NewRegister.ToString(),
                            };

                            // Fetch the email template
                            var template = _dapper.GetById<EmailTemplate>(param, "proc_GetEmailTemplateById");

                            if (template != null)
                            {
                                // Replace placeholders in the template content
                                string content = template.Content
                                .Replace("{ProjectId}", pdetails.ProjectId.ToString())
                                .Replace("{email}", pdetails.Email ?? "")
                                .Replace("{Password}", pdetails.Password ?? "")
                                .Replace("{CompanyName}", pdetails.ProjectName ?? "")
                                .Replace("{UserName}", pdetails.UserName ?? "")
                                .Replace("{date}", DateTime.Now.Year.ToString() ?? "")
                                .Replace("{CompanyNumber}", pdetails.PhoneNo ?? "");

                                // Send the email
                                _sendmail.SendEmailWithImage(pdetails.Email, template.Subject, content, pdetails.EmailLogo);
                                //_sendmail.SendEmails(pdetails.Email, template.Subject, content);
                            }
                            else
                            {
                                // Handle the case where the template is not found
                                throw new Exception("Email template not found.");
                            }
                        }
                        catch (Exception ex)
                        {
                            // Log the exception and rethrow
                            // Consider using a logging framework or more specific exception handling
                            Console.WriteLine(ex.Message);
                            throw;
                        }
                    }


                }
                return Ok(res);
			}
            if (pdetails.ProjectId!=0)
            {
                res = await _details.AddorUpdateProjectDetails(pdetails);
            }
            return BadRequest(res);
        }

        [HttpPost(nameof(GetProjectDetails)+"/{name}")]
        public async Task<IActionResult> GetProjectDetails(string? name)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _details.GetProjectDetails(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetProjectDetailsByProjectId)+"/{id}")]
        public async Task<IActionResult> GetProjectDetailsByProjectId(int id)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _details.GetProjectDetailsByProjectId(id);
            return Ok(i);
        }

        [HttpPost(nameof(GetProjectDetailsByEmail)+"/{email}")]
        public async Task<IActionResult> GetProjectDetailsByEmail(string email)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _details.GetProjectDetailsByEmail(email);
            return Ok(i);
        }

		[HttpPost(nameof(UpdateProjectStatus))]
		public async Task<IActionResult> UpdateProjectStatus(Common common)
		{
			var i = await _details.UpdateProjectStatus(common);
			return Ok(i);
		}
	}
}
