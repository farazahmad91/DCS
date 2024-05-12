using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class TreatmentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
