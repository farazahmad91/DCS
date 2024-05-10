using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class PaymentController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
