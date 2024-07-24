using API.AppCode.APIRequest;
using API.AppCode.IML;
using API.Claims;
using API.SendEmail;
using DCS.Models;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Microsoft.CodeAnalysis;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class EmailController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly Sendmail _sendmail;
        private readonly ILogger<EmailController> _logger;
        private readonly string _BaseUrl;
        private readonly UploadImage _uploadImage;
        public EmailController(Sendmail sendmail, IWebHostEnvironment webHostEnvironment, ILogger<EmailController> logger, IConfiguration configuration, UploadImage uploadImage)
        {
            _sendmail=sendmail;
            _webHostEnvironment=webHostEnvironment;
            _logger = logger;
            _BaseUrl = "https://localhost:7079";
            this._uploadImage = uploadImage;
        }

        [HttpGet]
        [Route("ComposeBulkEmail")]
        public IActionResult ComposeBulkEmail()
        {
            return View();
        }
        [HttpPost]
        public async Task<IActionResult> SendBulkEmails([FromForm] string emailDataArray, IFormFile imageFile)
        {
            var response = new Entities.Response.Response()
            {
                ResponseText = "An error has occurred, try again later!",
                StatusCode = ResponseStatus.FAILED
            };
            if (string.IsNullOrEmpty(emailDataArray))
            {
                return BadRequest("Email data is required.");
            }

            List<CreateEmail> createEmail;
            try
            {
                createEmail = JsonConvert.DeserializeObject<List<CreateEmail>>(emailDataArray);
            }
            catch (JsonException)
            {
                return BadRequest("Invalid email data format.");
            }

            if (createEmail == null || !createEmail.Any())
            {
                return BadRequest("Invalid email data.");
            }

            string filePath = null;
            if (imageFile != null && imageFile.Length > 0)
            {
                string relativePath = Path.Combine("wwwroot", "DCS", "img");
                string absolutePath = Path.Combine(Directory.GetCurrentDirectory(), relativePath);

                try
                {
                    if (!Directory.Exists(absolutePath))
                    {
                        Directory.CreateDirectory(absolutePath);
                    }

                    var uniqueFileName = $"{Guid.NewGuid()}_{Path.GetFileName(imageFile.FileName)}";
                    filePath = Path.Combine(relativePath, uniqueFileName);
                    string fullFilePath = Path.Combine(Directory.GetCurrentDirectory(), filePath);

                    using (var stream = new FileStream(fullFilePath, FileMode.Create))
                    {
                        await imageFile.CopyToAsync(stream);
                    }

                    foreach (var data in createEmail)
                    {
                        data.ImagePath = fullFilePath; // Save full path to avoid path issues
                    }
                }
                catch (Exception ex)
                {
                    return StatusCode(500, $"Error saving image: {ex.Message}");
                }
            }

            try
            {
                var Applist = new  ApplicationSetting();
                var listJson = HttpContext.Session.GetString("ApplicationSettingList");
                if (!string.IsNullOrEmpty(listJson))
                {
                    // Deserialize JSON string to an object. Use dynamic or a specific type if you know the structure.
                    Applist  = JsonConvert.DeserializeObject<ApplicationSetting>(listJson);
                }
                if (Applist.IsEmailMarketing!=null && Applist.IsEmailMarketing==true)
                {
                    var jsonEmails = JsonConvert.SerializeObject(createEmail);
                    var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/SendBulkEmails", jsonEmails, User.GetLoggedInUserToken());
                    return Json(apiRes);
                }
                else
                {
                    response.ResponseText = "Bulk Email Sending Service is Deactivated. Please activate the service by upgrading to a premium project plan.";
                    response.StatusCode = ResponseStatus.FAILED;
                    return Json(response);
                }
            }
            catch (Exception ex)
            {
                return StatusCode(-1, $"Internal server error: {ex.Message}");
            }
        }
        [Route("AllEmailTemplate")]
        public IActionResult AllEmailTemplate()
        {
            return View();
        }
        [Route("TemplateList")]
        public async Task<IActionResult> _TemplateList(Common common)
        {
            var list = new List<EmailTemplate>();
            int? projectId = User.GetProjectId();
            common.ProjectId= projectId;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/GetEmailTemplateListOrById", JsonConvert.SerializeObject(common), null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<EmailTemplate>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("_EditEmail")]
        public async Task<IActionResult> _EditEmail(Common common)
        {
            Common common1 = new  Common();
            int? projectId = User.GetProjectId();
            var res = new EmailTemplate();
            var  EmailTypelist = new List<MasterEmailTemplateType>();
            common1.ProjectId = projectId;
            var apiEmailTypeRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/GetMasterEmailTemplateTypeListOrById", JsonConvert.SerializeObject(common1), null);
            
            if (common.Id!=0)
            {
                common.ProjectId = projectId;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/GetEmailTemplateListOrById", JsonConvert.SerializeObject(common), null);
               
                if (apiRes.Result != null && apiEmailTypeRes.Result != null)
                {
                    var list = JsonConvert.DeserializeObject<List<EmailTemplate>>(apiRes.Result);
                     EmailTypelist = JsonConvert.DeserializeObject<List<MasterEmailTemplateType>>(apiEmailTypeRes.Result);
                    res = list.FirstOrDefault()?? new EmailTemplate();


                }
                

            }
            if (apiEmailTypeRes.Result != null)
            {
                EmailTypelist = JsonConvert.DeserializeObject<List<MasterEmailTemplateType>>(apiEmailTypeRes.Result);
            }
            var emailTemplateVM = new EmailTemplateVM
            {
                EmailTemplates = res,
                MasterEmailTemplateTypes = EmailTypelist
            };
            return PartialView(emailTemplateVM);
        }

        [Route("/EmailTemplateAddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromForm] string emailTemplate, IFormFile file)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };
            try
            {
                int? projectId = User.GetProjectId();
                var request = JsonConvert.DeserializeObject<EmailTemplate>(emailTemplate);
                request.ImagePath=file;
                request.ProjectId= projectId;
                var apiRes = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/Email/AddOrUpdateEmailTemplate", request, file, null, null);
                var res = await apiRes.Content.ReadAsStringAsync();
                if (apiRes != null && apiRes.IsSuccessStatusCode)
                {
                    response = JsonConvert.DeserializeObject<Response>(res);
                    return Json(response);
                }
            }
            catch (Exception ex)
            {
            }

            return Json(response);
        }

        [Route("AddOrUpdateMasterEmailType")]
        public IActionResult AddOrUpdateMasterEmailType(int id)
        {
            return View();
        }

        #region Email Template Type
        [Route("IndexEmailType")]
        public IActionResult IndexEmailType()
        {
            return PartialView();
        }
        [Route("_EmailTypeList")]
        public async Task<IActionResult> _EmailTypeList(Common common)
        {
            var list = new List<MasterEmailTemplateType>();
            int? projectId = User.GetProjectId();
            common.ProjectId= projectId;
            common.ProjectId = projectId;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/GetMasterEmailTemplateTypeListOrById", JsonConvert.SerializeObject(common), null);
            if (apiRes.Result != null)
            { 
                list = JsonConvert.DeserializeObject<List<MasterEmailTemplateType>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("_EditEmailTemplateType")]
        public async Task<IActionResult> _EditEmailTemplateType(Common common)
        {
            int? projectId = User.GetProjectId();
            var res = new MasterEmailTemplateType();
            if (common.Id!=0)
            {
                common.ProjectId = projectId;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/GetMasterEmailTemplateTypeListOrById", JsonConvert.SerializeObject(common), null);
                if (apiRes.Result != null)
                {
                    var list = JsonConvert.DeserializeObject<List<MasterEmailTemplateType>>(apiRes.Result);
                    res = list.FirstOrDefault()?? new MasterEmailTemplateType();

                }

            }

            return PartialView(res);
        }

        [Route("/EmailTemplateTypeAddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate(MasterEmailTemplateType type)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };
            try
            {
                int? projectId = User.GetProjectId();
                type.ProjectId= projectId;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Email/AddOrUpdateMasterEmailTemplateType", JsonConvert.SerializeObject(type), null);

                if (apiRes.Result != null)
                {
                    response = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return Json(response);
                }
            }
            catch (Exception ex)
            {
            }

            return Json(response);
        }
        #endregion
    }
}





