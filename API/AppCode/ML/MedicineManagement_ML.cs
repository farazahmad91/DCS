using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;

namespace API.AppCode.ML
{
    public class MedicineManagement_ML : IMedicineManagement
    {
        private readonly IDapper _dapper;
        private readonly IConfiguration configuration;
        public MedicineManagement_ML(IDapper dapper, IConfiguration configuration)
        {
            _dapper=dapper;
            this.configuration = configuration;
        }
        public async Task<Response> AddOrUpdateMedicines(Medicines medicine)
        {
            var skey = configuration["HashPassword:EncryptionKey"];
            var response = new Response()
            {
                ResponseText="Invalid API Key",
                StatusCode=ResponseStatus.FAILED,
            };

                IProcedureAsync procedure = new Proc_AddOrUpdateMedicines(_dapper);
                var i = await procedure.Call(medicine);
                return (Response)i;
        }

        public async Task<IEnumerable<Medicines>> GetMedicines(string name)
        {
            IProcedureAsync procedure = new Proc_GetMedicines(_dapper);
            var i= await procedure.Call(name);
            return (IEnumerable<Medicines>)i;
        }

        public async Task<Medicines> GetMedicinesById(int id)
        {
            IProcedureAsync procedure = new Proc_GetMedicinesById(_dapper);
            var i = await procedure.Call(id);
            return (Medicines)i;
        }

        public async Task<Medicines> GetMedicinesQtyByName(string name)
        {
            IProcedureAsync procedure = new Proc_GetMedicinesQty(_dapper);
            var i = await procedure.Call(name);
            return (Medicines)i;
        }
    }
}
