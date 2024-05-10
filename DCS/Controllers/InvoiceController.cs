using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class InvoiceController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
