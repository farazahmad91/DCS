using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;

namespace DCS.Controllers
{
    public class PurchaseServiceController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public PurchaseServiceController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PurchaseService/GetPurchaseService/{email}", null, null);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PurchaseService/GetPurchaseServiceById/{id}", null, null);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/PurchaseService/AddOrUpdatePurchaseService", JsonConvert.SerializeObject(purchase), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }
    }
}
