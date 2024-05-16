using System;
using System.Net;
using System.Net.Mail;
using Microsoft.Extensions.Configuration;

namespace API.SendEmail
{
	public class SendEmail
	{
		private readonly IConfiguration _configuration;

		public SendEmail(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public bool EmailSend(string SenderEmail, string Subject, string Message, bool IsBodyHtml = false)
		{
			bool status = false;
			try
			{
				string HostAddress = _configuration["EmailSettings:Host"];
				string FormEmailId = _configuration["EmailSettings:MailFrom"];
				string Password = _configuration["EmailSettings:Password"];
				string Port = _configuration["EmailSettings:Port"];
				MailMessage mailMessage = new MailMessage();
				mailMessage.From = new MailAddress(FormEmailId);
				mailMessage.Subject = Subject;
				mailMessage.Body = Message;
				mailMessage.IsBodyHtml = IsBodyHtml;
				mailMessage.To.Add(new MailAddress(SenderEmail));
				SmtpClient smtp = new SmtpClient
				{
					Host = HostAddress,
					EnableSsl = true
				};
				NetworkCredential networkCredential = new NetworkCredential
				{
					UserName = mailMessage.From.Address,
					Password = Password
				};
				smtp.UseDefaultCredentials = false;
				smtp.Credentials = networkCredential;
				smtp.DeliveryMethod = SmtpDeliveryMethod.Network;
				smtp.Port = Convert.ToInt32(Port);
				smtp.Send(mailMessage);
				status = true;
				return status;
			}
			catch (Exception e)
			{
				// Log the exception or handle it accordingly
				return status;
			}
		}
	}
}
