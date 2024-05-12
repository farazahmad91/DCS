using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class PatientController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
