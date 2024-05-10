using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class MedicalHistory
    {
        public int MedicalHistoryID { get; set; }
        public int? PatientID { get; set; }
        public string MedicalCondition { get; set; }
        public DateTime? DiagnosisDate { get; set; }
        public string Notes { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
