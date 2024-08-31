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
            _dapper = dapper;

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
                _sendmail.Sendmailss(emails);
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
        public async Task<Response> ComposeEmail(Inbox inbox)
        {
            var response = new Response()
            {
                ResponseText = "An error has occurred, try again later!",
                StatusCode = ResponseStatus.FAILED
            };
            var failedEmails = new List<string>();
            try
            {
                response =  _sendmail.ComposeEmail(inbox);
                if (response.StatusCode == ResponseStatus.SUCCESS)
                {
                    IProcedureAsync procedure = new Proc_ComposeMailAsync(_dapper);
                    var i = await procedure.Call(inbox);
                }
            }
            catch (Exception ex)
            {
                failedEmails.Add(inbox.ToMail);

            }
            if (failedEmails.Count > 0)
            {
                response.ResponseText = $"Failed to send emails to the following recipients: {string.Join(", ", failedEmails)}";
                response.StatusCode = ResponseStatus.FAILED;
            }
            else
            {
                response.ResponseText = "emails sent successfully";
                response.StatusCode = ResponseStatus.SUCCESS;
            }

            return response;
        }

        #region Email Template
        public async Task<Response> AddOrUpdateEmailTemplate(EmailTemplate template)
        {
            IProcedureAsync procedure = new Proc_AddOrUpdateEmailTemplate(_dapper);
            var i = await procedure.Call(template);
            return (Response)i;
        }

        public async Task<IEnumerable<EmailTemplate>> GetEmailTemplateListOrById(Common common)
        {
            IProcedureAsync procedure = new Proc_GetEmailTemplate(_dapper);
            var i = await procedure.Call(common);
            return (IEnumerable<EmailTemplate>)i;
        }
        #endregion

        #region Email Template Type
        public async Task<Response> AddOrUpdateMasterEmailTemplateType(MasterEmailTemplateType type)
        {
            IProcedureAsync procedure = new Proc_MasterEmailTemplateType(_dapper);
            var i = await procedure.Call(type);
            return (Response)i;
        }
        public async Task<IEnumerable<MasterEmailTemplateType>> GetMasterEmailTemplateTypeListOrById(Common common)
        {
            IProcedureAsync procedure = new Proc_GetMasterEmailTemplateType(_dapper);
            var i = await procedure.Call(common);
            return (IEnumerable<MasterEmailTemplateType>)i;
        }
        #endregion


        public async Task<IEnumerable<Inbox>> GetComposeMailAsync(Common common)
        {
            IProcedureAsync proc = new Proc_GetComposeAsync(_dapper);
            var i = await proc.Call(common);
            return (IEnumerable<Inbox>)i;
        }
        public async Task<Response> DeleteMail(Common common)
        {
            IProcedureAsync proc = new Proc_DeleteComposeAsync(_dapper);
            var i = await proc.Call(common);
            return (Response)i;
        }
        public async Task<Inbox> GetComposeMailById(int Id)
        {
            IProcedureAsync proc  =new Proc_GetComposeMailById(_dapper);
            var i=await proc.Call(Id);
            return (Inbox)i;
        }



       
    }
}
