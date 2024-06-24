using API.AppCode.APIRequest;
using API.Claims;
using API.DBContext.Entities;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
	public class ProjectDetailsController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public ProjectDetailsController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }
		[Route("MasterSetting")]
		public IActionResult MasterSetting()
		{
			return View();
		}
		[HttpPost]
		[Route("App-Setting")]
		public async Task<IActionResult> Setting()
		{
			var list = new List<ApplicationSetting>();
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ApplicationSetting/GetApplicationSetting", null, null);
			if (apiRes.Result != null)
			{
				list = JsonConvert.DeserializeObject<List<ApplicationSetting>>(apiRes.Result);
			}
			return PartialView(list);
		}
        [Route("Project-List")]
        public IActionResult ProjectList()
        {
            return View();
        }
        [Route("_ProjectList")]
        public async Task<IActionResult> _ProjectList(string? name)
        {
            var list = new List<ProjectDetails>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ProjectDetails/GetProjectDetails/{name}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<ProjectDetails>>(apiRes.Result);
            }
            return PartialView(list);
        }


        [Route("/EditProject")]
        public async Task<IActionResult> EditProjectDetails(int id)
        {
            var list = new DCSService();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ProjectDetails/GetProjectDetailsByProjectId/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<DCSService>(apiRes.Result);
            }
            return PartialView(list);
        }
        [HttpPost]
        [Route("/AddOrUpdateProject")]
        public async Task<IActionResult> AddOrUpdateService(ProjectDetails pdetails)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ProjectDetails/AddorUpdateProjectDetails", JsonConvert.SerializeObject(pdetails), null);
            if (apiRes.Result != null)
            {
                response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                return Json(response);
            }
            return Json(response);
        }
    }
}
