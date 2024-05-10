using Microsoft.AspNetCore.Mvc;
using SDClinic.Models;
using System.Diagnostics;

namespace SDClinic.Controllers
{
    public class HomeController : Controller
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
            _logger = logger;
        }
        [Route("/")]
        public IActionResult Index()
        {
            return View();
        }
        [Route("Contact-us")]
        public IActionResult Contact(string Name, string Address)
        {
            return View();
        }
        [Route("Privacy")]
        public IActionResult Privacy()
        {
            return View();
        }

        
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
