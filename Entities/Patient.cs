using DCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Patient
    {
        public int PatientID { get; set; }
        public string PatientName { get; set; }
        public string PatientEmail { get; set; }
        public string PatientPhone { get; set; }
        public string Address { get; set; }
        public DateTime? CreatedOn { get; set; }
    }
}
