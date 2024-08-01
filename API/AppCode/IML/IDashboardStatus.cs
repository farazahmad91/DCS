using Entities;

namespace API.AppCode.IML
{
    public interface IDashboardStatus
    {
        public Task<DashboardStatus> GetDashboardStatus(Common common);
        public Task<IEnumerable<ApointmentDonutChart>> GetApointmentForDonutChart(Common common);
        public Task<IEnumerable<TopHospitalService>> GetTopHospitalService(Common common);
        public Task<IEnumerable<AppointmentDetailNextSevenDay>> GetAppointmentDetailNextSevenDay(Common common);
        public Task<IEnumerable<TopAddressOfUser>> GetTopAddressOfUser(Common common);
    }
}
