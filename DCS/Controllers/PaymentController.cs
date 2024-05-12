using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class PaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
