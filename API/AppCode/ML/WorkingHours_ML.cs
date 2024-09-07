using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using static API.AppCode.DL.Proc_WorkingHours;

namespace API.AppCode.ML
{
    public class WorkingHours_ML:IWorkingHours
    {
        private readonly IDapper _dapper;
        public WorkingHours_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }

        public async Task<IEnumerable<WorkingHours>> GetWorkingDays(string? name)
        {
            IProcedureAsync proc = new Proc_GetWorkings(_dapper);
            var i = await proc.Call(name);
            return (IEnumerable<WorkingHours>)i;
        }

    }
}
