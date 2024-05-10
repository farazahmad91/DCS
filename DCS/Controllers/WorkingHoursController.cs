using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class WorkingHoursController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
