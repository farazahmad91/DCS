using Microsoft.AspNetCore.Mvc;
using DCS.APIRequest;

namespace DCS.Controllers
{
    public class ReviewController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public ReviewController(IConfiguration configuration, IBaseUrl baseUrl)
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
