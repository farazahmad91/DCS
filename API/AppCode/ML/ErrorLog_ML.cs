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
        public int Error(ErrorLog res)
        {
            try
            {
                var sp = "Proc_InsertErrorLog";
                var param = new
                {
                    ClassName = res.ClassName,
                    FuncName = res.FuncName,
                    Error = res.Error,
                    ProcName = res.ProcName,
                };
                var i = _dapper.Update(param, sp);
                return i;
            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
