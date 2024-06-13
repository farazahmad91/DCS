using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalServicesController : ControllerBase
    {
        private readonly IHospitalServices _services;
        public HospitalServicesController(IHospitalServices services)
        {
            _services =services;
        }
        [HttpPost(nameof(AddorUpdateHospitalServices))]
        public IActionResult AddorUpdateHospitalServices(HospitalServices services)
        {
            var i = _services.AddorUpdateHospitalServices(services);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalServices)+"/{name}")]
        public IActionResult GetHospitalServices(string name)
        {
            var i = _services.GetHospitalServices(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalServicesById)+"/{Id}")]
        public IActionResult GetHospitalServicesById(int Id)
        {
            var i = _services.GetHospitalServicesById(Id);
            return Ok(i);
        }
    }
}
