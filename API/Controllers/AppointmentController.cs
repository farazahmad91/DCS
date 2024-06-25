using API.AppCode.IML;
using Entities;
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

        [HttpPost(nameof(GetAppointment)+"/{Date}/{PId}")]
        public IActionResult GetAppointment(DateOnly? Date, int? PId)
        {
            var i = _appointment.GetAppointment(Date, PId);
            return Ok(i);
        }

        [HttpPost(nameof(GetAppointmentById)+"/{AppointmentId}")]
        public IActionResult GetAppointmentById(int AppointmentId)
        {
            var i = _appointment.GetAppointmentById(AppointmentId);
            return Ok(i);
        }
        [HttpPost(nameof(GetAppointmentStatusByUser)+"/{email}")]
        public IActionResult GetAppointmentStatusByUser(string? email)
        {
            var i = _appointment.GetAppointmentStatusByUser(email);
            return Ok(i);
        }

        [HttpPost(nameof(GetAppointmentStatusByUser))]
        public IActionResult GetAppointmentStatus()
        {
            var i = _appointment.GetAppointmentStatus();
            return Ok(i);
        }
    }
}
