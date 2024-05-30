using Entities.Response;

namespace API.AppCode.IML
{
    public interface IErrorLog
    {
        public Task<Response> Error(object entity);
    }
}
