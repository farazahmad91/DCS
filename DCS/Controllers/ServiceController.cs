using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class ServiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
