using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        [HttpPost(nameof(Index44))]
        public IActionResult Index44()
        {
            return Ok();
        }
    }
}
