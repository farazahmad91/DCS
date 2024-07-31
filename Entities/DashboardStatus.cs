using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class DashboardStatus
    {
        public int? TotalPatient { get; set; }
        public int? TotalAppointment { get; set; }
        public int? TodayAppointment { get; set; }
        public int? AppointmentsNextSevenDays { get; set; }
        public int? UnAvailableMedStocks { get; set; }
        public int? TotalEmployees { get; set; }
        public int? AbsentEmployees { get; set; }
        public int? TotalRegisterDoctors { get; set; }

    }
    public class ApointmentDonutChart
    {
        public int? TotalAppoint { get; set; }
        public string? YearMonth { get; set; }
    }
    public class AppointmentDetailNextSevenDay
    {
        public int? AppointmentId { get; set; }
        public int? PId { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Appointdate { get; set; }
        public string? PImage { get; set; }
        public string? ServiceName { get; set; }
    }

    public class TopHospitalService
    {
        public int? ServiceId { get; set; }
        public int? ServiceCount { get; set; }
        public string? Appointdate { get; set; }
        public string? ServiceName { get; set; }
    }
}
