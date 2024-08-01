using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Collections.Generic;
using API.Claims;

namespace DCS.Controllers
{
    public class TreatmentController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public TreatmentController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }

        [Route("/TreatmentList")]
        public IActionResult TreatmentList()
        {
            return View();
        }
        [Route("/_TreatmentList")]
        public async Task<IActionResult> _TreatmentList(Common common)
        {
            var list = new List<Treatment>();
            string? Role = User.GetLoggedInUserRole();
            common.Role = Role;
            int? projectid = User.GetProjectId();
            common.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Treatment/GetTreatmentListOrById", JsonConvert.SerializeObject(common), null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Treatment>>(apiRes.Result);

            }
            return PartialView(list);
        }
        [Route("/_MedicationList")]
        public async Task<IActionResult> _MedicationList(int id)
        {
            var list = new List<Medication>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Treatment/GetMedicationListById/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Medication>>(apiRes.Result);

            }
            return PartialView(list);
        }

        [Route("/EditTreatment")]
        public async Task<IActionResult> EditTreatment(int id)
        {
            var list = new Treatment();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Treatment/GetTreatmentByPId/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<Treatment>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/AddTreatment")]
        public async Task<IActionResult> AddTreatment([FromBody]Treatment treatment)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };
            int? projectid =User.GetProjectId();
            treatment.ProjectId= projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Treatment/AddTreatment", JsonConvert.SerializeObject(treatment), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }

        [Route("/UpdateTreatment")]
        public async Task<IActionResult> UpdateTreatment(Treatment treatment)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Treatment/UpdateTreatment", JsonConvert.SerializeObject(treatment), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }
        [Route("/CreateTreatment")]
        public async Task<IActionResult> CreateTreatment(string? name = "All")
        {
            var list = new List<Doctor>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Doctor>>(apiRes.Result);
            }
            return PartialView(list);
        }
    }
}
