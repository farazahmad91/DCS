using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class DCSPoliciesController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public DCSPoliciesController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }
        [Route("DCSPoliciesList")]
        public IActionResult DCSPoliciesList()
        {
            return View();
        }
        [Route("_DCSPoliciesList")]
        public async Task<IActionResult> _DCSPoliciesList(string? name)
        {
            var list = new List<DCSPolicies>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSPolicies/GetDCSPolicies/{name}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<DCSPolicies>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/EditDCSPolicies")]
        public async Task<IActionResult> EditDCSPolicies(int id)
        {
            var list = new DCSPolicies();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSPolicies/GetDCSPoliciesById/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<DCSPolicies>(apiRes.Result);
            }
            return View(list);
        }
        [HttpPost]
        [Route("/AddOrUpdateDCSPolicies")]
        public async Task<IActionResult> AddOrUpdateDCSPolicies(DCSPolicies policies)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSPolicies/AddorUpdateDCSPolicies", JsonConvert.SerializeObject(policies), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }
    }
}
