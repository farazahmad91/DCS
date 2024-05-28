using API.AppCode.IML;
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
            var sp = "InsertErrorLog";
            var res = (ErrorLog)entity;
            var param = new
            {
                ClassName = res.ClassName,
                FunctionName = res.FunctionName,
                ResponseText = res.ResponseText,
                Proc_Name = res.Proc_Name,
            };
            var i = await _dapper.Insert(param, sp);
            return i;
        }
    }
}
