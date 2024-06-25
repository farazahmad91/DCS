using API.AppCode.APIRequest;
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
        public async Task<IActionResult> _AppointmentList(DateOnly? Date,int? PId)
        {
            var list = new List<Appointment>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointment/{Date}/{PId}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Appointment>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/A-Edit")]
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
        public async Task<IActionResult> AddOrUpdate(Appointment appointment)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/AddOrUpdateAppointment", JsonConvert.SerializeObject(appointment), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
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
