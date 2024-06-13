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
        public IActionResult AddOrUpdatePatient(Patient patients)
        {
            var i = _patient.AddOrUpdatePatient(patients);
            return Ok(i);
        }

        [HttpPost(nameof(GetPatient)+"/{email}")]
        public IActionResult GetPatient(string email)
        {
            var i = _patient.GetPatient(email);
            return Ok(i);
        }

        [HttpPost(nameof(GetPatientById)+"/{Id}")]
        public IActionResult GetPatientById(int Id)
        {
            var i = _patient.GetPatientById(Id);
            return Ok(i);
        }
    }
}
