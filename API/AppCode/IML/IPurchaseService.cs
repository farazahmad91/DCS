using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IPurchaseService
    {
        public Task<Response> AddOrUpdatePurchaseService(PurchaseService req);
        public Task<IEnumerable<PurchaseService>> GetPurchaseService(string email);
        public Task<PurchaseService> GetPurchaseServiceById(int PId);
    }
}
