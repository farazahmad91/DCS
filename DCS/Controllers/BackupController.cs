using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
	public class BackupController : Controller
	{
		public IActionResult Index()
		{
			return View();
		}
	}
}
