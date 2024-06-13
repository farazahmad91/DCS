using API.AppCode.IML;
using DCS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointment _appointment;
        public AppointmentController(IAppointment appointment)
        {
            _appointment=appointment;
        }
        [HttpPost(nameof(AddOrUpdateAppointment))]
        public IActionResult AddOrUpdateAppointment(Appointment appointment)
        {
           var i= _appointment.AddOrUpdateAppointment(appointment);
            return Ok(i);
        }

        [HttpPost(nameof(GetAppointment))]
        public IActionResult GetAppointment(string Date)
        {
            var i = _appointment.GetAppointment(Date);
            return Ok(i);
        }

        [HttpPost(nameof(GetAppointmentById))]
        public IActionResult GetAppointmentById(int AppointmentId)
        {
            var i = _appointment.GetAppointmentById(AppointmentId);
            return Ok(i);
        }
    }
}
