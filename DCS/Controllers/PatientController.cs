using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using API.Claims;
using System.Net;

namespace DCS.Controllers
{
    public class PatientController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public PatientController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }

        [Route("/PatientList")]
        public IActionResult PatientList()
        {
            return View();
        }
        [Route("/_PatientList")]
        public async Task<IActionResult> _PatientList(int? pid=0)
        {
            var list = new List<Patient>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/GetPatient/{pid}", null, null);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/GetPatientById/{id}", null, null);
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

            var request = JsonConvert.DeserializeObject<Patient>(patientData);
            request.ImagePath=file;
            var apiRes = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/Patient/AddOrUpdatePatient", request, file, null, null);
            var res = await apiRes.Content.ReadAsStringAsync();
            if (apiRes != null && apiRes.IsSuccessStatusCode)
            {
                response = JsonConvert.DeserializeObject<Response>(res);
                return Json(response);
            }

            return Json(response);
        }
        [Route("/P_Details")]
        public async Task<IActionResult> _Details(int id)
        {
            var list = new Patient();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/GetPatientById/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<Patient>(apiRes.Result);
            }
            return PartialView(list);
        }
    }
}
