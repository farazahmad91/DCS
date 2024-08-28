using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    [Authorize]
    public class AdminController : Controller
    {
        public AdminController() { }
        [Route("{id?}/Admin")]
        public IActionResult Home()
        {
            return View();
        }
        [Route("/_Admin")]
        public IActionResult theme1()
        {
            return View();
        }
        [Route("/__Admin")]
        public IActionResult theme2()
        {
            return View();
        }
        [Route("/___Admin")]
        public IActionResult theme3()
        {
            return View();
        }
        [AllowAnonymous]
        [Route("/DCS")]
        public IActionResult LandingPage()
        {
            return View();
        }
    }
}
