using System;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace API.SendEmail
{
	public class Sendmail
	{
		private readonly IConfiguration _configuration;

		public Sendmail(IConfiguration configuration)
		{
			_configuration = configuration;
		}
        public void SendEmails(string email, string subject, string body)
        {

            try
            {
                string fromAddress = _configuration["EmailSettings:MailFrom"];
                string hostAddress = _configuration["EmailSettings:Host"];
                string userName = _configuration["EmailSettings:userName"];
                string pass = _configuration["EmailSettings:Password"];
                int port = int.Parse(_configuration["EmailSettings:Port"]);
                using (MailMessage mail = new MailMessage())
                using (SmtpClient smtpServer = new SmtpClient(hostAddress))
                {
                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(email);
                    mail.Subject = subject;
                    mail.Body = body;
                    smtpServer.Port = port;
                    smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
                    smtpServer.EnableSsl = true;

                    smtpServer.Send(mail);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Error sending email", ex);
            }
        }

    }
}
