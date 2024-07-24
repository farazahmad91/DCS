using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class DCSPolicies_ML : IDCSPolicies
    {
        private readonly IDapper _dapper;
        public DCSPolicies_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddorUpdateDCSPolicies(DCSPolicies req)
        {
            IProcedureAsync proc = new Proc_AddDCSPolicies(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<DCSPolicies>> GetDCSPoliciesListOrById(Common common)
        {
            IProcedureAsync proc = new Proc_GetDCSPoliciesListOrById(_dapper);
            var i = await proc.Call(common);
            return (IEnumerable<DCSPolicies>)i;
        }

        public async Task<Response> UpdateDCSPoliciesStatus(Common common)
        {
            IProcedureAsync proc = new Proc_UpdateDCSPoliciesStatus(_dapper);
            var i = await proc.Call(common);
            return (Response)i;
        }
    }
}
