using Microsoft.AspNetCore.Http;


namespace Entities
{
    public class Doctor
    {
        public int? DrId { get; set; }
        public int? ProjectId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Phone { get; set; }
        public string? DrImage { get; set; }
        public IFormFile? ImagePath { get; set; }
        public string? Address { get; set; }
        public string? ServiceId { get; set; }
        public string? ServiceName { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Qualifications { get; set; }
        public int ExperienceYears { get; set; }
        public string? Affiliations { get; set; }
        public string? Languages { get; set; }
        public decimal ConsultationFee { get; set; }
        public string? Availability { get; set; }
        public int Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }
    public class DoctorVM
    {
        public Doctor GetDoctors { get; set; }
        public IEnumerable<HospitalServices> GetHospitalServices { get; set; }
    }

}
