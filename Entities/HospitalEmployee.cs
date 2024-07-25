using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class HospitalEmployee
    {
        public int? EmployeeId { get; set; }
        public int? ProjectId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? ContactNumber { get; set; }
        public string? ProfileImage { get; set; }
        public IFormFile? ImagePath { get; set; }
        public string? Address { get; set; }
        public string? Specialization { get; set; }
        public string? Gender { get; set; }
        public string? DateOfBirth { get; set; }
        public string? Qualifications { get; set; }
        public int? ExperienceYears { get; set; }
        public string? Department { get; set; }
        public string? Position { get; set; }
        public string? DateOfJoining { get; set; }
        public float? Salary { get; set; }
        public string? AdharNumber { get; set; }
        public string? AdharImage { get; set; }
        public IFormFile? AadhaarImagePath { get; set; }
        public bool? Status { get; set; }

    }
}
