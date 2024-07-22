using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace API.AppCode.ML
{
    public class Treatment_ML : ITreatment
    {
        private readonly IDapper _dapper;
        public Treatment_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddTreatment(Treatment req)
        {
            IProcedureAsync proc = new Proc_AddTreatment(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

        public async Task<Treatment> GetTreatmentByPId(int PId)
        {
            IProcedureAsync proc = new Proc_GetTreatmentById(_dapper);
            var i = await proc.Call(PId);
            return (Treatment)i;
        }

        public async Task<IEnumerable<TreatmentDetails>> GetTreatmentListOrById(Common common)
        {
            IProcedureAsync proc = new Proc_GetTreatmentListOrById(_dapper);
            var i = await proc.Call(common);
            return (IEnumerable<TreatmentDetails>)i;
        }

        public async Task<Response> UpdateTreatment(Treatment req)
        {
            IProcedureAsync proc = new Proc_UpdateTreatment(_dapper);
            var i = await proc.Call(req);
            return (Response)i;
        }

    }
}
