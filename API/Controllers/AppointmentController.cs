using API.AppCode.IML;
using API.Data;
using API.SendEmail;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using static System.Net.WebRequestMethods;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly IAppointment _appointment;
        private readonly ISendEmailTempateSettings _emailTempateSettings;
        public AppointmentController(IAppointment appointment, ISendEmailTempateSettings emailTempateSettings)
        {
            _appointment=appointment;
            _emailTempateSettings = emailTempateSettings;
        }
        [HttpPost(nameof(AddOrUpdateAppointment))]
        public async Task<IActionResult> AddOrUpdateAppointment(Appointment appointment)
        {
             var i= await _appointment.AddOrUpdateAppointment(appointment);
            if (i.PatientId!=null || i.PatientId != 0)
            {
                try
                {
                    _emailTempateSettings.FirstTimeAppointmentTemplate(appointment.Email, appointment.Name, i.AppointmentId, appointment.ServiceId);
                }
                catch (Exception)
                {

                    throw;
                }
            }

            return Ok(i);
        }

        [HttpPost(nameof(GetAppointment))]
        public async Task<IActionResult> GetAppointment(Common common)
        {
            var i =await _appointment.GetAppointment(common);
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
