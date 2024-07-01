using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IDCSServices
    {
        public Task<Response> AddorUpdateDCSService(PlanServices req);
        public Task<PlanServices> GetDCSServiceById(int Id);
        public Task<IEnumerable<PlanServices>> GetDCSService(string? name);
    }
}
