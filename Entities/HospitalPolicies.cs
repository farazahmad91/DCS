

namespace Entities
{
    public class HospitalPolicy
    {
        public int HosPolicyId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public int TypeId { get; set; }
        public DateTime LastUpdated { get; set; }}
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
