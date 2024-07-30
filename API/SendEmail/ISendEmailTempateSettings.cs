﻿namespace API.SendEmail
{
    public interface ISendEmailTempateSettings
    {
        public void FirstTimeAppointmentTemplate(string email, string pname, int? ANum, int? serviceId);
        public void AppointmentTemplate();
        public void ReAppointmentTemplate();
        public void PatientIdTemplate();
        public void InvalidLoginAttempt(string email);
        public void PasswordChangeSucce(string email);
        public void SendOTPOnly(string email, string otp);
        public void EmailConfirmation(string email, string otp);
        public void ForgotPasswordRequest(string email, string otp);
    }
}
