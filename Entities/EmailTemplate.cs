using Microsoft.AspNetCore.Http;

namespace Entities
{
	public class EmailTemplate
	{
		public int? TemplateID { get; set; }
        public int? ProjectId { get; set; }
        public string? EmailType { get; set; }
		public string? Subject { get; set; }
        public string? TemplateImage { get; set; }
        public string? Content { get; set; }
        public IFormFile? ImagePath { get; set; } = null;
        public string? CreatedAt { get; set; }
        public string? UpdateOn { get; set; }
        public int? Status { get; set; }
    }
	public class MasterEmailTemplateType
	{
        public int? EmailTypeId { get; set; }
        public int? ProjectId { get; set; }
        public string? EmailType { get; set; }
        public bool? Status { get; set; }
        public bool? IsDefault { get; set; }
    }

    
    
}
