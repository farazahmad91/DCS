using API.AppCode.DL;
using API.AppCode.IML;
using API.AppCode.IService;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class Patient_ML : IPatient
    {
        private readonly IDapper _dapper;
        public Patient_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdatePatient(Patient req)
        {
            IProcedureAsync proc = new Proc_AddPatient(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<Patient>> GetPatient(string? email, int? PId)
        {
            var param = new
            {
              email = email,
              PId = PId
            };
            IProcedureAsync proc = new Proc_GetPatient(_dapper);
            var i = await proc.Call(param);
            return (IEnumerable<Patient>)i;
        }

        public async Task<Patient> GetPatientById(int PId)
        {
            IProcedureAsync proc = new Proc_GetPatientById(_dapper);
            var i = await proc.Call(PId);
            return (Patient)i;
        }
    }
}
