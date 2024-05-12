using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class MedicalHistoryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
