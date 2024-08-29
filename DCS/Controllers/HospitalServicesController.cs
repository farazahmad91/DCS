using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.CodeAnalysis.RulesetToEditorconfig;
using API.AppCode.IML;
using API.Claims;
using DCS.APIRequest;
using Microsoft.AspNetCore.Authorization;

namespace DCS.Controllers
{
    [Authorize]
    public class HospitalServicesController : Controller
	{
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public HospitalServicesController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}

		[Route("HospitalServices-List")]
		public IActionResult HospitalServices()
		{
			return View();
		}
		[Route("_HospitalServicesList")]
		public async Task<IActionResult> _HospitalServices(Common common)
		{
			var list = new List<HospitalServices>();
            int? projectid = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.Role = Role;
            common.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<List<HospitalServices>>(apiRes.Result);
			}
			return PartialView(list);
		}

		[Route("/EditHospitalServices")]
		public async Task<IActionResult> EditService(Common common)
		{
			var res = new HospitalServices();
            int? projectid = User.GetProjectId();
            common.ProjectId =projectid;
			if (common.Id != 0)
			{
				var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
				if (apiRes.Result != null)
				{
					var list = JsonConvert.DeserializeObject<List<HospitalServices>>(apiRes.Result);
					res = list?.FirstOrDefault() ?? new HospitalServices(); ;
				}
                return View(res);
            }
			return View(res);
		}
		[HttpPost]
		[Route("/AddOrUpdateHospitalServices")]
		public async Task<IActionResult> AddOrUpdateService([FromForm] string HospitalServices, IFormFile file)
		{
			var response = new Response()
			{
				ResponseText = "Failed To Add or Update Service",
				StatusCode = ResponseStatus.FAILED,
			};
            var req = JsonConvert.DeserializeObject<HospitalServices>(HospitalServices);
            req.ImagePath = file;
			int? projectid = User.GetProjectId();
            req.ProjectId =projectid;
            var apiRes = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/HospitalServices/AddorUpdateHospitalServices",req, file);
            if (apiRes != null && apiRes.IsSuccessStatusCode)
            {
                var res = await apiRes.Content.ReadAsStringAsync();
                response = JsonConvert.DeserializeObject<Response>(res);
                return Json(response);
            }
            return Json(response);
		}

        [Route("/HS_Status")]
        public async Task<IActionResult> Status(Common common)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Update Status",
                StatusCode = ResponseStatus.FAILED,
            };
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/UpdateHospitalServiceStatus", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
            }
            return Json(response);
        }
    }
}
