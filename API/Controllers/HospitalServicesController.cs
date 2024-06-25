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
        public async Task<IActionResult> AddorUpdateHospitalServices(HospitalServices services)
        {
            var i =await _services.AddorUpdateHospitalServices(services);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalServices)+"/{name}")]
        public async Task<IActionResult> GetHospitalServices(string? name)
        {
            var i =await _services.GetHospitalServices(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalServicesById)+"/{Id}")]
        public async Task<IActionResult> GetHospitalServicesById(int Id)
        {
            var i =await _services.GetHospitalServicesById(Id);
            return Ok(i);
        }
    }
}
