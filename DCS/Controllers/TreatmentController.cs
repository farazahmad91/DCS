using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class TreatmentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
