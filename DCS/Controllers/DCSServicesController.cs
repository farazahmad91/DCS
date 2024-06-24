using API.AppCode.APIRequest;
using API.AppCode.IML;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Collections.Generic;

namespace DCS.Controllers
{
	public class DCSServicesController : Controller
	{
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		public DCSServicesController(IConfiguration configuration)
		{
			this._configuration = configuration;
			_BaseUrl =  _configuration["APIBaseURl:BaseURl"];
		}
        [Route("Services")]
        public IActionResult Services()
		{
			return View();
		}
		[HttpPost]
		[Route("Pricing")]
		public async Task<IActionResult> Pricing(string? name)
		{
			var list = new List<DCSService>();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSServices/GetDCSService/{name}", null, null);
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<List<DCSService>>(apiRes.Result);
			}
			return PartialView(list);
		}
		[Route("Service-List")]
        public IActionResult ServicesList()
        {
            return View();
        }
        [Route("_ServiceList")]
        public async Task<IActionResult> _ServiceList(string? name)
		{
			var list = new List<DCSService>();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSServices/GetDCSService/{name}", null, null);
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<List<DCSService>>(apiRes.Result);
			}
			return PartialView(list);
		}

		[Route("/EditService")]
		public async Task<IActionResult> EditService(int id)
		{
			var list = new DCSService();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSServices/GetDCSServiceById/{id}", null, null);
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<DCSService>(apiRes.Result);
			}
			return View(list);
		}
		[HttpPost]
		[Route("/AddOrUpdateService")]
		public async Task<IActionResult> AddOrUpdateService(DCSService services)
		{
			var response = new Response()
			{
				ResponseText = "Failed To Add or Update Service",
				StatusCode = ResponseStatus.FAILED,
			};

			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/DCSServices/AddorUpdateDCSService", JsonConvert.SerializeObject(services), null);
			if (apiRes.Result != null)
			{
				response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
				return Json(response);
			}
			return Json(response);
		}
	}
}
