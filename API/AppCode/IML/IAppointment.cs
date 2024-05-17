using DCS.Models;
using API.DBContext.Response;

namespace API.AppCode.IML
{
    public interface IAppointment
    {
        public Task<Response> AddOrUpdateAppointment(Appointment appointment);
        public IEnumerable<Appointment> GetAppointment();
        public Appointment GetAppointment(int id);
        public int DeleteAppointment(int id);

    }
}
