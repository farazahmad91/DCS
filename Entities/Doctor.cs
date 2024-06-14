using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Doctor
    {
        public int DrId { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string DrImage { get; set; }
        public IFormFile ImagePath { get; set; }
        public string Address { get; set; }
        public string Specialization { get; set; }
        public string Gender { get; set; }
        public string DateOfBirth { get; set; }
        public string Qualifications { get; set; }
        public int ExperienceYears { get; set; }
        public string Affiliations { get; set; }
        public string Languages { get; set; }
        public decimal ConsultationFee { get; set; }
        public string Availability { get; set; }
        public int Status { get; set; }
        public DateTime? EntryOn { get; set; }
    }

}
