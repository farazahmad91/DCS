using API.AppCode.IML;
using API.AppCode.ML;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_WorkingHours
    {
        public class Proc_GetWorkings : IProcedureAsync
        {
            private readonly IDapper _dapper;
            public Proc_GetWorkings(IDapper dapper)
            {
                _dapper = dapper;
            }
            public async Task<object> Call(object obj)
            {
                string name = (string)obj;
                try
                {
                    var param = new
                    {
                        DaysName = name,

                    };
                    var i = await _dapper.GetAll<WorkingHours>(GetName(), param);
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
                return "Proc_GetWorkingHours";
            }
        }
    }
}
