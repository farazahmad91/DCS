using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class AccountController : Controller
    {
        public AccountController()
        {
                
        }
        public IActionResult Index()
        {
            return View();
        }
    }
}
