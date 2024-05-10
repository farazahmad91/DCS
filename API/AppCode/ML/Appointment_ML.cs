using API.AppCode.DL;
using API.AppCode.IML;
using API.AppCode.IService;
using Entities;
using SDClinic.Models;

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
            
            throw new NotImplementedException();
        }

        public IEnumerable<Appointment> GetAppointment()
        {
            throw new NotImplementedException();
        }

        public Appointment GetAppointment(int id)
        {
            try
            {
                IProcedure procedure = new Proc_Appointment(_dapper);
                var i =procedure.Call(id);
                return (Appointment)i;
            }
            catch (Exception ex)
            {

                throw;
            }
        }

        public int DeleteAppointment(int id)
        {
            throw new NotImplementedException();
        }
    }
}
