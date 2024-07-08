namespace Entities
{
    public class PurchaseService
    {
        public int? PurchaseID { get; set; }
        public string? UserEmail { get; set; }
        public int? ProjectId { get; set; }
        public int? ServiceID { get; set; }
        public DateTime? PurchaseDate { get; set; }
        public string? ExpiryDate { get; set; }
        public int? ExpiryYear { get; set; }
        public decimal? Price { get; set; }
        public decimal? Discount { get; set; }
        public decimal? FinalPrice { get; set; }
        public bool RenewalOption { get; set; }

    }

}
