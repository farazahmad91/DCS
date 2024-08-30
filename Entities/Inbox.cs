using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Inbox
    {
        public int Id { get; set; }
        public string? FromMail { get; set; }
        public string? ToMail { get; set; }
        public string? Subject { get; set; }
        public string? Message { get; set; }
        public string? Image { get; set; }
        public string? ImageURL { get; set; }
        public string? Label { get; set; }
        public IFormFile? ImagePath { get; set; }
        public DateTime EntryOn { get; set; }

    }
}
