using API.AppCode.Helper;
using API.AppCode.IML;
using API.AppCode.IService;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalEmployeeController : ControllerBase
    {
        private readonly IHospitalEmployee _employee;
        private readonly FileUploadService _uploadService;
        public HospitalEmployeeController(IHospitalEmployee employee, FileUploadService uploadService)
        {
            _employee=employee;
            _uploadService=uploadService;

        }
        [HttpPost(nameof(AddOrUpdateHospitalEmployee))]
        public async Task<IActionResult> AddOrUpdateHospitalEmployee([FromForm] HospitalEmployee employee)
        {
            var res = new Response()
            {
             ResponseText="something went wrong!!",
              StatusCode=ResponseStatus.FAILED,
            };
            if (employee.ImagePath != null)
            {
                employee.ProfileImage = _uploadService.Image(employee.ImagePath, FileUploadType.DoctorImage, FileUploadType.DoctorPrefix);
            }
            if (employee.AadhaarImagePath != null)
            {
                employee.AdharImage = _uploadService.Image(employee.AadhaarImagePath, FileUploadType.DoctorImage, FileUploadType.DoctorPrefix);
            }
            var i = await _employee.AddOrUpdateHospitalEmployee(employee);
            if (i.StatusCode==ResponseStatus.FAILED)
            {
                BadRequest(i);
            }
            return Ok(i);
        }
        [HttpPost(nameof(GetHospitalEmployeeListOrById))]
        public async Task<IActionResult> GetHospitalEmployeeListOrById(Common common)
        {
            var i = await _employee.GetHospitalEmployeeListOrById(common);
            return Ok(i);
        }
        [HttpPost(nameof(UpdateHospitalEmployeeStatus))]
        public async Task<IActionResult> UpdateHospitalEmployeeStatus(Common common)
        {
            var res = new Response()
            {
                ResponseText="something went wrong!!",
                StatusCode=ResponseStatus.FAILED,
            };
            var i = await _employee.UpdateHospitalEmployeeStatus(common);
            if (i.StatusCode==ResponseStatus.FAILED)
            {
                BadRequest(i);
            }
            return Ok(i);
        }

    }
}
