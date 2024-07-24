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

        [HttpPost(nameof(GetHospitalServicesListOrById))]
        public async Task<IActionResult> GetHospitalServicesListOrById(Common common)
        {
            var i =await _services.GetHospitalServicesListOrById(common);
            return Ok(i);
        }

        [HttpPost(nameof(UpdateHospitalServiceStatus))]
        public async Task<IActionResult> UpdateHospitalServiceStatus(Common common)
        {
            var i =await _services.UpdateHospitalServiceStatus(common);
            return Ok(i);
        }
    }
}
