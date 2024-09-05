using API.AppCode.IML;
using Entities;
using Entities.Response;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;
using System;
using static System.Net.WebRequestMethods;

namespace API.SendEmail
{
    public class SendEmailTempateSettings : ISendEmailTempateSettings
    {
        private readonly Sendmail _sendmail;
        private readonly IDapper _dapper;
        public SendEmailTempateSettings(Sendmail sendmail, IDapper dapper)
        {
            _sendmail=sendmail;
            _dapper=dapper;
        }
        public void FirstTimeAppointmentTemplate(string email,string pname,int? ANum,int?  serviceId,string Time)
        {
            try
            {
                DateTime currentDate = DateTime.Now;
                string formattedDate = currentDate.ToString("dddd, MMMM dd, yyyy 'at' hh:mm tt");
                var servicedatail = _dapper.GetById<HospitalServices>(new { Id = serviceId }, "Proc_GetHospitalServicesById");
                //var ProjectDetails = _dapper.GetById<ProjectDetails>(new { Email = email }, "Proc_GetProjectDetailByEmail");
                var template = _dapper.GetById<EmailTemplate>(new { EmailType = EmailTemplateType.FirstAppointment.ToString() }, "proc_GetEmailTemplateById");

                string content = template.Content.Replace("{PName}", pname)
                    .Replace("{ANumber}", ANum.ToString())
                    .Replace("{ServiceName}", servicedatail.ServiceName)
                    .Replace("{CompanyName}", "DCS")
                    .Replace("{date}", DateTime.Now.Year.ToString())
                    .Replace("{ADate}", Time);
                _sendmail.SendEmails(email, template.Subject, content);
            }
            catch (Exception)
            {

                throw;
            }
        }
        public void AppointmentTemplate()
        {

        }
        public void ReAppointmentTemplate()
        {

        }
        public void PatientIdTemplate()
        {

        }
        public void InvalidLoginAttempt(string email,string name)
        {
            DateTime currentDate = DateTime.Now;
            string formattedDate = currentDate.ToString("dddd, MMMM dd, yyyy 'at' hh:mm tt");
            var userip = _sendmail.GetIPAddress();
            var template = _dapper.GetById<EmailTemplate>(new { EmailType = EmailTemplateType.InvalidLoginAttempt.ToString() }, "proc_GetEmailTemplateById");
            string content = template.Content.Replace("{uname}", name)
                   .Replace("{dt}", formattedDate)
                   .Replace("{CompanyName}", "DCS")
                    .Replace("{Companyname}", "DCS")
                   .Replace("{cemail}", "Info.dcs@gmail.com")
                   .Replace("{date}", DateTime.Now.Year.ToString());
            _sendmail.SendEmails(email, template.Subject, content);

        }
        public void PasswordChangeSucce(string email , string name,string newpass)
        {
            var userip = _sendmail.GetIPAddress();
            
            var template = _dapper.GetById<EmailTemplate>(new { EmailType = EmailTemplateType.PasswordChange.ToString() }, "proc_GetEmailTemplateById");
            string content = template.Content.Replace("{UserName}", name)
                   .Replace("{password}", newpass)
                   .Replace("{CompanyName}", "DCS")
                   .Replace("{date}", DateTime.Now.Year.ToString());
            _sendmail.SendEmails(email, template.Subject, content);
        }
        public void  SendOTPOnly(string email, string otp)
        {
            var template = _dapper.GetById<EmailTemplate>(new { EmailType = EmailTemplateType.SendOTP.ToString() }, "proc_GetEmailTemplateById");
            string content = template.Content.Replace("{otp}", otp)
                .Replace("{date}", DateTime.Now.Year.ToString());
            _sendmail.SendEmails(email, template.Subject, content);
        }
        public void EmailConfirmation(string email , string otp, string name)
        {
                var template = _dapper.GetById<EmailTemplate>(new { EmailType = EmailTemplateType.EmailConfirm.ToString() }, "proc_GetEmailTemplateById");
                string content = template.Content.Replace("{oyp}", otp)
                .Replace("{uname}", name)
                .Replace("{date}", DateTime.Now.Year.ToString());
                _sendmail.SendEmails(email, template.Subject, content);
          
        }
        public void ForgotPasswordRequest(string email, string otp)
        {
            // Email Confirmation

            var template = _dapper.GetById<EmailTemplate>(new { EmailType = EmailTemplateType.EmailConfirm.ToString() }, "proc_GetEmailTemplateById");
            string content = template.Content.Replace("{otp}", otp)
                .Replace("{date}", DateTime.Now.Year.ToString());
            _sendmail.SendEmails(email, template.Subject, content);

        }
        public void AccountUnLockOTP(string email, string otp, string name)
        {
            var template = _dapper.GetById<EmailTemplate>(new { EmailType = EmailTemplateType.EmailConfirm.ToString() }, "proc_GetEmailTemplateById");
            string content = template.Content.Replace("{oyp}", otp)
            .Replace("{uname}", name)
            .Replace("{date}", DateTime.Now.Year.ToString());
            _sendmail.SendEmails(email, template.Subject, content);

        }
    }
}
