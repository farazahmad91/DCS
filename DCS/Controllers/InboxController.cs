using API.AppCode.APIRequest;
using API.AppCode.Configuration;
using API.AppCode.IService;
using API.Claims;
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
        public InboxController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl = _configuration["APIBaseURl:BaseURl"];
        }
        [Route("/GetComposeMail")]
        public IActionResult GetComposeMail()
        {
            return View();
        }
    }
}
