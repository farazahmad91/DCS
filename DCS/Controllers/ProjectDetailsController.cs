﻿using API.AppCode.APIRequest;
using API.Claims;
using API.DBContext.Entities;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;

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

		[Route("App-Setting")]
		public async Task<IActionResult> Setting(int id=0)
		{
			var list = new ApplicationSetting();
            try
            {
				var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ApplicationSetting/GetApplicationSettingByProjectId/{id}", null, null);
				if (apiRes.Result != null)
				{
					list = JsonConvert.DeserializeObject<ApplicationSetting>(apiRes.Result);
				}
				return PartialView(list);
			}
            catch (Exception)
            {

				return PartialView(list);
			}
		}
        [Route("AppSetting-List")]
        public IActionResult AppSettingList()
        {
            return View();
        }

        [Route("_SettingList")]
        public async Task<IActionResult> _SettingList(int? id=0)
        {
            var list = new List<ApplicationSetting>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ApplicationSetting/GetApplicationSetting/{id}", null, null);
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
        public async Task<IActionResult> _ProjectList(string? name="All")
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
        public async Task<IActionResult> _EditProjectDetails(int id)
        {
            var list = new ProjectDetails();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ProjectDetails/GetProjectDetailsByProjectId/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<ProjectDetails>(apiRes.Result);
            }
            return PartialView(list);
        }
        [HttpPost]
        [Route("/AddOrUpdateProject")]
        public async Task<IActionResult> AddOrUpdateService([FromForm] string projectData, IFormFile file)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };
            string password = GenerateRandomPassword(6);
            try
            {
                var request = JsonConvert.DeserializeObject<ProjectDetails>(projectData);
                if (request.ProjectId == 0 || request.ProjectId == null)
                {
                    var newrequest = JsonConvert.DeserializeObject<RegisterViewModel>(projectData);
                    newrequest.Password=password;
                    newrequest.ConfirmPassword=password;
                    newrequest.Role="Merchant";
                    var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/Registration", JsonConvert.SerializeObject(newrequest));
                    if (apiRes.Result != null)
                    {
                        response = JsonConvert.DeserializeObject<Response>(apiRes.Result);

                        if (response.StatusCode==ResponseStatus.SUCCESS)
                        {

                            request.ImagePath=file;
                            var apiResponse = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/ProjectDetails/AddorUpdateProjectDetails", request, file, null, null);
                            var res = await apiResponse.Content.ReadAsStringAsync();
                            if (apiResponse != null && apiResponse.IsSuccessStatusCode)
                            {
                                response = JsonConvert.DeserializeObject<Response>(res);
                                return Json(response);
                            }
                        }
                        return Json(response);
                    }
                }
                else if (request.ProjectId!=0)
                {
                    request.ImagePath=file;
                    var apiResponse = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/ProjectDetails/AddorUpdateProjectDetails", request, file, null, null);
                    var res = await apiResponse.Content.ReadAsStringAsync();
                    response = JsonConvert.DeserializeObject<Response>(res);
                    if (response.StatusCode==ResponseStatus.SUCCESS)
                    {

                        return Json(response);
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
			
            

            return Json(response);
        }

        static string GenerateRandomPassword(int length)
        {
            const string lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
            const string uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
            const string numberChars = "1234567890";
            const string specialChars = "!@#$%^&*()";

            // Combine all character sets
            string allChars = lowercaseChars + uppercaseChars + numberChars + specialChars;

            Random rnd = new Random();
            StringBuilder res = new StringBuilder();

            // Ensure at least one lowercase, one uppercase, one number, and one special character
            res.Append(lowercaseChars[rnd.Next(lowercaseChars.Length)]);
            res.Append(uppercaseChars[rnd.Next(uppercaseChars.Length)]);
            res.Append(numberChars[rnd.Next(numberChars.Length)]);
            res.Append(specialChars[rnd.Next(specialChars.Length)]);

            // Fill the rest of the password length with random characters from all sets
            for (int i = 4; i < length; i++)
            {
                res.Append(allChars[rnd.Next(allChars.Length)]);
            }

            // Shuffle the resulting characters to ensure randomness
            return new string(res.ToString().OrderBy(c => rnd.Next()).ToArray());
        }
    
    [HttpPost]
		[Route("/AddOrUpdateAppSetting")]
		public async Task<IActionResult> AddOrUpdateAppSetting(ApplicationSetting setting)
		{
			var response = new Response()
			{
				ResponseText = "Failed To Add or Update Service",
				StatusCode = ResponseStatus.FAILED,
			};

			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ApplicationSetting/UpdateApplicationSetting", JsonConvert.SerializeObject(setting), null);
			if (apiRes.Result != null)
			{
				response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
				return Json(response);
			}
			return Json(response);
		}

        [Route("GetApplicationSettingByIdOnload")]
        public async Task<IActionResult> GetApplicationSettingByIdOnload()
        {
            var Email = User.FindFirstValue(ClaimTypes.Email);
            var list = new ApplicationSetting();
            try
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ApplicationSetting/GetApplicationSettingByIdOnload/{Email}", null, null);
                if (apiRes.Result != null)
                {
                    list = JsonConvert.DeserializeObject<ApplicationSetting>(apiRes.Result);
                }
                return Json(list);
            }
            catch (Exception)
            {

                return Json(list);
            }
        }
    }
}
