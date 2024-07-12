using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface ISocialMedia
    {
        public Task<Response> AddOrUpdateSocialMedia(SocialMedia socialMedia);
        public Task<IEnumerable<SocialMedia>> GetSocialMediaListOrById(Common common);
    }
}
