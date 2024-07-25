using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class HospitalEmployee_ML : IHospitalEmployee
    {private readonly IDapper _dapper;
        public HospitalEmployee_ML(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<Response> AddOrUpdateHospitalEmployee(HospitalEmployee employee)
        {
            IProcedureAsync procedure= new Proc_AddOrUpdateEmployee(_dapper);
            var i = await procedure.Call(employee);
            return (Response)i;
        }

        public async Task<IEnumerable<HospitalEmployee>> GetHospitalEmployeeListOrById(Common common)
        {
            IProcedureAsync procedure = new Proc_GetEmployeeListOrById(_dapper);
            var i = await procedure.Call(common);
            return (IEnumerable<HospitalEmployee>)i;
        }

        public async Task<Response> UpdateHospitalEmployeeStatus(Common common)
        {
            IProcedureAsync procedure = new Proc_UpdateHospitalEmployeeStatus(_dapper);
            var i = await procedure.Call(common);
            return (Response)i;
        }
    }
}
