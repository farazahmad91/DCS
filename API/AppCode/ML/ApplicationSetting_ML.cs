using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class ApplicationSetting_ML : IApplicationSetting
    {    private readonly IDapper _dapper;
        public ApplicationSetting_ML(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<IEnumerable<ApplicationSetting>> GetApplicationSetting(int Id)
        {
            IProcedureAsync procedure = new Proc_GetApplicationSetting(_dapper);
            var i = await procedure.Call(Id);
            return (IEnumerable<ApplicationSetting>)i;
        }

        public async Task<ApplicationSetting> GetApplicationSettingByProjectId(int Id)
        {
            IProcedureAsync procedure = new Proc_UpdateApplicationSetting(_dapper);
            var i = await procedure.Call(Id);
            return (ApplicationSetting)i;
        }

        public async Task<Response> UpdateApplicationSetting(ApplicationSetting setting)
        {
            IProcedureAsync procedure = new Proc_UpdateApplicationSetting(_dapper);
           var i = await procedure.Call(setting);
            return (Response)i;
        }
    }
}
