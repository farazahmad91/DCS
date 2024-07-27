using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class ApplicationSetting
    {
        public bool IsSocialAlert { get; set; }
        public bool IsEmailVerificationRequired { get; set; }
        public bool IsEmailMarketing { get; set; }
        public bool IsShowPassword { get; set; }
        public bool IsMultipleMobileAllowed { get; set; }
		public int ProjectID { get; set; } = 266188;
		public bool IsPasswordOnly { get; set; }
        public bool IsReferral { get; set; }
        public bool IsPaymentGateway { get; set; }
        public bool IsTwoFactorAuthenticationEnabled { get; set; }
        public int MaxLoginAttempts { get; set; }
        public bool IsDarkModeEnabled { get; set; }
        public bool IsBackUpService { get; set; }
        public bool IsSmsNotificationEnabled { get; set; }
        public bool IsDoctorAvailabilityNotificationEnabled { get; set; }
        public bool IsLabResultsNotificationEnabled { get; set; }
		public bool IsMSServiceEnabled { get; set; }
        public bool IsBillingNotificationEnabled { get; set; }
        public bool IsPrescriptionRefillReminderEnabled { get; set; }
        public bool IsPatient { get; set; }
        public bool IsDoctor { get; set; }
        public bool SuperAdmin { get; set; }
        public bool IsAdmin { get; set; }
		public bool IsLabManagmentService { get; set; }
		public bool IsAppointmentReminderEnabled { get; set; }
		public bool IsLowStorageMedicineNotification { get; set; }
		public bool IsAppointmentContactService { get; set; }
		public bool IsAppointmentFormService { get; set; }
		public bool IsAppointmentStatus { get; set; }
		public bool IsWhatsappMarketing { get; set; }
	}
}
