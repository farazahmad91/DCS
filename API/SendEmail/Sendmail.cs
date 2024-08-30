﻿using System.Net;
using System.Net.Http;
using System.Net.Mail;
using System.Net.Mime;
using API.AppCode.IML;
using API.AppCode.ML;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

namespace API.SendEmail
{
    public class Sendmail
    {
        private readonly IConfiguration _configuration;
        public string myIP, hostName;
        private readonly IWebHostEnvironment _env;
        private readonly EmailHtmlBody _emailHtmlBody;
        private readonly EmailCredential _emailCredential;
        private readonly IDapper _dapper;
        public Sendmail(IConfiguration configuration, IWebHostEnvironment env, EmailHtmlBody emailHtmlBody, EmailCredential emailCredential, IDapper dapper)
        {
            _configuration = configuration;
            _env = env;
            _emailHtmlBody = emailHtmlBody;
            _emailCredential = emailCredential;
            _dapper = dapper;
        }
        public void SendEmails(string email, string subject, string body)
        {

            try
            {
                string fromAddress = "farazshaikh8960@gmail.com";
                string hostAddress = "smtp.gmail.com";
                string userName = "cozmotest91@gmail.com";
                string pass = "cuncfbllgbiwwyax";
                int port = int.Parse("587");
                using (MailMessage mail = new MailMessage())
                using (SmtpClient smtpServer = new SmtpClient(hostAddress))
                {
                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(email);
                    mail.Subject = subject;
                    mail.IsBodyHtml = true;
                    mail.Body = body;
                    smtpServer.Port = port;
                    smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
                    smtpServer.EnableSsl = true;

                    smtpServer.Send(mail);
                }
            }
            catch (Exception ex)
            {
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "SendEmails",
                    Error = ex.Message,
                    ProcName = "",
                };
                new ErrorLog_ML(_dapper).Error(error);

            }
        }
        public void SendEmailWithImage(string Email, string Subject, string content, string Image)
        {
            try
            {
                string fromAddress = "farazshaikh8960@gmail.com";
                string hostAddress = "smtp.gmail.com";
                string userName = "cozmotest91@gmail.com";
                string pass = "cuncfbllgbiwwyax";
                int port = int.Parse("587");
                using (MailMessage mail = new MailMessage())
                using (SmtpClient smtpServer = new SmtpClient(hostAddress))
                {
                    mail.From = new MailAddress(fromAddress);
                    mail.To.Add(Email);
                    mail.Subject = Subject;
                    mail.IsBodyHtml = true;
                    string htmlBody = content;
                    mail.Body = htmlBody;

                    string absoluteImagePath = Path.Combine(_env.ContentRootPath, Image.TrimStart('/'));


                    LinkedResource inline = new LinkedResource(absoluteImagePath, MediaTypeNames.Image.Jpeg)
                    {
                        ContentId = "EmbeddedImage"
                    };
                    AlternateView avHtml = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);
                    avHtml.LinkedResources.Add(inline);
                    mail.AlternateViews.Add(avHtml);

                    smtpServer.Port = port;
                    smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
                    smtpServer.EnableSsl = true;

                    smtpServer.Send(mail);
                }
            }
            catch (Exception ex)
            {
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "RegisterAsync",
                    Error = ex.Message,
                    ProcName = "",
                };
                new ErrorLog_ML(_dapper).Error(error);
            }
        }
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
        public void Sendmailss(CreateEmail cEmail)
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
                    mail.To.Add(cEmail.Emails);
                    mail.Subject = cEmail.Subject;
                    mail.IsBodyHtml = true; // Enable HTML content
                    string htmlBody = cEmail.Message; //_emailHtmlBody.GenerateHtmlBodyWithImage(cEmail.Message);

                    mail.Body = htmlBody;

                    if (!string.IsNullOrEmpty(cEmail.ImagePath) && File.Exists(cEmail.ImagePath))
                    {
                        LinkedResource inline = new LinkedResource(cEmail.ImagePath, MediaTypeNames.Image.Jpeg)
                        {
                            ContentId = "EmbeddedImage"
                        };
                        AlternateView avHtml = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);
                        avHtml.LinkedResources.Add(inline);
                        mail.AlternateViews.Add(avHtml);
                    }
                    else
                    {
                        throw new FileNotFoundException("Image file not found.", cEmail.ImagePath);
                    }

                    smtpServer.Port = port;
                    smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
                    smtpServer.EnableSsl = true;

                    smtpServer.Send(mail);
                }
            }
            catch (FileNotFoundException fnfEx)
            {
                throw new Exception($"File not found: {fnfEx.Message}", fnfEx);
            }
            catch (Exception ex)
            {
                throw new Exception("Error sending email", ex);
            }
        }

        public Response ComposeEmail(Inbox inbox)
        {
            Response response = new Response()
            {
                ResponseText = "",
                StatusCode = ResponseStatus.FAILED,
            };
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
                    mail.To.Add(inbox.ToMail);
                    mail.Subject = inbox.Subject;
                    mail.IsBodyHtml = true; // Enable HTML content
                    string htmlBody = inbox.Message; //_emailHtmlBody.GenerateHtmlBodyWithImage(cEmail.Message);
                    mail.Body = htmlBody;
                    inbox.Message.Replace("<input type=\"text\" data-formula=\"e=mc^2\" data-link=\"https://quilljs.com\" data-video=\"Embed URL\">", "");

                    if (!string.IsNullOrEmpty(inbox.Image) && File.Exists(inbox.Image))
                    {
                        LinkedResource inline = new LinkedResource(inbox.Image, MediaTypeNames.Image.Jpeg)
                        {
                            ContentId = "EmbeddedImage"
                        };
                        AlternateView avHtml = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);
                        avHtml.LinkedResources.Add(inline);
                        mail.AlternateViews.Add(avHtml);
                    }
                    else
                    {
                        throw new FileNotFoundException("Image file not found.", inbox.Image);
                    }

                    smtpServer.Port = port;
                    smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
                    smtpServer.EnableSsl = true;

                    smtpServer.Send(mail);
                    response.ResponseText = "SUCCESS";
                    response.StatusCode = ResponseStatus.SUCCESS;
                }
            }
            catch (FileNotFoundException fnfEx)
            {
                throw new Exception($"File not found: {fnfEx.Message}", fnfEx);
            }
            catch (Exception ex)
            {
                throw new Exception("Error sending email", ex);
            }
            return response;
        }

        public void Sendmailsss(CreateEmail cEmail)
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
                    mail.To.Add(cEmail.Emails);
                    mail.Subject = cEmail.Subject;
                    mail.IsBodyHtml = true; // Enable HTML content
                    string htmlBody = "";
                    mail.Body = htmlBody;

                    if (cEmail.WithImage == 1)
                    {
                        if (!string.IsNullOrEmpty(cEmail.ImagePath) && File.Exists(cEmail.ImagePath))
                        {
                            LinkedResource inline = new LinkedResource(cEmail.ImagePath, MediaTypeNames.Image.Jpeg)
                            {
                                ContentId = "EmbeddedImage"
                            };
                            AlternateView avHtml = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);
                            avHtml.LinkedResources.Add(inline);
                            mail.AlternateViews.Add(avHtml);
                        }
                        else
                        {
                            throw new FileNotFoundException("Image file not found.", cEmail.ImagePath);
                        }
                    }


                    smtpServer.Port = port;
                    smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
                    smtpServer.EnableSsl = true;
                    try
                    {
                        smtpServer.Send(mail);
                    }
                    catch (Exception ex)
                    {
                        var error = new ErrorLog
                        {
                            ClassName = GetType().Name,
                            FuncName = "Sendmailsss",
                            Error = ex.Message,
                            ProcName = "",
                        };
                    }

                }
            }
            catch (FileNotFoundException fnfEx)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "Sendmailsss",
                    Error = fnfEx.Message,
                    ProcName = "",
                };
                throw new Exception($"File not found: {fnfEx.Message}", fnfEx);
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "Sendmailsss",
                    Error = ex.Message,
                    ProcName = "",
                };
                throw new Exception("Error sending email", ex);
            }
        }


        public void SendEmail(CreateEmail cEmail)
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
                    mail.To.Add(cEmail.Emails);
                    mail.Subject = cEmail.Subject;
                    mail.IsBodyHtml = true; // Enable HTML content
                    string htmlBody = "";
                    mail.Body = htmlBody;

                    if (cEmail.WithImage == 1)
                    {
                        if (!string.IsNullOrEmpty(cEmail.ImagePath) && File.Exists(cEmail.ImagePath))
                        {
                            LinkedResource inline = new LinkedResource(cEmail.ImagePath, MediaTypeNames.Image.Jpeg)
                            {
                                ContentId = "EmbeddedImage"
                            };
                            AlternateView avHtml = AlternateView.CreateAlternateViewFromString(htmlBody, null, MediaTypeNames.Text.Html);
                            avHtml.LinkedResources.Add(inline);
                            mail.AlternateViews.Add(avHtml);
                        }
                        else
                        {
                            throw new FileNotFoundException("Image file not found.", cEmail.ImagePath);
                        }
                    }

                    smtpServer.Port = port;
                    smtpServer.Credentials = new System.Net.NetworkCredential(userName, pass);
                    smtpServer.EnableSsl = true;
                    try
                    {
                        smtpServer.Send(mail);
                        var LogEmail = new EmailLog
                        {
                            ToEmail = cEmail.Emails,
                            Subject = cEmail.Subject,
                            Body = htmlBody,
                            ErrorMessage = "",
                            SentStatus = true
                        };
                        var __ = new EmailLogs(_dapper).LogEmail(LogEmail);
                    }
                    catch (Exception ex)
                    {
                        var error = new ErrorLog
                        {
                            ClassName = GetType().Name,
                            FuncName = "Sendmailssss",
                            Error = ex.Message,
                            ProcName = "",
                        };
                        new ErrorLog_ML(_dapper).Error(error);

                        var LogEmail = new EmailLog
                        {
                            ToEmail = cEmail.Emails,
                            Subject = cEmail.Subject,
                            Body = htmlBody,
                            ErrorMessage = ex.Message,
                            SentStatus = false
                        };
                        var __ = new EmailLogs(_dapper).LogEmail(LogEmail);
                        throw new Exception("Error sending email", ex);
                    }
                }
            }
            catch (FileNotFoundException fnfEx)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "Sendmailssss",
                    Error = fnfEx.Message,
                    ProcName = "",
                };
                new ErrorLog_ML(_dapper).Error(error);



                throw new Exception($"File not found: {fnfEx.Message}", fnfEx);
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "Sendmailssss",
                    Error = ex.Message,
                    ProcName = "",
                };
                new ErrorLog_ML(_dapper).Error(error);

                throw new Exception("Error sending email", ex);
            }
        }



    }
}


