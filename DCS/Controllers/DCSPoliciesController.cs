using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using API.Claims;
using System.Data;
using Microsoft.AspNetCore.Authorization;

namespace DCS.Controllers
{
    [Authorize]
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
        public async Task<IActionResult> _DCSPoliciesList(Common common)
        {
            var list = new List<DCSPolicies>();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSPolicies/GetDCSPoliciesListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<DCSPolicies>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/EditDCSPolicies")]
        public async Task<IActionResult> EditDCSPolicies(Common common)
        {
            var res = new DCSPolicies();
            int? projectid = User.GetProjectId();
            common.ProjectId =projectid;
            if (common.Id != 0)
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSPolicies/GetDCSPoliciesListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
                if (apiRes.Result != null)
                {
                    var list = JsonConvert.DeserializeObject<List<DCSPolicies>>(apiRes.Result);
                    res =list?.FirstOrDefault() ?? new DCSPolicies();
                }
                return View(res);
            }
            return View(res);
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
            int? projectid = User.GetProjectId();
            policies.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSPolicies/AddorUpdateDCSPolicies", JsonConvert.SerializeObject(policies), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }

        [Route("/DCS_Status")]
        public async Task<IActionResult> Status(Common common)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Update Status",
                StatusCode = ResponseStatus.FAILED,
            };
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSPolicies/UpdateDCSPoliciesStatus", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
            }
            return Json(response);
        }
    }
}
