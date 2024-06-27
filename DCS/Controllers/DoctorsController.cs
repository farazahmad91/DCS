using API.AppCode.APIRequest;
using API.AppCode.Configuration;
using API.AppCode.IService;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class DoctorsController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public DoctorsController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }
        [Route("/DoctorsList")]
		public IActionResult GetDoctors()
        {
            return View();
        }
        [Route("/D-List")]
        public async Task<IActionResult> _DoctorsList(string? name="All")
        {
            var list = new List<Doctor>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Doctor>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/D-Edit")]
        public async Task<IActionResult> _DrEdit(int id)
        {
            var list = new Doctor();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctorById/{id}", null, null);
           
                list = JsonConvert.DeserializeObject<Doctor>(apiRes.Result);
            
            return PartialView(list);
        }

        [Route("/D-AddOrUpdate")]
        public async Task<IActionResult> DrAddOrUpdate(Doctor doctor)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/AddOrUpdateDoctor", JsonConvert.SerializeObject(doctor), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }

        [Route("/Doctors")]
        public IActionResult Doctors()
        {
            return View();
        }

        [Route("/_Doctors")]
        public IActionResult _Doctors()
        {
            return View();
        }

        [Route("/D-detail")]
        public async Task<IActionResult> _detail(int id)
        {
            var list = new Doctor();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctorById/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<Doctor>(apiRes.Result);
            }
            return PartialView(list);
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
