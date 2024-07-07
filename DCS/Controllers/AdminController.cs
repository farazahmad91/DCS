using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class AdminController : Controller
    {
        public AdminController() { }
        [Route("/Admin")]
        public IActionResult Home()
        {
            return View();
        }
        [Route("/DCS")]
        public IActionResult LandingPage()
        {
            return View();
        }
    }
}
