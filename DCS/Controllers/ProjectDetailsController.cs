using API.AppCode.APIRequest;
using API.AppCode.IML;
using API.Claims;
using API.DBContext.Entities;
using API.SendEmail;
using API.Service;
using DCS.APIRequest;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity.Data;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Security.Claims;
using System.Text;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace DCS.Controllers
{
    [Authorize]
    public class ProjectDetailsController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        private readonly Sendmail _sendmail;
        private readonly IDapper _dapper;
		private readonly IBaseUrl _baseurl;
		public ProjectDetailsController(IConfiguration configuration , Sendmail sendmail, IDapper dapper, IBaseUrl baseUrl)
        {
            this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
			_sendmail = sendmail;
            _dapper= dapper;
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
        [Route("/ProjectDetails")]
        public async Task<IActionResult> ProjectDetails(int id)
        {
            var list = new ProjectDetails();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ProjectDetails/GetProjectDetailsByProjectId/{id}", null, null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<ProjectDetails>(apiRes.Result);
            }
            return PartialView(list);
        }
        [AllowAnonymous]
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
            var pId = GenerateProjectId(6);

          


            try
            {
                var request = JsonConvert.DeserializeObject<ProjectDetails>(projectData);
                if (request.ProjectId == 0 || request.ProjectId == null)
                {
                    var newrequest = JsonConvert.DeserializeObject<RegisterViewModel>(projectData);
                    newrequest.ProjectId = Convert.ToInt32(pId);
                    newrequest.Password=password;
                    newrequest.ConfirmPassword=password;
                    newrequest.Role="Merchant";
                    string filePath = null;
                    if (file != null && file.Length > 0)
                    {
                        string relativePath = Path.Combine("wwwroot", "DCS", "img");
                        string absolutePath = Path.Combine(Directory.GetCurrentDirectory(), relativePath);

                        try
                        {
                            if (!Directory.Exists(absolutePath))
                            {
                                Directory.CreateDirectory(absolutePath);
                            }

                            var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(file.FileName)}";
                            filePath = Path.Combine(relativePath, uniqueFileName);
                            string fullFilePath = Path.Combine(Directory.GetCurrentDirectory(), filePath);

                            using (var stream = new FileStream(fullFilePath, FileMode.Create))
                            {
                                await file.CopyToAsync(stream);
                            }


                            request.EmailLogo = fullFilePath; // Save full path to avoid path issues

                        }
                        catch (Exception ex)
                        {
                            return StatusCode(500, $"Error saving image: {ex.Message}");
                        }
                    }
                    var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Account/Registration", JsonConvert.SerializeObject(newrequest));
                    if (apiRes.Result != null)
                    {
                        response = JsonConvert.DeserializeObject<Response>(apiRes.Result);

                        if (response.StatusCode==ResponseStatus.SUCCESS)
                        {
                            request.Password=password;
                            request.ImagePath=file;
                            request.ProjectId=Convert.ToInt32(pId);
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

        static string GenerateProjectId(int length)
        {
            Random random = new Random();
            string otp = string.Empty;

            for (int i = 0; i < length; i++)
            {
                otp += random.Next(0, 10); // Generates a random digit between 0 and 9
            }

            return otp;
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

			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ApplicationSetting/UpdateApplicationSetting", JsonConvert.SerializeObject(setting), User.GetLoggedInUserToken());
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
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ApplicationSetting/GetApplicationSettingByIdOnload/{Email}", null, User.GetLoggedInUserToken());
                if (apiRes.Result != null)
                {
                    list = JsonConvert.DeserializeObject<ApplicationSetting>(apiRes.Result);
                }
                HttpContext.Session.SetString("ApplicationSettingList", JsonConvert.SerializeObject(list));
                return Json(list);
            }
            catch (Exception)
            {

                return Json(list);
            }
        }


		[Route("/Project_Status")]
		public async Task<IActionResult> Status(Common common)
		{
			var response = new Response()
			{
				ResponseText = "Failed To Update Status",
				StatusCode = ResponseStatus.FAILED,
			};
			var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/ProjectDetails/UpdateProjectStatus", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
			if (apiRes.Result != null)
			{
				response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
			}
			return Json(response);
		}
	}
}
