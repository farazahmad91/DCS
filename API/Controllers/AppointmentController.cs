using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        [HttpPost(nameof(SaveLogin))]
        public IActionResult SaveLogin()
        {
       
            return Ok();
        }
    }
}
