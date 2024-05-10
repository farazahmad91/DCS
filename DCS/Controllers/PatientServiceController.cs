using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class PatientServiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
