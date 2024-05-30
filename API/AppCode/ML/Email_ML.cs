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

        public Response SendBulkEmails(List<CreateEmail> emails)
        {
            var response = new Response()
            {
                ResponseText = "An error has occurred, try again later!",
                StatusCode = ResponseStatus.FAILED
            };

            if (emails == null || emails.Count == 0)
            {
                response.ResponseText = "Email list cannot be null or empty";
                response.StatusCode = ResponseStatus.FAILED;
                return response;
            }

            var failedEmails = new List<string>();

            foreach (var email in emails)
            {
                try
                {
                    _sendmail.SendEmailWithImage(email); // Assuming SendEmailWithImage is an async method
                }
                catch (Exception ex)
                {
                    failedEmails.Add(email.Emails);
                }
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
