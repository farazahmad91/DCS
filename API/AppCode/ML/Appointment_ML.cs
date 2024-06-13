using API.AppCode.DL;
using API.AppCode.IML;
using DCS.Models;
using Entities.Response;

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

        public async Task<IEnumerable<Appointment>> GetAppointment(string Date)
        {
            IProcedureAsync proc = new Proc_GetAppointment(_dapper);
            var i = await proc.Call(Date);
            return (IEnumerable<Appointment>)i;
        }

        public async Task<Appointment> GetAppointmentById(int AppointmentId)
        {
            IProcedureAsync proc = new Proc_GetAppointmentByPId(_dapper);
            var i = await proc.Call(AppointmentId);
            return (Appointment)i;
        }

        public int DeleteAppointment(int id)
        {
            throw new NotImplementedException();
        }
    }
}
