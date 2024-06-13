using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class DCSService
    {
        public int ServiceID { get; set; }
        public string ServiceName { get; set; }
        public string Description { get; set; }
        public decimal Price { get; set; }
        public int Duration { get; set; } // Duration in days, months, or years
        public bool Availability { get; set; }
        public string Features { get; set; } 
        public string ServiceLevel { get; set; }
        public DateTime ActivationDate { get; set; }
        public DateTime ExpiryDate { get; set; }
        public bool RenewalOption { get; set; }
        public decimal Discounts { get; set; }
        public string CustomerSupportLevel { get; set; }
        public string TermsAndConditions { get; set; }
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
        public int UsageLimits { get; set; }
        public decimal FeedbackRating { get; set; }
        public int Popularity { get; set; }
        public bool EmailMarketing { get; set; }
        public bool EmailVerificationService { get; set; }
        public bool ShowYourUserPassword { get; set; }
        public bool ReferralService { get; set; }
        public bool AutoBackUpService { get; set; }
        public bool SmsNotificationService { get; set; }
        public bool EmergencyAlertService { get; set; }
        public bool UserAppointmentReminderService { get; set; }
        public bool DoctorAvailabilityNotificationService { get; set; }
        public bool MedicineStoreManagementService { get; set; }
        public bool TwoFactorAuthenticationService { get; set; }
    }

}
