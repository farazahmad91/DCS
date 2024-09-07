using Microsoft.AspNetCore.Mvc;
using DCS.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using DCS.APIRequest;
using Entities;
using API.AppCode.APIRequest;
using Newtonsoft.Json;
using API.Claims;
using Entities.Response;


namespace DCS.Controllers
{
  
    public class HomeController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        private readonly IBaseUrl _baseurl;
        public HomeController(IConfiguration configuration, IBaseUrl baseUrl)
        {
            this._configuration = configuration;
            this._baseurl = baseUrl;
            _BaseUrl = baseUrl.GetBaseUrl();
        }
        [AllowAnonymous]
        public async Task<IActionResult>Index()
        {
            string name = "All";
            Common common = new Common();
            int? projectid = 267172;
            common.ProjectId = projectid;
            var HomeVN = new HomeVM();
            var apiSerRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Banner/GetBanner/{name}", null, null);
            var apiDocRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, null);
            var apiworkRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/WorkingHours/GetWorking/{name}", null, null);
            var apiSereRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), null);

            if (apiDocRes.Result != null)
            {
                HomeVN.GetBanner = JsonConvert.DeserializeObject<List<BannerImage>>(apiSerRes.Result);
                HomeVN.GetDoctors = JsonConvert.DeserializeObject<List<Doctor>>(apiDocRes.Result);
                HomeVN.GetWorkingHours = JsonConvert.DeserializeObject<List<WorkingHours>>(apiworkRes.Result);
                HomeVN.GetHospitalServices = JsonConvert.DeserializeObject<List<HospitalServices>>(apiSereRes.Result);
            }
            return View(HomeVN);
           
        }
        [Route("APIViews")]
		public IActionResult APIViews()
		{
			return View();
		}
        [Route("appointment")]
        public async Task<IActionResult> Appointments()
        {
            string name = "All";
            Common common = new Common();
            int? projectid = 267172;
            common.ProjectId = projectid;
            var AppointVM = new AppointmentVM();
            var apiDocRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, null);
            var apiSerRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), null);

            if (apiDocRes.Result != null)
            {
                AppointVM.GetDoctors = JsonConvert.DeserializeObject<List<Doctor>>(apiDocRes.Result);
                AppointVM.GetHospitalServices = JsonConvert.DeserializeObject<List<HospitalServices>>(apiSerRes.Result);

            }
            return View(AppointVM);
        }

        [Route("contact-us")]
        public IActionResult Contact()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> Contacts([FromBody] string doctorData)
        {
            var response = new Response
            {
                ResponseText = "Failed to add or update service",
                StatusCode = ResponseStatus.FAILED,
            };

            try
            {
                var contactJson = JsonConvert.SerializeObject(doctorData);
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Appointment/AddOrUpdateAppointment", contactJson, User.GetLoggedInUserToken());

            }
            catch (Exception ex)
            {
                // Optionally log the exception or handle it in another way
                response.ResponseText = $"Exception: {ex.Message}";
            }

            return Json(response);
        }

        [Route("about-us")]
        public IActionResult aboutus()
        {
            return View();
        }


        [Route("privacy")]
        public IActionResult Privacy()
        {
            return View();
        }

        [Route("pricing-plan")]
        public IActionResult PricingPlan()
        {
            return View();
        }
        [AllowAnonymous]
        [Route("service")]
        public async Task<IActionResult> Service(string name="All")
        {
            var list = new List<HospitalServices>();
            Common common = new Common();
            int? projectid = 267172;
            common.ProjectId = projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<HospitalServices>>(apiRes.Result);
            }
            return View(list);
        }

        [AllowAnonymous]
        [Route("dentist")]
        public async Task <IActionResult> Dentist( string name= "All")
        {
            var list = new List<Doctor>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Doctor>>(apiRes.Result);
            }
            return View(list);

        }

        [Route("testimonial")]
        public IActionResult Testimonial()
        {
            return View();
        }
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
