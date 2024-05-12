using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class WorkingHoursController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
