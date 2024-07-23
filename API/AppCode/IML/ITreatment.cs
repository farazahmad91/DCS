using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface ITreatment
    {
        public Task<Response> AddTreatment(Treatment req);
        public Task<Response> UpdateTreatment(Treatment req);
        public Task<Treatment> GetTreatmentByPId(int PId);
        public Task<IEnumerable<Medication>> GetMedicationListById(int PId);
        public Task<IEnumerable<Treatment>> GetTreatmentListOrById(Common common);
    }
}
