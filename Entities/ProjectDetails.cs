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
		public int ProjectId { get; set; }
		public string? ProjectName { get; set; }
		public string? UserEmail { get; set; }
		public string? DomainName { get; set; }
		public string? Logo { get; set; }
		public IFormFile? ImagePath { get; set; }
		public DateTime? CreatedDate { get; set; }
		public DateTime? PurchaseDate { get; set; }
		public DateTime? Validity { get; set; }
		public int Status { get; set; }
	}
}
