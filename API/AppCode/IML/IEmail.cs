using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IEmail
    {
        public Response SendBulkEmails(CreateEmail emails);
        public Task<Response> AddOrUpdateEmailTemplate(EmailTemplate template);
        public Task<IEnumerable<EmailTemplate>> GetEmailTemplate();
        public Task<EmailTemplate> GetEmailTemplateById(int id);
    }
}
