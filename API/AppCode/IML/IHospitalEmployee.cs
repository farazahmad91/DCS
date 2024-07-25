using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IHospitalEmployee
    {
        public Task<Response> AddOrUpdateHospitalEmployee(HospitalEmployee employee);
        public Task<IEnumerable<HospitalEmployee>> GetHospitalEmployeeListOrById(Common common);
        public Task<Response> UpdateHospitalEmployeeStatus(Common common);
    }
}
