using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class PatientService
    {
        public int? PatientID { get; set; }
        public int? ServiceID { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
