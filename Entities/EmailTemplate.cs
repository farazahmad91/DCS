using Microsoft.AspNetCore.Http;

namespace Entities
{
	public class EmailTemplate
	{
		public int? TemplateID { get; set; }
        public int? ProjectId { get; set; }
        public string? EmailType { get; set; }
		public string? Subject { get; set; }
        public string? TemplateImage { get; set; }
        public string? Content { get; set; }
        public IFormFile? ImagePath { get; set; } = null;
        public string? CreatedAt { get; set; }
        public string? UpdateOn { get; set; }
        public int? Status { get; set; }
    }
	public class MasterEmailTemplateType
	{
        public int? EmailTypeId { get; set; }
        public int? ProjectId { get; set; }
        public string? EmailType { get; set; }
        public bool? Status { get; set; }
        public bool? IsDefault { get; set; }
    }

    public class EmailTemplateVM
    {
        public EmailTemplate EmailTemplates { get; set; }
        public IEnumerable<MasterEmailTemplateType> MasterEmailTemplateTypes { get; set; }
    }
    public enum EmailTemplateType
    {
        SendOTP =1,
        NewRegister=2,
        InvalidLoginAttempt=3,
        ChangePasswordRequest=4,
        ForgotPasswordRequest=5,
        PromotionEmail =6,
        AccountDeActivation=7, // Removed the hyphen
        AccountActivation=8,
        NewsletterSubscription=9,
        UserFeedback =10,
        AnniversaryWishes = 11,
        PasswordChange = 12,
        EmailConfirm = 13,
        FirstAppointment = 14,
        Appointment = 15,
        ReAppointment = 16,
    }

    public class EmailType
    {
        public string? Email { get; set; }
        public string? Name { get; set; } = null;
        public int? EType { get; set; }
    }
 
}
