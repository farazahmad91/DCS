using Entities;
using Entities.Response;

namespace API.AppCode.IService
{
    public interface IPatient
    {
        public Task<Response> AddOrUpdatePatient(Patient req);
        public Task<IEnumerable<Patient>> GetPatient(Common common);
        public Task<Patient> GetPatientById(int PId);
    }
}
