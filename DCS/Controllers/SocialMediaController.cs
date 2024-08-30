﻿using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using API.AppCode.Configuration;
using API.Claims;
using Microsoft.SqlServer.Server;
using DCS.APIRequest;
using Microsoft.AspNetCore.Authorization;

namespace DCS.Controllers
{
    [Authorize]
    public class SocialMediaController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public SocialMediaController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}

		[Route("/SocialMediaList")]
        public IActionResult SocialMediaList()
        {
            return View();
        }
        [Route("/_SocialMediaList")]
        public async Task<IActionResult> _SocialMediaList(Common common)
        {
            var list = new List<SocialMedia>();
            int? projectid = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.Role = Role;
            common.ProjectId =projectid;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/SocialMedia/GetSocialMediaListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<SocialMedia>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/EditSocialMedia")]
        public async Task<IActionResult> EditSocialMedia(Common common)
        {
            var res = new SocialMedia();
            if (common.Id != 0)
            {
                int? projectid = User.GetProjectId();
                common.ProjectId =projectid;
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/SocialMedia/GetSocialMediaListOrById", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
                if (apiRes.Result != null)
                {
                    var list = JsonConvert.DeserializeObject<List<SocialMedia>>(apiRes.Result);
                    res = list.FirstOrDefault();

                }
                return PartialView(res);
            }
            return View(res);
        }

        [Route("/SocialMediaAddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromForm] string param, [FromForm] IFormFile file)
        {
            var response = new Response
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            if (!string.IsNullOrEmpty(param))
            {
                var formData = JsonConvert.DeserializeObject<SocialMedia>(param);
                formData.ImagePath = file;
                int? projectid = User.GetProjectId();
                formData.ProjectId =projectid;
                var apiRes = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/SocialMedia/AddOrUpdateSocialMedia", formData, file, null, User.GetLoggedInUserToken());
                var res = await apiRes.Content.ReadAsStringAsync();

                if (apiRes != null && apiRes.IsSuccessStatusCode)
                {
                    response = JsonConvert.DeserializeObject<Response>(res);
                }
            }

            return Json(response);
        }

    }
}
