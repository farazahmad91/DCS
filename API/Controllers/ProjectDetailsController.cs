using API.AppCode.IML;
using API.SendEmail;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using API.AppCode.Helper;
using API.AppCode.IService;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectDetailsController : ControllerBase
    {
        private readonly IProjectDetails _details;
		private readonly FileUploadService _uploadService;
		private readonly Sendmail _sendmail;
		public ProjectDetailsController(IProjectDetails details, FileUploadService uploadService, Sendmail sendmail)
        {
            _details=details;
			_uploadService=uploadService;
            _sendmail=sendmail;
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
                    if (pdetails.ProjectId==0)
                    {
                        _sendmail.SendEmails(pdetails.Email, "Create New Project", $"your Project Id Is: {res.ProjectId}");
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
    }
}
