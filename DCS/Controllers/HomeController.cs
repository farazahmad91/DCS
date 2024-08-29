using Microsoft.AspNetCore.Mvc;
using DCS.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;
using DCS.APIRequest;

namespace DCS.Controllers
{
  
    public class HomeController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public HomeController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}
		[Route("/")]
        public IActionResult Index()
        {
            return View();
        }
        [Route("APIViews")]
		public IActionResult APIViews()
		{
			return View();
		}
        [Route("appointment")]
        public IActionResult Appointments()
        {
            return View();
        }

        [Route("contact-us")]
        public IActionResult Contact()
        {
            return View();
        }
        [Route("about-us")]
        public IActionResult aboutus()
        {
            return View();
        }


        [Route("privacy")]
        public IActionResult Privacy()
        {
            return View();
        }

        [Route("pricing-plan")]
        public IActionResult PricingPlan()
        {
            return View();
        }
        [Route("service")]
        public IActionResult Service()
        {
            return View();
        }

        [Route("dentist")]
        public IActionResult Dentist()
        {
            return View();
        }

        [Route("testimonial")]
        public IActionResult Testimonial()
        {
            return View();
        }
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
