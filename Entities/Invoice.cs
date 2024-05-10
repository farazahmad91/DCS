using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Invoice
    {
        public int InvoiceID { get; set; }
        public int? AppointmentID { get; set; }
        public decimal? TotalAmount { get; set; }
        public DateTime? InvoiceDate { get; set; }
        public int? IsPaid { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
