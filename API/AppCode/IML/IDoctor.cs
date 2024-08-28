using Entities;
using Entities.Response;

namespace API.AppCode.IService
{
    public interface IDoctor
    {
        public Task<Response> AddOrUpdateDoctor(Doctor doctor);
        public Task<IEnumerable<Doctor>> GetDoctor(string? name);
        public Task<Doctor> GetDoctorById(int DrId);
        public Task<Response> DoctorModifyStatus(int Id);
    }
}
