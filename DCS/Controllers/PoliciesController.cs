using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
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
