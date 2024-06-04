using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

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
		[HttpGet]
		public IActionResult AddInvoice()
		{
			return View();
		}

		[HttpPost]
		[Route("AddInvoice")]
		public IActionResult AddInvoice([FromBody] InvoiceViewModel invoiceViewModel)
		{
			if (invoiceViewModel == null)
			{
				return BadRequest("Invalid invoice data.");
			}

			// Process the received invoiceViewModel object here

			return Ok(new { message = "Invoice created successfully" });
		}


		[Route("Invoice-Report")]
		public IActionResult InvoiceView()
		{
			return View();
		}
	}
}
