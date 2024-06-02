using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IErrorLog
    {
        public Task<int> Error(ErrorLog res);
    }
}
