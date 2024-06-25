using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using API.AppCode.IML;

namespace DCS.Controllers
{
    public class HospitalPoliciesController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public HospitalPoliciesController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }
        [Route("HospitalPoliciesList")]
        public IActionResult HospitalPoliciesList()
        {
            return View();
        }
        [Route("_HospitalPoliciesList")]
        public async Task<IActionResult> _HospitalPoliciesList(string? name)
        {
            var list = new List<HospitalPolicy>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalPolicies/GetHospitalPolicies/{name}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<HospitalPolicy>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/EditHospitalPolicies")]
        public async Task<IActionResult> EditHospitalPolicies(int id)
        {
            var list = new HospitalPolicy();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalPolicies/GetHospitalPoliciesById/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<HospitalPolicy>(apiRes.Result);
            }
            return View(list);
        }
        [HttpPost]
        [Route("/AddOrUpdateHospitalPolicies")]
        public async Task<IActionResult> AddOrUpdateHospitalPolicies(HospitalPolicy policies)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalPolicies/AddOrUpdateHospitalPolicies", JsonConvert.SerializeObject(policies), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }
    }
}
