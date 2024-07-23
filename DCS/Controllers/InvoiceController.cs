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
        private readonly Sendmail _sendmail;
        public InvoiceController(IConfiguration configuration, Sendmail sendmail)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
            _sendmail=sendmail;
        }
        [Route("Invoice")]
		public IActionResult Invoice()
        {
            return View();
        }
        [Route("_InvoiceList")]
        public async Task<IActionResult> _InvoiceList(Common common)
		{
			var res = new Response()
			{
				ResponseText = "something wrong!",
				StatusCode = ResponseStatus.FAILED
			};
			var list = new List<InvoiceViewModel>();
			try
			{
				var token = User.GetLoggedInUserToken();
                int? projectId = User.GetProjectId();
                common.ProjectId = projectId;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Invoice/GetInvoiceListAndBYId", JsonConvert.SerializeObject(common), null);
				if (apiRes.Result != null)
				{
					list = JsonConvert.DeserializeObject<List<InvoiceViewModel>>(apiRes.Result);


					return PartialView(list);
				}
				return PartialView(res);
			}
			catch (Exception ex)
			{
				res.ResponseText = "Something wrong!!";
				res.StatusCode = ResponseStatus.FAILED;
				return Json(res);
			}
		}
		[Route("Add-Invoice")]
		[HttpGet]
		public async Task<IActionResult> AddInvoice(string name= "All")
		{
            var list = new List<Medicines>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicines/{name}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Medicines>>(apiRes.Result);
            }
            return PartialView(list);
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
                int? projectid = User.GetProjectId();
                invoiceViewModel.ProjectId=projectid;
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
		public async Task<IActionResult> InvoiceView(int id)
		{
            var res = new Response()
            {
                ResponseText = "something wrong!",
                StatusCode = ResponseStatus.FAILED
            };
            var list = new InvoiceViewModelDetails();
            try
            {
                var token = User.GetLoggedInUserToken();
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Invoice/GetInvoiceDataByInvoiceId/{id}", null, null);
                if (apiRes.Result != null)
                {
                    list = JsonConvert.DeserializeObject<InvoiceViewModelDetails>(apiRes.Result);


                    return View(list);
                }
                return View(res);
            }
            catch (Exception ex)
            {
                res.ResponseText = "Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return View(res);
            }
        }
        [Route("EmailInvoiceTemplate")]
        public async Task<IActionResult> EmailInvoiceTemplate(int id)
        {
            var res = new Response()
            {
                ResponseText = "something wrong!",
                StatusCode = ResponseStatus.FAILED
            };
            var list = new InvoiceViewModelDetails();
            try
            {
                var token = User.GetLoggedInUserToken();
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Invoice/GetInvoiceDataByInvoiceId/{id}", null, null);
                if (apiRes.Result != null)
                {
                    list = JsonConvert.DeserializeObject<InvoiceViewModelDetails>(apiRes.Result);
                    
                    
                    return PartialView(list);
                }
                return PartialView(res);
            }
            catch (Exception ex)
            {
                res.ResponseText = "Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }
        }

        [Route("SendEmailInvoice")]
        public async Task<IActionResult> SendEmailInvoice(SendEmailInvoice sendEmailInvoice)
        {
            var res = new Response()
            {
                ResponseText = "something wrong!",
                StatusCode = ResponseStatus.FAILED
            };
            //var req = JsonConvert.DeserializeObject<SendEmailInvoice>(invoiceDate);
            try
            {
                _sendmail.SendEmails(sendEmailInvoice.Email, sendEmailInvoice.Subject, sendEmailInvoice.Invoice);

                res.ResponseText = "Invoice Sent Successfully";
                res.StatusCode=ResponseStatus.SUCCESS;
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText = "Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }
        }
    }
}
