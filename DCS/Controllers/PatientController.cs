using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

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
        public async Task<IActionResult> _PatientList(string? email,int? pid)
        {
            var list = new List<Patient>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/GetPatient/{email}/{pid}", null, null);
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
        public async Task<IActionResult> AddOrUpdate(Patient patient)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Patient/AddOrUpdatePatient", JsonConvert.SerializeObject(patient), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }

    }
}
