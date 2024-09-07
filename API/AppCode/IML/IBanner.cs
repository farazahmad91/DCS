using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IBanner
    {
        public Task<Response> AddOrUpdateBanner(BannerImage banner);
        public Task<IEnumerable<BannerImage>> GetBanner(string? name);
        public Task<BannerImage> GetBannerById(int Id);
        public Task<Response> BannerModifyStatus(int Id);
    }
}
