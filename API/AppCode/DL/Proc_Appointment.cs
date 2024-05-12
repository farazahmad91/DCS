using API.AppCode.IML;
using Entities;
using DCS.AppCode.Configuration;
using DCS.Models;

namespace API.AppCode.DL
{
    public class Proc_Appointment :  IProcedure
    {   private readonly IDapper _dapper;
        public Proc_Appointment(IDapper dapper)
        {
                this._dapper = dapper;    
        }
        public object Call(object obj)
        {
           int faq =  (int)obj;

            try
            {
                var param = new
                {
                    AppointmentId = faq,

                };
                var i = _dapper.GetById<Appointment>(param, GetName());
                return i;
            }
            catch (Exception ex)
            {
                var Error = new ErrorLog()
                {
                    ClassName = GetType().Name,
                    Error = ex.Message,
                    ProcName=GetName(),
                };
                throw;
            }
        }

        public object Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "select * from Appointments Where AppointmentId = @AppointmentId"; ;
        }
    }
}
