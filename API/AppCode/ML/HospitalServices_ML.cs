using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.AppCode.ML
{
    public class HospitalServices_ML : IHospitalServices
    {
        private readonly IDapper _dapper;
        public HospitalServices_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddorUpdateHospitalServices(HospitalServices req)
        {
            IProcedureAsync proc = new Proc_AddHospitalServices(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<HospitalServices>> GetHospitalServices(string name)
        {
            IProcedureAsync proc = new Proc_GetService(_dapper);
            var i = await proc.Call(name);
            return (IEnumerable<HospitalServices>)i;
        }

        public async Task<HospitalServices> GetHospitalServicesById(int Id)
        {
            IProcedureAsync proc = new Proc_GetServiceById(_dapper);
            var i = await proc.Call(Id);
            return (HospitalServices)i;
        }
    }
}
