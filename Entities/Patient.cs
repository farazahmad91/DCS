using DCS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Patient
    {
        public int PId { get; set; }
        public int AppointmentId { get; set; }
        public string Name { get; set; }
        public DateTime DateOfBirth { get; set; }
        public string Gender { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public string PImage { get; set; }
        public string Address { get; set; }
        public string MedicalHistory { get; set; }
        public string InsuranceInformation { get; set; }
        public string EmergencyContactName { get; set; }
        public string EmergencyContactPhone { get; set; }
        public string PrimaryCarePhysicianName { get; set; }
        public string PrimaryCarePhysicianPhone { get; set; }
        public string Allergies { get; set; }
        public string Medications { get; set; }
        public string BloodType { get; set; }
        public int? Height { get; set; }
        public int? Weight { get; set; }
        public string PreferredLanguage { get; set; }
        public string Occupation { get; set; }
    }

}
