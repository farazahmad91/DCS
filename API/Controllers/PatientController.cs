using API.AppCode.Helper;
using API.AppCode.IService;
using Entities;
using Entities.Response;
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
			var res = new Response
			{
				StatusCode = ResponseStatus.FAILED,
				ResponseText = "An error han occurred try after sometime."
			};

			patients.PImage = _uploadService.Image(patients.ImagePath, FileUploadType.PatientImage, FileUploadType.PatientPrefix);
          
			if (patients.PImage != null && patients.PId == 0)
			{
				res = await _patient.AddOrUpdatePatient(patients);
			}
			if (patients.PImage == "" || patients.PImage !="" && patients.PId != 0)
			{
				res = await _patient.AddOrUpdatePatient(patients);
			}
			
            return Ok(res);
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
