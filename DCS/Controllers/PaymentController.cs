using DCS.APIRequest;
using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class PaymentController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public PaymentController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}
		public IActionResult Index()
        {
            return View();
        }
    }
}
