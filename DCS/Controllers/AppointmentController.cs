using API.AppCode.APIRequest;
using API.Claims;
using API.DBContext.Entities;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;
using System.Security.Claims;

namespace DCS.Controllers
{
    [Authorize]
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointment", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Appointment>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/editAppointment")]
        public async Task<IActionResult> EditAppointment(int id)
        {
            string name = "All";
            Common common = new Common();
            int? projectid = User.GetProjectId();
            common.ProjectId = projectid;
            var AppointVM = new AppointmentVM();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointmentById/{id}", null, User.GetLoggedInUserToken());
            var apiDocRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, User.GetLoggedInUserToken());
            var apiSerRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());

            if (apiRes.Result != null)
            {
                AppointVM.GetAppointment = JsonConvert.DeserializeObject<Appointment>(apiRes.Result);
                AppointVM.GetDoctors = JsonConvert.DeserializeObject<List<Doctor>>(apiDocRes.Result);
                AppointVM.GetHospitalServices = JsonConvert.DeserializeObject<List<HospitalServices>>(apiSerRes.Result);
         
            }
            return PartialView(AppointVM);
        }

        [AllowAnonymous]
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
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/AddOrUpdateAppointment", JsonConvert.SerializeObject(appointreq), User.GetLoggedInUserToken());
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointmentStatusByUser/{email}", null, User.GetLoggedInUserToken());
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/GetAppointmentStatus", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Appointment>>(apiRes.Result);
            }
            return PartialView(list);
        }
    }
}
