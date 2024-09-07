using API.AppCode.Helper;
using API.AppCode.IService;
using API.Claims;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctor _doctor;
        private readonly FileUploadService _uploadService;
        public DoctorController(IDoctor doctor, FileUploadService uploadService)
        {
             _doctor=doctor;
            _uploadService=uploadService;
        }
        [HttpPost(nameof(AddOrUpdateDoctor))]
        public async Task<IActionResult> AddOrUpdateDoctor(Doctor doctors)
        {
            var res = new Response
            {
                StatusCode = ResponseStatus.FAILED,
                ResponseText = "An error han occurred try after sometime."
            };

            doctors.DrImage = _uploadService.Image(doctors.ImagePath, FileUploadType.DoctorImage, FileUploadType.DoctorPrefix);
            bool isImageChanged = doctors.DrImage != null && doctors.DrImage != "";
            bool isNewBanner = doctors.DrId == 0;
            if (isNewBanner || isImageChanged)
            {
            res = await _doctor.AddOrUpdateDoctor(doctors);
            }
            return Ok(res);
        }

        [HttpPost(nameof(GetDoctor)+"/{name}")]
        public async Task<IActionResult> GetDoctor(string? name)
        {
            var i = await _doctor.GetDoctor(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetDoctorById)+"/{DrId}")]
        public async Task<IActionResult> GetDoctorById(int DrId)
        {
            var i = await _doctor.GetDoctorById(DrId);
            return Ok(i);
        }

        [HttpPost(nameof(DoctorModifyStatus) + "/{Id}")]
        public async Task<IActionResult> DoctorModifyStatus(int Id)
        {
            var i = await _doctor.DoctorModifyStatus(Id);
            return Ok(i);
        }
    }
}
