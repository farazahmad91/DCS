using API.AppCode.DL;
using API.AppCode.IML;
using API.AppCode.IService;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class PatientReport_ML : IPatientReport
    {
        private readonly IDapper _dapper;
        public PatientReport_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdateDoctor(PatientReport req)
        {
            IProcedureAsync proc = new Proc_AddPatientReport(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<PatientReport>> GetDoctor(string date)
        {
            IProcedureAsync proc = new Proc_GetPatientReport(_dapper);
            var i = await proc.Call(date);
            return (IEnumerable<PatientReport>)i;
        }

        public async Task<PatientReport> GetDoctorById(int Id)
        {
            IProcedureAsync proc = new Proc_GetPatientReportById(_dapper);
            var i = await proc.Call(Id);
            return (PatientReport)i;
        }
    }
}
