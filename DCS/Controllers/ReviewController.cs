using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class ReviewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
