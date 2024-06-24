using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IDCSServices
    {
        public Task<Response> AddorUpdateDCSService(DCSService req);
        public Task<DCSService> GetDCSServiceById(int Id);
        public Task<IEnumerable<DCSService>> GetDCSService(string? name);
    }
}
