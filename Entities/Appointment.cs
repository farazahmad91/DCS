using Entities;

namespace Entities
{
    public class Appointment
    {
        public int? AppointmentId { get; set; }
        public int? ProjectId { get; set; }
        public int? DrId { get; set; }
        public int? PId { get; set; }
        public int? ServiceId { get; set; }
        public string? ServiceName { get; set; }
        public string? PatientName { get; set; }
        public string? DoctorName { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? PhoneNo { get; set; }
        public string? Date { get; set; }
        public int? Status { get; set; }
        public string? Notes { get; set; }
        public string? CreatedOn { get; set; }
        public string? Time { get; set; }
    }
    public class AppointmentVM
    {
        public Appointment GetAppointment { get; set; }
        public IEnumerable<Doctor> GetDoctors { get; set; }
        public IEnumerable<HospitalServices> GetHospitalServices { get; set; }
    }


}
