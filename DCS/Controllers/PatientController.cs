using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using API.Claims;
using System.Net;
using DCS.APIRequest;
using Microsoft.AspNetCore.Authorization;

namespace DCS.Controllers
{
    [Authorize]
    public class PatientController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public PatientController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}

		[Route("/PatientList")]
        public IActionResult PatientList()
        {
            return View();
        }
        [Route("/_PatientList")]
        public async Task<IActionResult> _PatientList(Common common)
        {
            var list = new List<Patient>();
            int? projectid = User.GetProjectId();
            common.ProjectId = projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/GetPatient", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Patient>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/EditPatient")]
        public async Task<IActionResult> EditPatient(int id)
        {
            var list = new Patient();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/GetPatientById/{id}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<Patient>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/PatientAddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromForm] string patientData, IFormFile file)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };
            int? projectid = User.GetProjectId();

            try
            {
                var request = JsonConvert.DeserializeObject<Patient>(patientData);
                request.ProjectId = projectid;
                request.ImagePath = file;
                    var apiRes = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/Patient/AddOrUpdatePatient", request, file, null, User.GetLoggedInUserToken());
                var res = await apiRes.Content.ReadAsStringAsync();
                if (apiRes != null && apiRes.IsSuccessStatusCode)
                {
                    response = JsonConvert.DeserializeObject<Response>(res);
                    return Json(response);
                }
            }
            catch (Exception ex)
            {
            }

            return Json(response);
        }
        [Route("/P_Details")]
        public async Task<IActionResult> _Details(int id)
        {
            var list = new Patient();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/GetPatientById/{id}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<Patient>(apiRes.Result);
            }
            return PartialView(list);
        }
    }
}
