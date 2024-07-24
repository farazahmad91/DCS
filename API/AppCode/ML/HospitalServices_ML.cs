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

        public async Task<IEnumerable<HospitalServices>> GetHospitalServicesListOrById(Common common)
        {
            IProcedureAsync proc = new Proc_GetHospitalServicesListOrById(_dapper);
            var i = await proc.Call(common);
            return (IEnumerable<HospitalServices>)i;
        }

        public async Task<Response> UpdateHospitalServiceStatus(Common common)
        {
            IProcedureAsync proc = new Proc_UpdateHospitalServiceStatus(_dapper);
            var i = await proc.Call(common);
            return (Response)i;
        }
    }
}
