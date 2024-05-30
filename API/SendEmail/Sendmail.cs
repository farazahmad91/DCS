using System;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.SendEmail
{
    public class Sendmail
    {
        private readonly IConfiguration _configuration;
        public string myIP, hostName;
        private readonly IWebHostEnvironment _env;
        private readonly EmailHtmlBody _emailHtmlBody;
		private readonly EmailCredential _emailCredential;
		public Sendmail(IConfiguration configuration, IWebHostEnvironment env , EmailHtmlBody emailHtmlBody, EmailCredential emailCredential)
        {
            _configuration = configuration;
            _env = env;
            _emailHtmlBody = emailHtmlBody;
			_emailCredential=emailCredential;

		}
        public void SendEmails(string email, string subject, string body)
        {

            try
            {
				var emailSettings = _emailCredential.EmailCredentials();
				string fromAddress = (string)emailSettings["FromAddress"];
				string hostAddress = (string)emailSettings["HostAddress"];
				string userName = (string)emailSettings["UserName"];
				string pass = (string)emailSettings["Password"];
				int port = (int)emailSettings["Port"];
				using (MailMessage mail = new MailMessage())
                using (SmtpClient smtpServer = new SmtpClient(hostAddress))
                {
                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(email);
                    mail.Subject = subject;
                    mail.IsBodyHtml = true;
                    mail.Body = _emailHtmlBody.GenerateHtmlBody(body);
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
		public void SendEmailWithImage(CreateEmail cEmail)
        {
            try
            {
				var emailSettings = _emailCredential.EmailCredentials();
				string fromAddress = (string)emailSettings["FromAddress"];
				string hostAddress = (string)emailSettings["HostAddress"];
				string userName = (string)emailSettings["UserName"];
				string pass = (string)emailSettings["Password"];
				int port = (int)emailSettings["Port"];

				using (MailMessage mail = new MailMessage())
                using (SmtpClient smtpServer = new SmtpClient(hostAddress))
                {
                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(cEmail.Emails);
                    mail.Subject = cEmail.Subject;
                    mail.IsBodyHtml = true;
                    string htmlBody =_emailHtmlBody.GenerateHtmlBodyWithImage(cEmail.Message);
                    mail.Body = htmlBody;
                    string absoluteImagePath = Path.Combine(_env.ContentRootPath, cEmail.Image.TrimStart('/'));
                    if (!string.IsNullOrEmpty(absoluteImagePath) && File.Exists(absoluteImagePath))
                    {
                        LinkedResource inline = new LinkedResource(absoluteImagePath, MediaTypeNames.Image.Jpeg)
                        {
                            ContentId = "EmbeddedImage"
                        };
                        AlternateView avHtml = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);
                        avHtml.LinkedResources.Add(inline);
                        mail.AlternateViews.Add(avHtml);
                    }
                    else
                    {
                        throw new FileNotFoundException("The specified image file was not found.", absoluteImagePath);
                    }

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

		//public void SendBulkEmails(List<string> emails, string subject, string body, string relativeImagePath)
		//{
		//	foreach (string email in emails)
		//	{
		//		try
		//		{
		//			_emailCredential.SendEmailWithImage(email, subject, body, relativeImagePath);
		//			Console.WriteLine($"Email sent successfully to {email}");
		//		}
		//		catch (Exception ex)
		//		{
		//			Console.WriteLine($"Failed to send email to {email}: {ex.Message}");
		//		}
		//	}
		//}

		//public void SendBulkEmails(List<string> emails)
		//{
		//	foreach (var email in emails)
		//	{
		//		try
		//		{
		//			SendUserMail(email);
		//		}
		//		catch (Exception ex)
		//		{
		//			Console.WriteLine($"Failed to send email to {email}: {ex.Message}");
		//			// Handle the exception as needed
		//		}
		//	}
		//}

		

		public string GetIPAddress()
        {
            try
            {
                string hostName = Dns.GetHostName();


                IPHostEntry myHostEntry = Dns.GetHostEntry(hostName);
                string myIP = myHostEntry.AddressList
                                          .FirstOrDefault(ip => ip.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork)
                                          ?.ToString();

                if (myIP == null)
                {
                    throw new Exception("No IPv4 address found for the host.");
                }

                return myIP;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error in GetIPAddress: {ex.Message}");
                return null;
            }
        }


        //public void Sendmailss(string email, string subject, string body, string imagePath)
        //    {
        //        try
        //        {
        //            string fromAddress = _configuration["EmailSettings:MailFrom"];
        //            string hostAddress = _configuration["EmailSettings:Host"];
        //            string userName = _configuration["EmailSettings:userName"];
        //            string pass = _configuration["EmailSettings:Password"];
        //            int port = int.Parse(_configuration["EmailSettings:Port"]);

        //            using (MailMessage mail = new MailMessage())
        //            using (SmtpClient smtpServer = new SmtpClient(hostAddress))
        //            {
        //                mail.From = new MailAddress(fromAddress);
        //                mail.To.Add(email);
        //                mail.Subject = subject;
        //                mail.IsBodyHtml = true; // Enable HTML content

        //                // Create HTML body with an image and social media links
        //                string htmlBody = $@"
        //                <html>
        //                <body>
        //                    <p>{body}</p>
        //                    <p>Follow us on social media:</p>
        //                    <p>
        //                        <a href='https://www.facebook.com/yourprofile'>Facebook</a> | 
        //                        <a href='https://twitter.com/yourprofile'>Twitter</a> | 
        //                        <a href='https://www.instagram.com/yourprofile'>Instagram</a>
        //                    </p>
        //                    <p>
        //                        <img src='cid:EmbeddedImage' alt='Image' />
        //                    </p>
        //                </body>
        //                </html>";

        //                mail.Body = htmlBody;

        //                // Embed the image in the email
        //                if (!string.IsNullOrEmpty(imagePath))
        //                {
        //                    LinkedResource inline = new LinkedResource(imagePath, MediaTypeNames.Image.Jpeg)
        //                    {
        //                        ContentId = "EmbeddedImage"
        //                    };
        //                    AlternateView avHtml = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);
        //                    avHtml.LinkedResources.Add(inline);
        //                    mail.AlternateViews.Add(avHtml);
        //                }

        //                smtpServer.Port = port;
        //                smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
        //                smtpServer.EnableSsl = true;

        //                smtpServer.Send(mail);
        //            }
        //        }
        //        catch (Exception ex)
        //        {
        //            throw new Exception("Error sending email", ex);
        //        }
        //    }


    }
}


