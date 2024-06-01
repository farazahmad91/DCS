using API.SendEmail;
using Entities.Response;
using Entities;
using API.AppCode.IML;

namespace API.AppCode.ML
{
    public class Email_ML : IEmail
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly Sendmail _sendmail;
        public Email_ML(Sendmail sendmail, IWebHostEnvironment webHostEnvironment)
        {
            _sendmail = sendmail;
            _webHostEnvironment = webHostEnvironment;
        }

        public Response SendBulkEmails(CreateEmail emails)
        {
            var response = new Response()
            {
                ResponseText = "An error has occurred, try again later!",
                StatusCode = ResponseStatus.FAILED
            };
            var failedEmails = new List<string>();
                try
                {
                    _sendmail.Sendmailss(emails); // Assuming SendEmailWithImage is an async method
                }
                catch (Exception ex)
                {
                    failedEmails.Add(emails.Emails);

                }
            if (failedEmails.Count > 0)
            {
                response.ResponseText = $"Failed to send emails to the following recipients: {string.Join(", ", failedEmails)}";
                response.StatusCode = ResponseStatus.FAILED;
            }
            else
            {
                response.ResponseText = "Bulk emails sent successfully";
                response.StatusCode = ResponseStatus.SUCCESS;
            }

            return response;
        }
    }
}
