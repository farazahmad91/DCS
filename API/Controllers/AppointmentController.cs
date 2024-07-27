using API.AppCode.IML;
using API.SendEmail;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointment _appointment;
        private readonly Sendmail _sendmail;
        public AppointmentController(IAppointment appointment, Sendmail sendmail)
        {
            _appointment=appointment;
            _sendmail=sendmail;
        }
        [HttpPost(nameof(AddOrUpdateAppointment))]
        public async Task<IActionResult> AddOrUpdateAppointment(Appointment appointment)
        {
           var i= await _appointment.AddOrUpdateAppointment(appointment);

            return Ok(i);
        }

        [HttpPost(nameof(GetAppointment)+"/{Date}/{PId}")]
        public async Task<IActionResult> GetAppointment(DateOnly? Date, int? PId)
        {
            var i =await _appointment.GetAppointment(Date, PId);
            return Ok(i);
        }

        [HttpPost(nameof(GetAppointmentById)+"/{AppointmentId}")]
        public async Task<IActionResult> GetAppointmentById(int AppointmentId)
        {
            var i = await _appointment.GetAppointmentById(AppointmentId);
            return Ok(i);
        }
        [HttpPost(nameof(GetAppointmentStatusByUser)+"/{email}")]
        public async Task<IActionResult> GetAppointmentStatusByUser(string? email)
        {
            var i =await _appointment.GetAppointmentStatusByUser(email);
            return Ok(i);
        }

        [HttpPost(nameof(GetAppointmentStatusByUser))]
        public async Task<IActionResult> GetAppointmentStatus()
        {
            var i = await _appointment.GetAppointmentStatus();
            return Ok(i);
        }
    }
}
