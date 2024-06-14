using API.AppCode.Helper;
using API.AppCode.IML;
using API.AppCode.IService;
using API.AppCode.Utility;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly IDoctor _doctor;
        private readonly IFileUploadService _fileUploadService;
        public DoctorController(IDoctor doctor, IFileUploadService fileUploadService)
        {
             _doctor=doctor;
            _fileUploadService = fileUploadService;
        }
        [HttpPost(nameof(AddOrUpdateDoctor))]
        public async Task<IActionResult> AddOrUpdateDoctor(Doctor doctors)
        {
            if (doctors.ImagePath != null)
            {
                var res = new Response
                {
                    StatusCode = ResponseStatus.FAILED,
                    ResponseText = "An error han occurred try after sometime."
                };
                var uploadImage = _fileUploadService.Upload(new FileUploadModel
                {
                    file = doctors.ImagePath,
                    FileName = $"{DateTime.Now.ToString("ddmmyyhhssmmttt")}",
                    FilePath =  FileDirectories.DictionaryImage,
                });
                if (uploadImage.StatusCode != ResponseStatus.SUCCESS)
                {
                    res.ResponseText = uploadImage.ResponseText;
                    return Ok(res);
                }
                doctors.DrImage = uploadImage.ResponseText;
            }
            var i = await _doctor.AddOrUpdateDoctor(doctors);
            return Ok(i);
        }

        [HttpPost(nameof(GetDoctor)+"/{name}")]
        public async Task<IActionResult> GetDoctor(string name)
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
