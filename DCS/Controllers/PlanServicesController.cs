using API.AppCode.APIRequest;
using API.AppCode.IML;
using API.Claims;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DCS.Controllers
{
    [Authorize]
    public class PlanServicesController : Controller
	{
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		public PlanServicesController(IConfiguration configuration)
		{
			this._configuration = configuration;
			_BaseUrl =  _configuration["APIBaseURl:BaseURl"];
		}
        [Route("Services")]
        public IActionResult Services()
		{
			return View();
		}

		[Route("Pricing")]
		public async Task<IActionResult> Pricing(string? name="All")
		{
			var list = new List<PlanServices>();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PlanServices/GetDCSService/{name}", null, User.GetLoggedInUserToken());
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<List<PlanServices>>(apiRes.Result);
			}
			return PartialView(list);
		}
		[Route("Service-List")]
        public IActionResult ServicesList()
        {
            return View();
        }
        [Route("_ServiceList")]
        public async Task<IActionResult> _ServiceList(string? name = "All")
		{
			var list = new List<PlanServices>();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PlanServices/GetDCSService/{name}", null, User.GetLoggedInUserToken());
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<List<PlanServices>>(apiRes.Result);
			}
			return PartialView(list);
		}

		[Route("/EditPlan")]
		public async Task<IActionResult> EditPlan(int id)
		{
			var list = new PlanServices();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PlanServices/GetDCSServiceById/{id}", null, User.GetLoggedInUserToken());
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<PlanServices>(apiRes.Result);
			}
			return PartialView(list);
		}
		[HttpPost]
		[Route("/AddOrUpdatePlan")]
		public async Task<IActionResult> AddOrUpdatePlan(PlanServices services)
		{
			var response = new Response()
			{
				ResponseText = "Failed To Add or Update Service",
				StatusCode = ResponseStatus.FAILED,
			};

			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PlanServices/AddorUpdateDCSService", JsonConvert.SerializeObject(services), User.GetLoggedInUserToken());
			if (apiRes.Result != null)
			{
				response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
				return Json(response);
			}
			return Json(response);
		}
	}
}
