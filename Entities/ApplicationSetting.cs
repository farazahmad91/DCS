using System.ComponentModel.DataAnnotations;

namespace Entities
{
    public class ApplicationSetting
    {
        public bool IsSocialAlert { get; set; }
        public bool IsEmailVerificationRequired { get; set; }
        public bool IsBulkEmail { get; set; }
        public bool IsShowPassword { get; set; }
        public bool IsMultipleMobileAllowed { get; set; }
        public int ProjectID { get; set; } = 636190;
        public bool IsPasswordOnly { get; set; }
        public bool IsDefaultOTPDisabled { get; set; }
        public bool IsShowPartner { get; set; }
        public bool IsReferral { get; set; }
        public bool IsPaymentGateway { get; set; }
        public bool IsMultipleVendorAllowed { get; set; }
        public bool IsTwoFactorAuthenticationEnabled { get; set; }
        public bool IsDataEncryptionEnabled { get; set; }
        public int MaxLoginAttempts { get; set; }
        public int PasswordExpiryDays { get; set; }
        public bool IsUserActivityLoggingEnabled { get; set; }
        public bool IsDarkModeEnabled { get; set; }
        public bool IsAutoUpdateEnabled { get; set; }
        public bool IsSmsNotificationEnabled { get; set; }
        public int SessionTimeoutMinutes { get; set; }
        public bool IsEmergencyAlertEnabled { get; set; }
        public bool IsPatientRecordEncryptionEnabled { get; set; }
        public bool IsAppointmentReminderEnabled { get; set; }
        public bool IsDoctorAvailabilityNotificationEnabled { get; set; }
        public int MaxPatientRecordsView { get; set; }
        public bool IsLabResultsNotificationEnabled { get; set; }
        public bool IsInsuranceVerificationRequired { get; set; }
        public bool IsTelemedicineEnabled { get; set; }
        public bool IsBillingNotificationEnabled { get; set; }
        public bool IsPrescriptionRefillReminderEnabled { get; set; }
        public bool IsPatient { get; set; }
        public bool IsDoctor { get; set; }
        public bool SuperAdmin { get; set; }
        public bool IsAdmin { get; set; }
    }
}
