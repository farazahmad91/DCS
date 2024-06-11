using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class ProjectDetails
    {
        public int ProjectId { get; set; }
        public string? UserEmail { get; set; }
        public string? ProjectName { get; set; }
        public string? DomainName { get; set; }
        public string? PurchaseDate { get; set; }
        public string? Validity { get; set; }
        public bool IsLifeTime { get; set; }
        public int Status { get; set; }
    }
}
