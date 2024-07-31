using API.AppCode.DL;
using API.AppCode.IML;
using API.Data;
using Entities;

namespace API.AppCode.ML
{
    public class DashboardStatus_ML : IDashboardStatus
    {
        private readonly IDapper _dapper;
        public DashboardStatus_ML(IDapper dapper) 
        {
            _dapper = dapper;
        }
        public async Task<DashboardStatus> GetDashboardStatus(Common common)
        {
            IProcedureAsync procedure = new Proc_GetDashboardStatus(_dapper);
            var i = await procedure.Call(common);
            return (DashboardStatus)i;
        }

        public async Task<IEnumerable<ApointmentDonutChart>> GetApointmentForDonutChart(Common common)
        {
            IProcedureAsync procedure = new Proc_GetApointmentForDonutChart(_dapper);
            var i = await procedure.Call(common);
            return (IEnumerable<ApointmentDonutChart>)i;
        }

        public async Task<IEnumerable<TopHospitalService>> GetTopHospitalService(Common common)
        {
            IProcedureAsync procedure = new Proc_GetTopHospitalService(_dapper);
            var i = await procedure.Call(common);
            return (IEnumerable<TopHospitalService>)i;
        }
    }
}
