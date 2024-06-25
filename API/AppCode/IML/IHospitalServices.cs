using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IHospitalServices
    {
        public Task<Response> AddorUpdateHospitalServices(HospitalServices req);
        public Task<HospitalServices> GetHospitalServicesById(int Id);
        public Task<IEnumerable<HospitalServices>> GetHospitalServices(string? name);
    }
}
