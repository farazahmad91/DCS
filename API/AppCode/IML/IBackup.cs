using Entities.Response;

namespace API.AppCode.IML
{
	public interface IBackup
	{
        Task<Response> GetBackUpDataBase();

    }
}
