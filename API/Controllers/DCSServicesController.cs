using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCSServicesController : ControllerBase
    {
        private readonly IDCSServices _services;
        public DCSServicesController(IDCSServices services)
        {
            _services =services;
        }
        [HttpPost(nameof(AddorUpdateDCSPolicies))]
        public IActionResult AddorUpdateDCSPolicies(DCSService services)
        {
            var i = _services.AddorUpdateDCSService(services);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSService)+"/{name}")]
        public IActionResult GetDCSService(string name)
        {
            var i = _services.GetDCSService(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSServiceById)+"/{Id}")]
        public IActionResult GetDCSServiceById(int Id)
        {
            var i = _services.GetDCSServiceById(Id);
            return Ok(i);
        }
    }
}
