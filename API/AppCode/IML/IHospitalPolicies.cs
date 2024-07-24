using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IHospitalPolicies
    {
        public Task<Response> AddOrUpdateHospitalPolicies(HospitalPolicy policy);
        public  Task<IEnumerable<HospitalPolicy>> Proc_GetHospitalPolicyListOrById(Common common);
        public  Task<Response> UpdateHospitalPoliciesStatus(Common common);
    }
}
