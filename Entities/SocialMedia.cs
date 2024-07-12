using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class SocialMedia
    {
        public int? SMId { get; set; }
        public int? ProjectId { get; set; }
        public string? PlateformName { get; set; }
        public string? PlateformLink { get; set; }
        public string? Icons { get; set; }
        public IFormFile? ImagePath { get; set; }
        public int? Status { get; set; }
        public string? EntryOn { get; set; }
        public string? UpdateOn { get; set; }
    }
}
