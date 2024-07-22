using System.Collections.Generic;

namespace Entities
{
	public class InvoiceItem
	{
		public string Service { get; set; }
		public string Product { get; set; }
		public float Quantity { get; set; }
		public string Unit { get; set; }
        public float Price { get; set; }
		public float VAT { get; set; }
		public float Discount { get; set; }
		public float SingleDiscountAmount { get; set; }
        public float SubAmount { get; set; }
        public float NetAmount { get; set; }
		public float VATAmount { get; set; }
		public float TotalAmount { get; set; }
	}

	public class InvoiceViewModel
	{
        public int InvoiceID { get; set; }
        public string? CustomerName { get; set; }
		public string? Email { get; set; }
		public string? Phone { get; set; }
		public string? Address { get; set; }
		public float Subtotal { get; set; }
		public float DiscountAmount { get; set; }
		public float TotalVAT { get; set; }
		public float TotalAmount { get; set; }
        public DateTime? EntryOn { get; set; }
        public List<InvoiceItem>? Items { get; set; }
        public List<TransactionDetails>? Transactions { get; set; }
    }

    public class TransactionDetails
    {
        public string? Id { get; set; }
        public string? Mode { get; set; }
        public bool IsPaid { get; set; }
        public string? DueDate { get; set; }
    }
    public class InvoiceViewModelDetails
    {
        public IEnumerable<InvoiceViewModel> InvoiceViewModels { get; set; }
        public IEnumerable<InvoiceItem> InvoiceItems { get; set; }
        public IEnumerable<TransactionDetails> TransactionDetail { get; set; }
    }
    public class SendEmailInvoice
    {
        public string? Invoice { get; set; }
        public string? Email { get; set; }
        public string? Subject { get; set; }
    }
}
