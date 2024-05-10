using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class MedicalHistoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
