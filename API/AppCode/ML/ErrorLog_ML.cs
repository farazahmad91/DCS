using API.AppCode.IML;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;

namespace API.AppCode.ML
{
    public class ErrorLog_ML : IErrorLog
    {
        private readonly IDapper _dapper;
        public ErrorLog_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> Error(object entity)
        {
            var response = new Response()
            {
                ResponseText="Log error",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var sp = "Proc_InsertErrorLog";
                var res = (ErrorLog)entity;
                var param = new
                {
                    ClassName = res.ClassName,
                    FuncName = res.FuncName,
                    Error = res.Error,
                    Proc_Name = res.ProcName,
                };
                var i = await _dapper.GetAsync<Response>(sp, param);
                response=i;
                return i;
            }
            catch (Exception ex)
            {
                var res = new Response()
                {
                    ResponseText=ex.Message,
                    StatusCode=ResponseStatus.FAILED
                };
                return res;
            }
        }
    }
}
