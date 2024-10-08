﻿using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class HospitalServices
    {
        public int? ServiceID { get; set; }
        public int? ProjectId { get; set; }
        public string? ServiceName { get; set; }
        public string? Description { get; set; }
		public string? ServicesImage { get; set; }
		public IFormFile? ImagePath { get; set; }
		public decimal? Price { get; set; }
        public bool? Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }
}
