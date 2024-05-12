using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class PatientServiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
