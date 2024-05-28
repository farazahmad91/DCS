using DCS.Models;
using Entities.Response;

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
