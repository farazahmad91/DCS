using API.AppCode.APIRequest;
using API.AppCode.Configuration;
using API.AppCode.IService;
using API.Claims;
using DCS.APIRequest;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    [Authorize]
    public class DoctorsController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public DoctorsController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctor/{name}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Doctor>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/D-Edit")]
        public async Task<IActionResult> _DrEdit(int id )
        {
            var list = new Doctor();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctorById/{id}", null, User.GetLoggedInUserToken());
           
                list = JsonConvert.DeserializeObject<Doctor>(apiRes.Result);
            
            return PartialView(list);
        }

        [Route("/D-AddOrUpdate")]
        public async Task<IActionResult> DrAddOrUpdate([FromForm] string doctorData, IFormFile file)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Doctor",
                StatusCode = ResponseStatus.FAILED,
            };
			
			try
            {
                // Deserialize doctorData into a Doctor object
                var request = JsonConvert.DeserializeObject<Doctor>(doctorData);
                if (request == null)
                {
                    response.ResponseText = "Invalid doctor data";
                    return Json(response);
                }
				int? projectId = User.GetProjectId();
				request.ProjectId = projectId;
				// Add file to the request object
				if (file != null)
                {
                    // Assuming ImagePath is a property to store the file path
                    request.ImagePath = file;
                }

                // Send the request to the API
                var apiRes = await APIRequestML.O.SendFileAndContentAsync(
                    $"{_BaseUrl}/api/Doctor/AddOrUpdateDoctor",
                    request,
                    file,
                    null,
                    null
                );

                if (apiRes != null && apiRes.IsSuccessStatusCode)
                {
                    var res = await apiRes.Content.ReadAsStringAsync();
                    response = JsonConvert.DeserializeObject<Response>(res);
                    return Json(response);
                }

                response.ResponseText = "API request failed";
                return Json(response);
            }
            catch (Exception ex)
            {
                // Log the exception (you could use a logging framework)
                Console.WriteLine(ex.Message);

                // Return a generic failure response
                response.ResponseText = "An error occurred while processing the request";
                response.StatusCode = ResponseStatus.FAILED;
                return Json(response);
            }
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/GetDoctorById/{id}", null, User.GetLoggedInUserToken());
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

        [HttpPost]
        [Route("DoctorModifyStatus")]
        public async Task<IActionResult> DoctorModifyStatus(int Id)
        {
            try
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Doctor/DoctorModifyStatus/{Id}",null , User.GetLoggedInUserToken());
                Response jsonResponse = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(jsonResponse);
            }
            catch (Exception ex)
            {
                Console.WriteLine("An error occurred: " + ex.Message);
                return Json(new { error = "An error occurred while processing your request." });
            }
        }
    }
}
