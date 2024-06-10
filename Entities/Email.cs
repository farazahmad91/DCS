using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class EmailLog
    {
        public int Id { get; set; }
        public string ToEmail { get; set; }
        public string Subject { get; set; }
        public string Body { get; set; }
        public string ErrorMessage { get; set; }
        public bool SentStatus { get; set; }
    }

    public class EmailTemplate
    {
        public int TemplateID { get; set; }
        public string? TemplateName { get; set; }
        public string? Subject { get; set; }
        public string? Body { get; set; }
        public DateTime CreatedAt { get; set; }
    }
}
