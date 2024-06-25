using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
		public async Task<IActionResult> _HospitalServices(string? name)
		{
			var list = new List<HospitalServices>();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServices/{name}", null, null);
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<List<HospitalServices>>(apiRes.Result);
			}
			return PartialView(list);
		}

		[Route("/EditHospitalServices")]
		public async Task<IActionResult> EditService(int id)
		{
			var list = new HospitalServices();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesById/{id}", null, null);
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<HospitalServices>(apiRes.Result);
			}
			return View(list);
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

			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/AddorUpdateHospitalServices", JsonConvert.SerializeObject(services), null);
			if (apiRes.Result != null)
			{
				response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
				return Json(response);
			}
			return Json(response);
		}
	}
}
