using Entities;

namespace DCS.Models
{
    public class Appointment: Patient
    {
        public int AppointmentID { get; set; }
        public string? AppointmentDate { get; set; }
        public string? AppointTime { get; set; }
        public int? Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
