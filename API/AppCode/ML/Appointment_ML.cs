using API.AppCode.DL;
using API.AppCode.IML;
using Entities;
using Entities.Response;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace API.AppCode.ML
{
    public class Appointment_ML : IAppointment
    {
        private readonly IDapper _dapper;
        public Appointment_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<Response> AddOrUpdateAppointment(Appointment req)
        {
            IProcedureAsync proc = new Proc_Appointment(_dapper);
            var i= await  proc.Call(req);
            return (Response)i;
        }

        public async Task<IEnumerable<Appointment>> GetAppointment(Common common)
        {

            IProcedureAsync proc = new Proc_GetAppointment(_dapper);
            var i = await proc.Call(common);
            return (IEnumerable<Appointment>)i;
        }

        public async Task<Appointment> GetAppointmentById(int AppointmentId)
        {
            IProcedureAsync proc = new Proc_GetAppointmentByPId(_dapper);
            var i = await proc.Call(AppointmentId);
            return (Appointment)i;
        }

        public async Task<Appointment> GetAppointmentStatusByUser(string email)
        {
            IProcedureAsync proc = new Proc_GetAppointmentStatusByUser(_dapper);
            var i = await proc.Call(email);
            return (Appointment)i;
        }
        public int DeleteAppointment(int id)
        {
            throw new NotImplementedException();
        }

        public async Task<Appointment> GetAppointmentStatus()
        {
            IProcedureAsync proc = new Proc_GetAppointmentStatus(_dapper);
            var i = await proc.Call();
            return (Appointment)i;
        }
    }
}
