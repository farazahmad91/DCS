using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;
using Microsoft.CodeAnalysis;

namespace API.AppCode.DL
{
    public class Proc_AddOrUpdateSocialMedia : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddOrUpdateSocialMedia(IDapper dapper)
        {
            this._dapper = dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (SocialMedia)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED,
                AppointmentId=0
            };
            try
            {
                var param = new
                {
                    SMId = req.SMId,
                    ProjectId=req.ProjectId,
                    PlateformName = req.PlateformName,
                    PlateformLink = req.PlateformLink,
                    Icons = req.Icons,
                    Status = req.Status,
                };

                var i = await _dapper.GetAsync<Response>(GetName(), param);
                res=i;
                return res;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                new ErrorLog_ML(_dapper).Error(error);
            }
            return res;
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_AddOrUpdateSocialMedia";
        }
    }
    public class Proc_GetAllSocialMedia : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetAllSocialMedia(IDapper dapper)
        {
            this._dapper = dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (Common)obj;
            try
            {
                var param = new
                {   
                    Id=req.Id,
                    PlateformName = req.name,
                    ProjectId=req.ProjectId,
                    PageLength = req.PageLength
                };

                var i = await _dapper.GetAll<SocialMedia>(GetName(), param);
                return i;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetSocialMediaListOrById";
        }
    }

}
