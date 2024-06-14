using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class NotificationKeywordsReplacement 
    {
        public int UserId { get; set; } = 0;
        public string? AuctionOpenAt { get; set; }
        public string? AuctionEndAt { get; set; }
        public string? AccountNumber { get; set; }
        public decimal? Amount { get; set; }
        public decimal? BalanceAmount { get; set; }
        public decimal? BidAmount { get; set; }
        public string? BidderName { get; set; }
        public string? BidSubmissionDate { get; set; }
        public string? CompanyAddress { get; set; }
        public string? CompanyDomain { get; set; }
        public string? CompanyEmail { get; set; }
        public string? CompanyMobile { get; set; }
        public string? CompanyName { get; set; }
        public string? CountryCode { get; set; }
        public string? FromMobileNo { get; set; }
        public string? FromUserName { get; set; }
        public string? IFSC { get; set; }
        public string? LoginID { get; set; }
        public string? FCMID { get; set; }
        public string? Message { get; set; }
        public string? MessageType { get; set; }
        public string? FileUrl { get; set; }
        public string? Mobile { get; set; }
        public string? OTP { get; set; }
        public string? Password { get; set; }
        public string? PinPassword { get; set; }
        public string? ProductName { get; set; }
        public string? RecipientName { get; set; }
        public string? SenderName { get; set; }
        public string? ToMobileNo { get; set; }
        public string? ToUserName { get; set; }
        public string? TransactionID { get; set; }
        public string? TransactionDate { get; set; }
        public string? TransMode { get; set; }
        public string? UserEmail { get; set; }
        public string? UserName { get; set; }
        public string? UTRorRRN { get; set; }
        public List<string>? AttachmentPaths { get; set; }
    }
}
