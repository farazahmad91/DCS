using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class FAQController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
