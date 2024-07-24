

namespace Entities
{
    public class HospitalPolicy
    {
        public int? HosPolicyId { get; set; }
        public int? ProjectId { get; set; }
        public string? Title { get; set; }
        public string? Description { get; set; }
        public string? Type { get; set; }
        public bool? Status { get; set; }
        public string? LastUpdated { get; set; }}
    }
public enum PolicyType
{
    Admission,
    Discharge,
    Treatment,
    Medication,
    StaffCodeOfConduct,
    PatientRights,
    Confidentiality,
    EmergencyProcedures,
    Other
}
