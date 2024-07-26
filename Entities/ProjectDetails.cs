using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class ProjectDetails
    {
        public int? Id { get; set; }
        public int? ProjectId { get; set; }
		public string? ProjectName { get; set; }
		public string? Email { get; set; }
		public string? DomainName { get; set; }
		public string? Logo { get; set; }
		public IFormFile? ImagePath { get; set; }
		public DateTime? Purchase_Date { get; set; }
        public string? Password { get; set; }
        public int? Status { get; set; }
	}
}
