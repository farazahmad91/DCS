using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class WorkingHours
    {
        public int WorkingHoursID { get; set; }
        public int? DentistID { get; set; }
        public string DayOfWeek { get; set; }
        public TimeSpan? StartTime { get; set; }
        public TimeSpan? EndTime { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
