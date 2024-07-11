using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Replacement
    {
        public Events EventId { get; set; }
        public string ReplaceKeys { get; set; }
        public DateTime EntryOn { get; set; }
        public DateTime ModifyOn { get; set; }
    }
}
