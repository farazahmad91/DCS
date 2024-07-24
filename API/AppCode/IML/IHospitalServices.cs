using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IHospitalServices
    {
        public Task<Response> AddorUpdateHospitalServices(HospitalServices req);
        public Task<Response> UpdateHospitalServiceStatus(Common common);
        public Task<IEnumerable<HospitalServices>> GetHospitalServicesListOrById(Common common);
    }
}
