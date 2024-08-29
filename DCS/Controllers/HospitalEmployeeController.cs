using API.AppCode.APIRequest;
using API.Claims;
using API.DBContext.Entities;
using Azure.Core;
using DCS.APIRequest;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    [Authorize]
    public class HospitalEmployeeController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public HospitalEmployeeController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}
		[Route("Employees")]
        public async Task<IActionResult> EmployeeListIndex()
        {
            return View();
        }

        [Route("_EmployeeList")]
        public async Task<IActionResult> _EmployeeList(Common common)
        {
            var res = new List<HospitalEmployee>();
            if (common.ProjectId==0 || common.ProjectId==null)
            {
                int? projectId = User.GetProjectId();
                string? Role = User.GetLoggedInUserRole();
                common.ProjectId = projectId;
                common.Role = Role; 
            }
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalEmployee/GetHospitalEmployeeListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
                if (apiRes.Result!=null)
                {
                    res = JsonConvert.DeserializeObject<List<HospitalEmployee>>(apiRes.Result);
                    return PartialView(res);
                }
            return PartialView(res);
        }
        [Route("EditEmployees")]
        public async Task<IActionResult> EditEmployees(Common common)
        {
            var res = new HospitalEmployee();
            if (common.Id!=0)
            {
                int? projectId = User.GetProjectId();
                common.ProjectId = projectId;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalEmployee/GetHospitalEmployeeListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
                if (apiRes.Result!=null)
                {
                    var list = JsonConvert.DeserializeObject<List<HospitalEmployee>>(apiRes.Result);
                    res = list.FirstOrDefault()?? new HospitalEmployee();
                    return PartialView(res);
                }

            }
            return PartialView(res);
        }

        [Route("AddOrUpdateEmployees")]
        public async Task<IActionResult> AddOrUpdateEmployees([FromForm] string  employee, IFormFile file1, IFormFile file2)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Employee",
                StatusCode = ResponseStatus.FAILED,
            };
            var req = JsonConvert.DeserializeObject<HospitalEmployee>(employee);
            req.ImagePath=file1;
            req.AadhaarImagePath=file2;
            int? projectId = User.GetProjectId();
            req.ProjectId = projectId;
            if (req.EmployeeId==0 || req.EmployeeId==null)
            {
                if (req.ImagePath==null || req.AadhaarImagePath==null)
                {
                    response.StatusCode=ResponseStatus.FAILED;
                    response.ResponseText="All Fields Required!!";
                    return Json(response);
                }
            }
            var apiRes = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/HospitalEmployee/AddOrUpdateHospitalEmployee",req,file1,file2, User.GetLoggedInUserToken());

                if (apiRes != null && apiRes.IsSuccessStatusCode)
                {
                    var res = await apiRes.Content.ReadAsStringAsync();
                    response = JsonConvert.DeserializeObject<Response>(res);
                    return Json(response);
                }
            
            return Json(response);
        }

        [Route("/E_Status")]
        public async Task<IActionResult> Status(Common common)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Update Status",
                StatusCode = ResponseStatus.FAILED,
            };
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalEmployee/UpdateHospitalEmployeeStatus", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
            }
            return Json(response);
        }
    }
}

   