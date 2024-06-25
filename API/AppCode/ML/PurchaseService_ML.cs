using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;
using System.Security.Cryptography;

namespace API.AppCode.ML
{
    public class PurchaseService_ML : IPurchaseService
    {
        private readonly IDapper _dapper;
        public PurchaseService_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdatePurchaseService(PurchaseService req)
        {
            IProcedureAsync proc = new Proc_AddPurchaseService(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<PurchaseService>> GetPurchaseService(string? email)
        {
            IProcedureAsync proc = new Proc_GetPurchaseService(_dapper);
            var i = await proc.Call(email);
            return (IEnumerable<PurchaseService>)i;
        }

        public async Task<PurchaseService> GetPurchaseServiceById(int Id)
        {
            IProcedureAsync proc = new Proc_GetPurchaseServiceById(_dapper);
            var i = await proc.Call(Id);
            return (PurchaseService)i;
        }
    }
}
