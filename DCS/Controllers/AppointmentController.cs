using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class AppointmentController : Controller
    {
        [Route("/Appointment")]
        public IActionResult Appointment()
        {
            return View();
        }
        [Route("/A-List")]
        public IActionResult AppointmentList()
        {
            return View();
        }
        [Route("/A-Edit")]
        public IActionResult Edit(int id)
        {
            return PartialView();
        }

        [Route("/A-AddOrUpdate")]
        public IActionResult AddOrUpdate(int id)
        {
            var i = 0;
            return Json(i);
        }

        [Route("/A-Delete")]
        public IActionResult Delete(int id)
        {
            return View();
        }
    }
}
