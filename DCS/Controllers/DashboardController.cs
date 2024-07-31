﻿using API.AppCode.APIRequest;
using API.Claims;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class DashboardController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public DashboardController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }

        public async Task<IActionResult> DashboardStatus()
        {
            Common common = new Common();
            var list = new DashboardStatus();
            int? projectId = User.GetProjectId();
            string? Role = User.GetLoggedInUserRole();
            common.ProjectId = projectId;
            common.Role = Role;
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetDashboardStatus", JsonConvert.SerializeObject(common), null);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetDashboardStatus", JsonConvert.SerializeObject(common), null);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetApointmentForDonutChart", JsonConvert.SerializeObject(common), null);
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
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/Dashboard/GetTopHospitalService", JsonConvert.SerializeObject(common), null);
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<TopHospitalService>>(apiRes.Result);
            }
            return Json(list);
        }
    }
}
