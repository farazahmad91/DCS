using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class ReviewController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
