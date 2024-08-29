using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using DCS.APIRequest;
using API.Claims;
using DCS.APIRequest;

namespace DCS.Controllers
{
    [Authorize]
    public class PurchaseServiceController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public PurchaseServiceController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}

		[Route("Purchase-List")]
        public IActionResult PurchaseList()
        {
            return View();
        }
        [Route("_PurchaseList")]
        public async Task<IActionResult> _PurchaseServiceList(string? email = "All")
        {
            var list = new List<PurchaseService>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PurchaseService/GetPurchaseService/{email}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<PurchaseService>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/EditPurchaseService")]
        public async Task<IActionResult> EditPurchaseService(int id)
        {
            var list = new PurchaseService();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PurchaseService/GetPurchaseServiceById/{id}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<PurchaseService>(apiRes.Result);
            }
            return PartialView(list);
        }
        [HttpPost]
        [Route("/AddPurchaseService")]
        public async Task<IActionResult> AddOrUpdatePurchaseService(PurchaseService purchase)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };
            var email = User.FindFirstValue(ClaimTypes.Email);
            purchase.UserEmail=email;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PurchaseService/AddOrUpdatePurchaseService", JsonConvert.SerializeObject(purchase), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }
    }
}
