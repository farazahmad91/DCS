using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Treatment
    {
        public int TreatmentID { get; set; }
        public int? AppointmentID { get; set; }
        public int? ServiceID { get; set; }
        public int? DentistID { get; set; }
        public string Notes { get; set; }
        public int? Duration { get; set; }
        public decimal? Cost { get; set; }
        public int? Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
