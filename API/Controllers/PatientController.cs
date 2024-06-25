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
        public PatientController(IPatient patient)
        {
            _patient =patient;
        }
        [HttpPost(nameof(AddOrUpdatePatient))]
        public async Task<IActionResult> AddOrUpdatePatient(Patient patients)
        {
            var i =await _patient.AddOrUpdatePatient(patients);
            return Ok(i);
        }

        [HttpPost(nameof(GetPatient)+"/{email}/{PId}")]
        public async Task<IActionResult> GetPatient(string? email, int? PId)
        {
            var i =await _patient.GetPatient(email, PId);
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
