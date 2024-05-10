using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class PatientController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
