using Entities;
using Entities.Response;

namespace API.AppCode.IService
{
    public interface IPatientReport
    {
        public Task<Response> AddOrUpdateDoctor(PatientReport req);
        public Task<IEnumerable<PatientReport>> GetDoctor(string date);
        public Task<PatientReport> GetDoctorById(int Id);
    }
}
