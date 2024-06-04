namespace Entities
{


	public class Invoice
	{
		public int InvoiceID { get; set; }
		public string CustomerName { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Address { get; set; }
		public float Subtotal { get; set; }
		public float DiscountAmount { get; set; }
		public float TotalVAT { get; set; }
		public float TotalAmount { get; set; }
		public DateTime? InvoiceDate { get; set; }
		public int? IsPaid { get; set; }
		public DateTime? EntryOn { get; set; }
	}

	public class InvoiceItem
	{
		public string Service { get; set; }
		public string Product { get; set; }
		public float Quantity { get; set; }
		public string Unit { get; set; }
		public float Price { get; set; }
		public float VAT { get; set; }
		public float Discount { get; set; }
		public float NetAmount { get; set; }
		public float VATAmount { get; set; }
		public float TotalAmount { get; set; }
	}

	public class InvoiceViewModel
	{
		public string CustomerName { get; set; }
		public string Email { get; set; }
		public string Phone { get; set; }
		public string Address { get; set; }
		public float Subtotal { get; set; }
		public float DiscountAmount { get; set; }
		public float TotalVAT { get; set; }
		public float TotalAmount { get; set; }
		public List<InvoiceItem> Items { get; set; }
	}
}
