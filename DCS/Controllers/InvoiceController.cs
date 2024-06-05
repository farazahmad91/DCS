using API.AppCode.APIRequest;
using API.Claims;
using API.RequestInfo;
using API.SendEmail;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class InvoiceController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public InvoiceController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }
        [Route("Invoice")]
		public IActionResult Invoice()
        {
            return View();
        }
		public IActionResult List()
		{
			return PartialView();
		}
		[Route("Add-Invoice")]
		[HttpGet]
		public IActionResult AddInvoice()
		{
			return View();
		}

		[HttpPost]
		[Route("AddInvoice")]
		public async Task<IActionResult> AddInvoice([FromBody] InvoiceViewModel invoiceViewModel)
		{

            var res = new Response()
            {
                ResponseText="something wrong!",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {
                var token = User.GetLoggedInUserToken();
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Invoice/InsertInvoiceData", JsonConvert.SerializeObject(invoiceViewModel),null);
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return Json(res);
                }
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText="Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }
		}


		[Route("Invoice-Report")]
		public IActionResult InvoiceView()
		{
			return View();
		}
	}
}
