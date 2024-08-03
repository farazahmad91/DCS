using API.AppCode.Helper;
using API.AppCode.IService;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly IPatient _patient;
        private readonly FileUploadService _uploadService;
        public PatientController(IPatient patient, FileUploadService uploadService)
        {
            _patient =patient;
            _uploadService=uploadService;
        }
        [HttpPost(nameof(AddOrUpdatePatient))]
        public async Task<IActionResult> AddOrUpdatePatient(Patient patients)
        {
            if (patients.ImagePath != null)
            {
                patients.PImage = _uploadService.Image(patients.ImagePath, FileUploadType.PatientImage, FileUploadType.PatientPrefix);
            }
            var i =await _patient.AddOrUpdatePatient(patients);
            return Ok(i);
        }

        [HttpPost(nameof(GetPatient))]
        public async Task<IActionResult> GetPatient(Common common)
        {
            var i =await _patient.GetPatient(common);
            return Ok(i);
        }

        [HttpPost(nameof(GetPatientById)+"/{Id}")]
        public async Task<IActionResult> GetPatientById(int Id)
        {
            var i =await _patient.GetPatientById(Id);
            return Ok(i);
        }
    }
}
