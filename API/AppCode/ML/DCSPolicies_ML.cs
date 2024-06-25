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

        public async Task<IEnumerable<DCSPolicies>> GetDCSPolicies(string? name)
        {
            IProcedureAsync proc = new Proc_GetDCSPolicies(_dapper);
            var i = await proc.Call(name);
            return (IEnumerable<DCSPolicies>)i;
        }

        public async Task<DCSPolicies> GetDCSPoliciesById(int Id)
        {
            IProcedureAsync proc = new Proc_GetDCSPoliciesById(_dapper);
            var i = await proc.Call(Id);
            return (DCSPolicies)i;
        }
    }
}
