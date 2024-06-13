using API.AppCode.DL;
using API.AppCode.IML;
using API.AppCode.IService;
using API.Data;
using DCS.Models;
using Entities;
using Entities.Response;

namespace API.AppCode.ML
{
    public class Doctor_ML : IDoctor
    {
        private readonly IDapper _dapper;
        public Doctor_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdateDoctor(Doctor req)
        {
            IProcedureAsync proc = new Proc_AddDoctor(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<Doctor>> GetDoctor(string name)
        {
            IProcedureAsync proc = new Proc_GetDoctor(_dapper);
            var i = await proc.Call(name);
            return (IEnumerable<Doctor>)i;
        }

        public async Task<Doctor> GetDoctorById(int DrId)
        {
            IProcedureAsync proc = new Proc_GetDoctorById(_dapper);
            var i = await proc.Call(DrId);
            return (Doctor)i;
        }
    }
}
