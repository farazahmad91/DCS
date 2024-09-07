using API.AppCode.Helper;
using API.AppCode.IService;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using API.AppCode.IML;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BannerController : Controller
    {
        private readonly IBanner _banner;
        private readonly FileUploadService _uploadService;
        public BannerController(IBanner banner, FileUploadService uploadService)
        {
            _banner = banner;
            _uploadService = uploadService;
        }

        [HttpPost(nameof(AddOrUpdateBanner))]
        public async Task<IActionResult> AddOrUpdateBanner(BannerImage banner)
        {
            var res = new Response
            {
                StatusCode = ResponseStatus.FAILED,
                ResponseText = "An Error has Occurred try after Sometime."
            };
            banner.Image = _uploadService.Image(banner.ImagePath, FileUploadType.BannerImage, FileUploadType.BannerPrefix);
            bool isImageChanged = banner.Image != null && banner.Image != "";
            bool isNewBanner = banner.Id == 0;

            if (isNewBanner || isImageChanged)
            {
                res = await _banner.AddOrUpdateBanner(banner);
            }


            return Ok(res);
        }

        [HttpPost(nameof(GetBanner)+ "/{name}")]
        public async Task<IActionResult> GetBanner(string? name)
        {
            var i= await _banner.GetBanner(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetBannerById)+ "/{Id}")]
        public async Task<IActionResult>GetBannerById(int Id)
        {
            var i=await _banner.GetBannerById(Id);  
            return Ok(i);
        }

        [HttpPost(nameof(BannerModifyStatus)+"/{Id}")]
        public async Task<IActionResult> BannerModifyStatus(int Id)
        {
            var i = await _banner.BannerModifyStatus(Id);
            return Ok(i);
        }
    }
}
