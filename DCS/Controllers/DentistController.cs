using Microsoft.AspNetCore.Mvc;

namespace DCS.Controllers
{
    public class DentistController : Controller
    {
        [Route("/Dentist")]
        public IActionResult Dentist()
        {
            return View();
        }
        [Route("/D-List")]
        public IActionResult DentistList()
        {
            return View();
        }
        [Route("/D-Edit")]
        public IActionResult Edit(int id)
        {
            return PartialView();
        }

        [Route("/D-AddOrUpdate")]
        public IActionResult AddOrUpdate(int id)
        {
            var i = 0;
            return Json(i);
        }

        [Route("/D-StatusUpdate")]
        public IActionResult StatusUpdate(int id)
        {
            var i = 0;
            return Json(i);
        }

        [Route("/D-Delete")]
        public IActionResult Delete(int id)
        {
            return View();
        }
    }
}
