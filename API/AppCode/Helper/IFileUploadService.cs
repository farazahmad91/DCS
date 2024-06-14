using Entities.Response;

namespace API.AppCode.Helper
{
    public interface IFileUploadService
    {
       public Response Upload(FileUploadModel request);
    }
}
