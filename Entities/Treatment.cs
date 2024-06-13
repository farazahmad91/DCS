using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
  
    public class Treatment: Medication
    {
        public int TreatmentId { get; set; }
        public int PId { get; set; }
        public int DrId { get; set; }
        public string Diagnosis { get; set; }
        public DateTime TreatmentDate { get; set; }
        public string Description { get; set; }
        public List<Medication> Medications { get; set; }
        public string Status { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public DateTime? ModifiedDate { get; set; }
        public string ModifiedBy { get; set; }
    }

    public class Medication
    {
        public int MedicationId { get; set; }
        public string Name { get; set; }
        public string Dosage { get; set; }
        public string Frequency { get; set; }
        public DateTime? FollowUpDate { get; set; }
    }

    public class TreatmentDetails
    {
        public IEnumerable<Treatment> treatment { get; set; }
        public IEnumerable<Medication> Medications { get; set; }
    }

}
