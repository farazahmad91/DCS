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
            IProcedureAsync proc = new Proc_AddHospitalPolicies(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<HospitalPolicy>> Proc_GetHospitalPolicyListOrById(Common common)
        {
            IProcedureAsync proc = new Proc_GetHospitalPolicyListOrById(_dapper);
            var i = await proc.Call(common);
            return (IEnumerable<HospitalPolicy>)i;
        }

        public async Task<Response> UpdateHospitalPoliciesStatus(Common common)
        {
            IProcedureAsync proc = new Proc_updateHospitalPoliciesStatus(_dapper);
            var i = await proc.Call(common);
            return (Response)i;
        }
    }
}
