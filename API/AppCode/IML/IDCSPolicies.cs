using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IDCSPolicies
    {
        public Task<Response> AddorUpdateDCSPolicies(DCSPolicies req);
        public  Task<IEnumerable<DCSPolicies>> GetDCSPoliciesListOrById(Common common);
        public  Task<Response> UpdateDCSPoliciesStatus(Common common);
    }
}
