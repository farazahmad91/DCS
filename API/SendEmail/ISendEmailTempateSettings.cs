namespace API.SendEmail
{
    public interface ISendEmailTempateSettings
    {
        public void FirstTimeAppointmentTemplate(string email, string pname, int? ANum, int? serviceId);
        public void AppointmentTemplate();
        public void ReAppointmentTemplate();
        public void PatientIdTemplate();
        public void InvalidLoginAttempt(string email, string name);
        public void PasswordChangeSucce(string email, string name, string newpass);
        public void SendOTPOnly(string email, string otp);
        public void EmailConfirmation(string email, string otp, string name);
        public void ForgotPasswordRequest(string email, string otp);
        public void AccountUnLockOTP(string email, string otp, string name);
    }
}
