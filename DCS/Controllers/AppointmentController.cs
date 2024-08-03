using API.AppCode.APIRequest;
using API.Claims;
using API.DBContext.Entities;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

namespace DCS.Controllers
{
    public class AppointmentController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public AppointmentController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }

        [Route("/AppointmentList")]
        public IActionResult AppointmentList()
        {
            return View();
        }
        [Route("/A-List")]
        public async Task<IActionResult> _AppointmentList(Common common)
        {
            var list = new List<Appointment>();
            int? progectid = User.GetProjectId();
            common.ProjectId = progectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointment", JsonConvert.SerializeObject(common), null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Appointment>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/editAppointment")]
        public async Task<IActionResult> EditAppointment(int id)
        {
            var list = new Appointment();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointmentById/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<Appointment>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/A-AddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromForm] string appointmentData)
        {
            ApplicationSetting applicationSetting = new ApplicationSetting();
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };
            try
            {
                
                var appointreq = JsonConvert.DeserializeObject<Appointment?>(appointmentData);
                var registerReq = JsonConvert.DeserializeObject<RegisterViewModel>(appointmentData);
                appointreq.ProjectId = applicationSetting.ProjectID;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/AddOrUpdateAppointment", JsonConvert.SerializeObject(appointreq), null);
                if (apiRes.Result != null)
                {
                    response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return Json(response);
                }
            }
            catch (Exception)
            {

                throw;
            }

           
            return Json(response);
        }

        [Route("/GetAppointmentStatusByUser")]
        public async Task<IActionResult> GetAppointmentStatusByUser()
        {
            var list = new List<Appointment>();
            var email = User.FindFirstValue(ClaimTypes.Email);
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointmentStatusByUser/{email}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Appointment>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/GetAppointmentStatus")]
        public async Task<IActionResult> GetAppointmentStatus()
        {
            var list = new List<Appointment>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointmentStatus", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Appointment>>(apiRes.Result);
            }
            return PartialView(list);
        }
    }
}
