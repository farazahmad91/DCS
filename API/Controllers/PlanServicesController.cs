using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PlanServicesController : ControllerBase
    {
        private readonly IDCSServices _services;
        public PlanServicesController(IDCSServices services)
        {
            _services =services;
        }
        [HttpPost(nameof(AddorUpdateDCSService))]
        public async Task<IActionResult> AddorUpdateDCSService(PlanServices services)
        {
            var i =await _services.AddorUpdateDCSService(services);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSService)+"/{name}")]
        public async Task<IActionResult> GetDCSService(string? name)
        {
            var i =await _services.GetDCSService(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSServiceById)+"/{Id}")]
        public async Task<IActionResult> GetDCSServiceById(int Id)
        {
            var i =await _services.GetDCSServiceById(Id);
            return Ok(i);
        }
    }
}
