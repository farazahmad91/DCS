using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.CodeAnalysis.RulesetToEditorconfig;
using API.AppCode.IML;
using API.Claims;

namespace DCS.Controllers
{
	public class HospitalServicesController : Controller
	{
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		public HospitalServicesController(IConfiguration configuration)
		{
			this._configuration = configuration;
			_BaseUrl =  _configuration["APIBaseURl:BaseURl"];
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
            common.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), null);
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
				var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), null);
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
		public async Task<IActionResult> AddOrUpdateService(HospitalServices services)
		{
			var response = new Response()
			{
				ResponseText = "Failed To Add or Update Service",
				StatusCode = ResponseStatus.FAILED,
			};
            int? projectid = User.GetProjectId();
            services.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/AddorUpdateHospitalServices", JsonConvert.SerializeObject(services), null);
			if (apiRes.Result != null)
			{
				response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/UpdateHospitalServiceStatus", JsonConvert.SerializeObject(common), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
            }
            return Json(response);
        }
    }
}
