using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DashboardController : ControllerBase
    {
        private readonly IDashboardStatus _dashboardStatus;
        public DashboardController(IDashboardStatus dashboardStatus)
        {
            _dashboardStatus=dashboardStatus;
        }
        [HttpPost(nameof(GetDashboardStatus))]
        public async Task<IActionResult> GetDashboardStatus(Common common)
         {
            var i= await _dashboardStatus.GetDashboardStatus(common);
            return Ok(i);
        }
        [HttpPost(nameof(GetApointmentForDonutChart))]
        public async Task<IActionResult> GetApointmentForDonutChart(Common common)
        {
            var i = await _dashboardStatus.GetApointmentForDonutChart(common);
            return Ok(i);
        }

        [HttpPost(nameof(GetTopHospitalService))]
        public async Task<IActionResult> GetTopHospitalService(Common common)
        {
            var i = await _dashboardStatus.GetTopHospitalService(common);
            return Ok(i);
        }

        [HttpPost(nameof(GetAppointmentDetailNextSevenDay))]
        public async Task<IActionResult> GetAppointmentDetailNextSevenDay(Common common)
        {
            var i = await _dashboardStatus.GetAppointmentDetailNextSevenDay(common);
            return Ok(i);
        }
        [HttpPost(nameof(GetTopAddressOfUser))]
        public async Task<IActionResult> GetTopAddressOfUser(Common common)
        {
            var i = await _dashboardStatus.GetTopAddressOfUser(common);
            return Ok(i);
        }
    }
}
