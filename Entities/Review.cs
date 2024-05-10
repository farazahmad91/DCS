using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Review
    {
        public int ReviewID { get; set; }
        public int? PatientID { get; set; }
        public int? DentistID { get; set; }
        public decimal? Rating { get; set; }
        public string ReviewText { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
