using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
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
