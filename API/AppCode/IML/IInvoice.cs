using Entities;
using Entities.Response;

namespace API.AppCode.IService
{
    public interface IInvoice
    {
        public Task<Response> InsertInvoiceData(InvoiceViewModel invoiceView);
        public Task<IEnumerable<InvoiceItem>> GetInvoiceData();
        public Task<InvoiceViewModelDetails> GetInvoiceDataByInvoiceId(int Id);
    }
}
