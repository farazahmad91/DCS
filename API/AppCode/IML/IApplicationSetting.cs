using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IApplicationSetting
    {
        public Task<Response> UpdateApplicationSetting(ApplicationSetting setting);
        public Task<ApplicationSetting> GetApplicationSettingByProjectId(int Id);
        public  Task<IEnumerable<ApplicationSetting>> GetApplicationSetting(int? Id);
    }
}
