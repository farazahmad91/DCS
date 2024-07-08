using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class PlanServices
    {
        public int? ServiceID { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
        public decimal? Price { get; set; }
        public decimal? LastPrice { get; set; }
        public int? Duration { get; set; } // Duration in days, months, or years
        public string? ServiceLevel { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public bool? RenewalOption { get; set; }
        public decimal? Discounts { get; set; }
        public string? CustomerSupportLevel { get; set; }
        public string? TermsAndConditions { get; set; }
        public DateTime? CreatedAt { get; set; }
        public DateTime? UpdatedAt { get; set; }
		public bool? EmailMarketing { get; set; }
        public bool? EmailVerificationService { get; set; } = true;
		public bool? ShowYourUserPassword { get; set; }
		public bool? ReferralService { get; set; }
		public bool? BackUpService { get; set; }
		public bool? SmsNotificationService { get; set; }
		public bool? EmergencyAlertService { get; set; }
		public bool? UserAppointmentReminderService { get; set; }
		public bool? DoctorAvailabilityNotificationService { get; set; }
		public bool? MedicineStoreManagementService { get; set; }
		public bool? TwoFactorAuthenticationService { get; set; }
		public bool? IsMultipleMobileAllowed { get; set; }
		public bool? IsDarkModeEnabled { get; set; }
		public bool? IsBillingNotificationEnabled { get; set; }
		public bool? IsPrescriptionRefillReminderEnabled { get; set; }
		public bool? MaxLoginAttempts { get; set; }
		public bool? IsShowPassword { get; set; }
		public bool? IsSocialAlert { get; set; }
		public bool? IsPasswordOnly { get; set; }
		public bool? IsPatient { get; set; }
		public bool? IsDoctor { get; set; }
		public bool? SuperAdmin { get; set; }
		public bool? IsAdmin { get; set; }
        public bool? IsLabManagmentService { get; set; }
        public bool? IsLowStorageMedicineNotification { get; set; }
        public bool? IsAppointmentContactService { get; set; }
        public bool? IsAppointmentFormService { get; set; }
        public bool? IsAppointmentStatus { get; set; }
        public bool? IsWhatsappMarketing { get; set; }
    }

}
