using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IHospitalPolicies
    {
        public Task<Response> AddOrUpdateHospitalPolicies(HospitalPolicy policy);
        public Task<IEnumerable<HospitalPolicy>> GetHospitalPolicies(string name);
        public Task<HospitalPolicy> GetHospitalPoliciesById(int HosId);
        public Task<HospitalPolicy> GetHospitalPoliciesByTypeId(int TypeId);
    }
}
