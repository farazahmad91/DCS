using API.AppCode.Helper;
using API.AppCode.IService;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctor _doctor;
        public DoctorController(IDoctor doctor)
        {
             _doctor=doctor;
        }
        [HttpPost(nameof(AddOrUpdateDoctor))]
        public async Task<IActionResult> AddOrUpdateDoctor(Doctor doctors)
        {
            var res = new Response
            {
                StatusCode = ResponseStatus.FAILED,
                ResponseText = "An error han occurred try after sometime."
            };
            if (doctors.DrId == 0 && doctors.ImagePath == null)
            {
                res.StatusCode = ResponseStatus.FAILED;
                res.ResponseText = "Attachment file is mandetory";
                return BadRequest(res);
            }
            if (doctors.ImagePath != null)
            {
                res = FileUploadService.O.UploadFile(new FileUploadModel
                {
                    file = doctors.ImagePath,
                    FileName = DateTime.Now.ToString("ddMMyyyyhhmmssfff"),
                    FilePath = DOCType.DictionaryImage,
                });
            }

            if (res.StatusCode == ResponseStatus.SUCCESS)
            {
                if (doctors.ImagePath != null)
                {
                    doctors.DrImage = $"{DOCType.DictionaryPrefix}{res.Filename}";
                }
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
    }
}
