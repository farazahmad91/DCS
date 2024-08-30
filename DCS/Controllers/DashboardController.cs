using API.AppCode.APIRequest;
using API.Claims;
using DCS.APIRequest;
using Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    [Authorize]
    public class DashboardController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public DashboardController(IConfiguration configuration, IBaseUrl baseUrl)
        {
            this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}
        public async Task<IActionResult> DashboardStatus()
        {
            Common common = new Common(); 
            var list = new DashboardStatus();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetDashboardStatus", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<DashboardStatus>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/DashboardStatus2ndRow")]
        public async Task<IActionResult> DashboardStatus2ndRow()
        {
            Common common = new Common();
            var list = new DashboardStatus();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetDashboardStatus", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<DashboardStatus>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/GetApointmentForDonutChart")]
        public async Task<IActionResult> GetApointmentForDonutChart()
        {
            Common common = new Common();
            var list = new List<ApointmentDonutChart>();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetApointmentForDonutChart", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<ApointmentDonutChart>>(apiRes.Result);
            }
            return Json(list);
        }

        [Route("/GetTopHospitalService")]
        public async Task<IActionResult> GetTopHospitalService()
        {
            Common common = new Common();
            var list = new List<TopHospitalService>();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetTopHospitalService", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<TopHospitalService>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/GetAppointmentDetailNextSevenDay")]
        public async Task<IActionResult> GetAppointmentDetailNextSevenDay()
        {
            Common common = new Common();
            var list = new List<AppointmentDetailNextSevenDay>();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetAppointmentDetailNextSevenDay", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<AppointmentDetailNextSevenDay>>(apiRes.Result);
            }
            return PartialView(list);
        }

        [Route("/GetTopAddressOfUser")]
        public async Task<IActionResult> GetTopAddressOfUser()
        {
            Common common = new Common();
            var list = new List<TopAddressOfUser>();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetTopAddressOfUser", JsonConvert.SerializeObject(common), User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<TopAddressOfUser>>(apiRes.Result);
            }
            return Json(list);
        }
    }
}
