using DCS.Models;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IAppointment
    {
        public Task<Response> AddOrUpdateAppointment(Appointment appointment);
        public Task<IEnumerable<Appointment>> GetAppointment(string Date);
        public Task<Appointment> GetAppointmentById(int AppointmentId);
        public int DeleteAppointment(int id);

    }
}
