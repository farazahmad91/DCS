using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.NetworkInformation;
using System.Text;
using System.Threading.Tasks;
using static System.Net.Mime.MediaTypeNames;
using System.Xml.Linq;
using Microsoft.AspNetCore.Http;
using System.Collections;

namespace Entities
{
    public class BannerImage
    {
        public int Id { get; set; }
        public int? ProjectId { get; set; }
        public string? Name { get; set; }
        public int Type { get; set; }
        public string? Image { get; set; }
        public IFormFile? ImagePath { get; set; }
        public int IsStatus { get; set; }
        public DateTime EntryOn { get; set; }
        public DateTime ModifyOn { get; set; }
    }
    public class HomeVM
    {
        public IEnumerable<BannerImage> GetBanner { get; set; }
        public IEnumerable<Doctor> GetDoctors { get; set; }
        public IEnumerable<WorkingHours>GetWorkingHours { get; set; }
        public IEnumerable<HospitalServices> GetHospitalServices { get; set; }
    }
}
