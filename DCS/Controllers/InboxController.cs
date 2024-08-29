using API.AppCode.APIRequest;
using API.AppCode.Configuration;
using API.AppCode.IService;
using API.Claims;
using DCS.APIRequest;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class InboxController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public InboxController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}
		[Route("/GetComposeMail")]
        public IActionResult GetComposeMail()
        {
            return View();
        }
    }
}
