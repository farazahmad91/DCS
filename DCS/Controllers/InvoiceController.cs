using Microsoft.AspNetCore.Mvc;

namespace SDClinic.Controllers
{
    public class InvoiceController : Controller
    {
        public IActionResult Invoice()
        {
            return View();
        }
		public IActionResult List()
		{
			return View();
		}
		public IActionResult EditInvoice()
		{
			return View();
		}
	}
}
