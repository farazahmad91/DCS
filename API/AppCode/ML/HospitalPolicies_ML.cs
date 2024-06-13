using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class HospitalPolicies_ML : IHospitalPolicies
    {
        private readonly IDapper _dapper;
        public HospitalPolicies_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdateHospitalPolicies(HospitalPolicy req)
        {
            IProcedureAsync proc = new Proc_Appointment(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<HospitalPolicy>> GetHospitalPolicies(string name)
        {
            IProcedureAsync proc = new Proc_GetAppointment(_dapper);
            var i = await proc.Call(name);
            return (IEnumerable<HospitalPolicy>)i;
        }

        public async Task<HospitalPolicy> GetHospitalPoliciesById(int HosId)
        {
            IProcedureAsync proc = new Proc_Appointment(_dapper);
            var i = await proc.Call(HosId);
            return (HospitalPolicy)i;
        }

        public async Task<HospitalPolicy> GetHospitalPoliciesByTypeId(int TypeId)
        {
            IProcedureAsync proc = new Proc_Appointment(_dapper);
            var i = await proc.Call(TypeId);
            return (HospitalPolicy)i;
        }
    }
}
