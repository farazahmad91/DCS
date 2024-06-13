using API.AppCode.IML;
using API.AppCode.IService;
using Entities;
using Microsoft.AspNetCore.Http;
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
        public IActionResult AddOrUpdateDoctor(Doctor doctors)
        {
            var i = _doctor.AddOrUpdateDoctor(doctors);
            return Ok(i);
        }

        [HttpPost(nameof(GetDoctor)+"/{name}")]
        public IActionResult GetDoctor(string name)
        {
            var i = _doctor.GetDoctor(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetDoctorById)+"/{DrId}")]
        public IActionResult GetDoctorById(int DrId)
        {
            var i = _doctor.GetDoctorById(DrId);
            return Ok(i);
        }
    }
}
