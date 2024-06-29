using API.SendEmail;
using Entities.Response;
using Entities;
using API.AppCode.IML;
using API.AppCode.DL;

namespace API.AppCode.ML
{
    public class Email_ML : IEmail
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly Sendmail _sendmail;
        private readonly IDapper _dapper;
        ApplicationSetting setting = new ApplicationSetting();
        public Email_ML(Sendmail sendmail, IWebHostEnvironment webHostEnvironment, IDapper dapper)
        {
            _sendmail = sendmail;
            _webHostEnvironment = webHostEnvironment;
            _dapper=dapper;
            
        }

        public async Task<Response> AddOrUpdateEmailTemplate(EmailTemplate template)
        {
            IProcedureAsync procedure = new Proc_AddOrUpdateEmailTemplate(_dapper);
            var i = await procedure.Call(template);
            return (Response)i;
        }
        
        public async Task<IEnumerable<EmailTemplate>> GetEmailTemplate()
        {
            IProcedureAsync procedure = new Proc_GetEmailTemplate(_dapper);
            var i = await procedure.Call();
            return (IEnumerable<EmailTemplate>)i;
        }

        public async Task<EmailTemplate> GetEmailTemplateById(int id)
        {
            IProcedureAsync procedure = new Proc_GetEmailTemplateById(_dapper);
            var i = await procedure.Call(id);
            return (EmailTemplate)i;
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
                if (setting.IsEmailMarketing)
                {
                    _sendmail.Sendmailss(emails);
                }
                else
                {
                    response.ResponseText = "Bulk Email Sending Service is Deactivated. Please activate the service by upgrading to a premium project plan.";
                    response.StatusCode = ResponseStatus.FAILED;
                    return response;
                }
                   
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
