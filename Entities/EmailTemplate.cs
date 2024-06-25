using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
	public class EmailTemplate
	{
		public int TemplateID { get; set; }
		public string? TemplateName { get; set; }
		public string? Subject { get; set; }
		public string? Body { get; set; }
		public DateTime CreatedAt { get; set; }
	}
}
