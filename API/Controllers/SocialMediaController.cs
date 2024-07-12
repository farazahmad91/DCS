using API.AppCode.IML;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using API.AppCode.Helper;
using API.AppCode.IService;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SocialMediaController : ControllerBase
    {
        private readonly ISocialMedia _socialMedia;
        private readonly FileUploadService _uploadService;
        public SocialMediaController(ISocialMedia socialMedia, FileUploadService uploadService)
        {
            _socialMedia=socialMedia;
            _uploadService=uploadService;
        }
        [HttpPost(nameof(AddOrUpdateSocialMedia))]
        public async Task<IActionResult> AddOrUpdateSocialMedia(SocialMedia socialMedia)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            if (socialMedia.ImagePath != null)
            {
                socialMedia.Icons = _uploadService.Image(socialMedia.ImagePath, FileUploadType.DoctorImage, FileUploadType.DoctorPrefix);
            }

            var i = await _socialMedia.AddOrUpdateSocialMedia(socialMedia);
            return Ok(i);
        }
        [HttpPost(nameof(GetSocialMediaListOrById))]
        public async Task<IActionResult> GetSocialMediaListOrById(Common common)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _socialMedia.GetSocialMediaListOrById(common);
            return Ok(i);
        }

    }
}
