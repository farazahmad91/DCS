using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class PoliciesController : Controller
    {
        public PoliciesController()
        {
                
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
