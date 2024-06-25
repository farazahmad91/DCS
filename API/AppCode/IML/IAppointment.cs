
using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IAppointment
    {
        public Task<Response> AddOrUpdateAppointment(Appointment appointment);
        public Task<IEnumerable<Appointment>> GetAppointment(DateOnly? Date, int? PId);
        public Task<Appointment> GetAppointmentById(int AppointmentId);
        public Task<Appointment> GetAppointmentStatusByUser(string email);
        public Task<Appointment> GetAppointmentStatus();
        public int DeleteAppointment(int id);

    }
}
