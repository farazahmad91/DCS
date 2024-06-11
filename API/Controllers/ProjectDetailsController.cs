using API.AppCode.IML;
using API.SendEmail;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectDetailsController : ControllerBase
    {
        private readonly IProjectDetails _details;
        public ProjectDetailsController(IProjectDetails details)
        {
            _details=details;
        }
        [HttpPost(nameof(AddorUpdateProjectDetails))]
        public async Task<IActionResult> AddorUpdateProjectDetails(ProjectDetails pdetails)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _details.AddorUpdateProjectDetails(pdetails);
            return Ok(i);
        }

        [HttpPost(nameof(GetProjectDetails))]
        public async Task<IActionResult> GetProjectDetails(string name)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _details.GetProjectDetails(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetProjectDetailsByProjectId))]
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
