using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class FAQController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }
    }
}
