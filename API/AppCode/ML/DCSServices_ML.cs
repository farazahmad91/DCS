using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class DCSServices_ML: IDCSServices
    {
        private readonly IDapper _dapper;
        public DCSServices_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddorUpdateDCSService(PlanServices req)
        {
            IProcedureAsync proc = new Proc_AddPremiumServices(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }
        public async Task<IEnumerable<PlanServices>> GetDCSService(string? name)
        {
            IProcedureAsync proc = new Proc_GetPremiumServices(_dapper);
            var i = await proc.Call(name);
            return (IEnumerable<PlanServices>)i;
        }
        public async Task<PlanServices> GetDCSServiceById(int Id)
        {
            IProcedureAsync proc = new Proc_GetPremiumServicesById(_dapper);
            var i = await proc.Call(Id);
            return (PlanServices)i;
        }
    }
}
