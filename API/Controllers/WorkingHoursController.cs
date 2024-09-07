using API.AppCode.Helper;
using API.AppCode.IML;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class WorkingHoursController : Controller
    {

        private readonly IWorkingHours _working;
        private readonly FileUploadService _uploadService;
        public WorkingHoursController(IWorkingHours hours, FileUploadService uploadService)
        {
            _working = hours;
            _uploadService = uploadService;
        }
        [HttpPost(nameof(GetWorking) + "/{name}")]
        public async Task<IActionResult> GetWorking(string? name)
        {
            var i = await _working.GetWorkingDays(name);
            return Ok(i);
        }

    }
}
