using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Payment
    {
        public int PaymentID { get; set; }
        public int? AppointmentID { get; set; }
        public decimal? Amount { get; set; }
        public DateTime? PaymentDate { get; set; }
        public string PaymentMethod { get; set; }
        public int? Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
