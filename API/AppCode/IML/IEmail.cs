using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IEmail
    {
        public Response SendBulkEmails(CreateEmail emails);
        public Task<Response> AddOrUpdateEmailTemplate(EmailTemplate template);
        public Task<IEnumerable<EmailTemplate>> GetEmailTemplateListOrById(Common common);
    }
}
