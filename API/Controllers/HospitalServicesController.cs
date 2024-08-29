using API.AppCode.Helper;
using API.AppCode.IML;
using API.AppCode.IService;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalServicesController : ControllerBase
    {
        private readonly IHospitalServices _services;
        private readonly FileUploadService _uploadService;
        public HospitalServicesController(IHospitalServices services, FileUploadService uploadService)
        {
            _services =services;
            _uploadService =uploadService;  
        }
        [HttpPost(nameof(AddorUpdateHospitalServices))]
        public async Task<IActionResult> AddorUpdateHospitalServices(HospitalServices services)
        {
            var res = new Response()
            {
                ResponseText = "something went wrong!!",
                StatusCode = ResponseStatus.FAILED,
            };
           services.ServicesImage = _uploadService.Image(services.ImagePath, FileUploadType.ServiceImage, FileUploadType.ServicePrefix);
            if (services.ServicesImage != null && services.ServiceID == 0 || services.ServiceID == null)
            {
                res = await _services.AddorUpdateHospitalServices(services);
            }
            
            if (services.ServicesImage != null && services.ServiceID != 0)
            {
                res = await _services.AddorUpdateHospitalServices(services);
            }
            return Ok(res);

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
