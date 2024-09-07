using API.AppCode.APIRequest;
using API.Claims;
using DCS.APIRequest;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class BannerController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        private readonly IBaseUrl _baseurl;
        public BannerController(IConfiguration configuration, IBaseUrl baseUrl)
        {
            this._configuration = configuration;
            this._baseurl = baseUrl;
            _BaseUrl = baseUrl.GetBaseUrl();
        }

        [Route("/BannerList")]
        public IActionResult GetBanners()
        {
            return View();
        }

        [Route("/B-List")]
        public async Task<IActionResult>_GetBannerList(string? name="All")
        {
            var list = new List<BannerImage>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Banner/GetBanner/{name}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<BannerImage>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/B-Edit")]
        public async Task<IActionResult>_BrEdit(int Id)
        {
            var list = new BannerImage();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Banner/GetBannerById/{Id}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<BannerImage>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/B-AddOrUpdate")]
        public async Task<IActionResult> BannerAddOrUpdate([FromForm] string bannerData, IFormFile file)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add Or Update Banner",
                StatusCode = ResponseStatus.FAILED,
            };

            try
            {
                var request = JsonConvert.DeserializeObject<BannerImage>(bannerData);
                if (request == null)
                {
                    response.ResponseText = "Invalid doctor data";
                    return Json(response);
                }
                int? projectId = User.GetProjectId();
                request.ProjectId = projectId;
                if (file != null)
                {
                    request.ImagePath = file;
                }

                var apiRes = await APIRequestML.O.SendFileAndContentAsync(
                    $"{_BaseUrl}/api/Banner/AddOrUpdateBanner",
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
                Console.WriteLine(ex.Message);
                response.ResponseText = "An error occurred while processing the request";
                response.StatusCode = ResponseStatus.FAILED;
                return Json(response);
            }
        }

        [Route("/B-detail")]
        public async Task<IActionResult> _detail(int Id)
        {
            var list = new BannerImage();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Banner/GetBannerById/{Id}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<BannerImage>(apiRes.Result);
            }
            return PartialView(list);
        }

        [HttpPost]
        [Route("BannerModifyStatus")]
        public async Task<IActionResult> BannerModifyStatus(int Id)
        {
            try
            {
                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Banner/BannerModifyStatus/{Id}", null, User.GetLoggedInUserToken());
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
