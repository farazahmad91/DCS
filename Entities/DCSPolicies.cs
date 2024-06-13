using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class DCSPolicies
    {
        public int PolicyId { get; set; }
        public string PolicyName { get; set; }
        public string Description { get; set; }
        public string UpdateDate { get; set; }
        public int Status { get; set; }
    }
}
