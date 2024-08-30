using Microsoft.AspNetCore.Mvc;
using DCS.Models;
using System.Diagnostics;
using Microsoft.AspNetCore.Authorization;


namespace DCS.Controllers
{
  
    public class HomeController : Controller
    {

        public IActionResult Index()
        {
            return View();
        }
        [Route("APIViews")]
		public IActionResult APIViews()
		{
			return View();
		}
        [Route("appointment")]
        public async Task<IActionResult> Appointments()
        {
            string name = "All";
            Common common = new Common();
            int? projectid = 267172;
            common.ProjectId = projectid;
            var AppointVM = new AppointmentVM();
            var apiDocRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, null);
            var apiSerRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/HospitalServices/GetHospitalServicesListOrById", JsonConvert.SerializeObject(common), null);

            if (apiDocRes.Result != null)
            {
                AppointVM.GetDoctors = JsonConvert.DeserializeObject<List<Doctor>>(apiDocRes.Result);
                AppointVM.GetHospitalServices = JsonConvert.DeserializeObject<List<HospitalServices>>(apiSerRes.Result);

            }
            return View(AppointVM);
        }

        [Route("contact-us")]
        public IActionResult Contact()
        {
            return View();
        }
        [Route("about-us")]
        public IActionResult aboutus()
        {
            return View();
        }


        [Route("privacy")]
        public IActionResult Privacy()
        {
            return View();
        }

        [Route("pricing-plan")]
        public IActionResult PricingPlan()
        {
            return View();
        }
        [Route("service")]
        public IActionResult Service()
        {
            return View();
        }

        [Route("dentist")]
        public IActionResult Dentist()
        {
            return View();
        }

        [Route("testimonial")]
        public IActionResult Testimonial()
        {
            return View();
        }
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }
    }
}
