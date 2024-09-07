using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class WorkingHours
    {
        public int Id { get; set; }
        public int? ProjectId { get; set; }
        public string DaysName { get; set; }
        public string? StartTime { get; set; }
        public string? EndTime { get; set; }
        public string? EntryOn { get; set; }
    }
}
