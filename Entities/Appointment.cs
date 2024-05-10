namespace SDClinic.Models
{
    public class Appointment
    {
        public int AppointmentID { get; set; }
        public int? PatientID { get; set; }
        public DateTime? AppointmentDate { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public int? Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
