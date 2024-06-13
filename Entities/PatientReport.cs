using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class PatientReport
    {
        public int? PId { get; set; } 
        public int? ServiceId { get; set; } 
        public int? DrId { get; set; }
        public int? HospitalId { get; set; }
        public string? Diagnosis { get; set; } 
        public string? PrescribeMedicine { get; set; }
        public string? MedicineTiming { get; set; }
        public DateTime? NextAppointmentDate { get; set; } 
        public decimal? Cost { get; set; }
        public string? Status { get; set; } // Current status of the patient (e.g., improving, stable, critical)
        public DateTime? EntryOn { get; set; }
    }


}
