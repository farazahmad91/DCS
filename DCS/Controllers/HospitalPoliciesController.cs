using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using API.AppCode.IML;
using API.Claims;
using Microsoft.AspNetCore.Authorization;

namespace DCS.Controllers
{
    [Authorize]
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
        public async Task<IActionResult> _HospitalPoliciesList(Common common)
        {
            var list = new List<HospitalPolicy>();
            int? projectid = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.Role = Role;
            common.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalPolicies/Proc_GetHospitalPolicyListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<HospitalPolicy>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/EditHospitalPolicies")]
        public async Task<IActionResult> EditHospitalPolicies(Common common)
        {
            var res = new HospitalPolicy();
            int? projectid = User.GetProjectId();
            common.ProjectId =projectid;
            if (common.Id != 0)
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalPolicies/Proc_GetHospitalPolicyListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
                if (apiRes.Result != null)
                {
                    var list = JsonConvert.DeserializeObject<List<HospitalPolicy>>(apiRes.Result);
                    res = list?.FirstOrDefault() ?? new HospitalPolicy();
                    return View(res);
                }
            }
            return View(res);
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
            int? projectid = User.GetProjectId();
            policies.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalPolicies/AddOrUpdateHospitalPolicies", JsonConvert.SerializeObject(policies), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }

        [Route("/HP_Status")]
        public async Task<IActionResult> Status(Common common)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Update Status",
                StatusCode = ResponseStatus.FAILED,
            };
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalPolicies/UpdateHospitalPoliciesStatus", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
            }
            return Json(response);
        }
    }
}
