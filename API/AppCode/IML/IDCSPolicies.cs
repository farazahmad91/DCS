using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IDCSPolicies
    {
        public Task<Response> AddorUpdateDCSPolicies(DCSPolicies req);
        public Task<DCSPolicies> GetDCSPoliciesById(int Id);
        public Task<IEnumerable<DCSPolicies>> GetDCSPolicies(string name);
    }
}
