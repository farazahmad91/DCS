using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IEmail
    {
        public Response SendBulkEmails(List<CreateEmail> emails);
    }
}
