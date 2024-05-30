using API.AppCode.IML;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class ErrorLog_ML : IErrorLog
    {
        private readonly IDapper _dapper;
        public ErrorLog_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<int> Error(object entity)
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
            var i = await _dapper.Insert(param, sp);
            return i;
        }
    }
}
