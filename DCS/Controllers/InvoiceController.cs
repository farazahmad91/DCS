using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class InvoiceController : Controller
    {
		[Route("Invoice")]
		public IActionResult Invoice()
        {
            return View();
        }
		public IActionResult List()
		{
			return PartialView();
		}
		[Route("Add-Invoice")]
		public IActionResult AddInvoice()
		{
			return View();
		}
		[Route("Invoice-Report")]
		public IActionResult InvoiceView()
		{
			return View();
		}
	}
}
