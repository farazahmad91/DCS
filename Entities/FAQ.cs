using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class FAQ
    {
        public int FAQID { get; set; }
        public string Question { get; set; }
        public string Answer { get; set; }
        public int? Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
