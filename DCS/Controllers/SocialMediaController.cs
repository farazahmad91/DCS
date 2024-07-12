using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class SocialMediaController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public SocialMediaController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/SocialMedia/GetSocialMediaListOrById", JsonConvert.SerializeObject(common), null);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/SocialMedia/GetSocialMediaListOrById", JsonConvert.SerializeObject(common), null);
            if (apiRes.Result != null)
            {
               var list = JsonConvert.DeserializeObject<List<SocialMedia>>(apiRes.Result);
                res = list.FirstOrDefault();

            }
            return PartialView(res);
        }

        [Route("/SocialMediaAddOrUpdate")]
        public async Task<IActionResult> AddOrUpdate([FromForm] string socialMedia, IFormFile file)
        {
            var response = new Response()
            {
                ResponseText = "Failed To Add or Update Service",
                StatusCode = ResponseStatus.FAILED,
            };

            var request = JsonConvert.DeserializeObject<SocialMedia>(socialMedia);
            request.ImagePath=file;
            var apiRes = await APIRequestML.O.SendFileAndContentAsync($"{_BaseUrl}/api/SocialMedia/AddOrUpdateSocialMedia", request, file, null, null);
            var res = await apiRes.Content.ReadAsStringAsync();
            if (apiRes != null && apiRes.IsSuccessStatusCode)
            {
                response = JsonConvert.DeserializeObject<Response>(res);
                return Json(response);
            }

            return Json(response);
        }
    }
}
