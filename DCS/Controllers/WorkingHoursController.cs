using API.AppCode.APIRequest;
using API.Claims;
using DCS.APIRequest;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class WorkingHoursController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public WorkingHoursController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}
        [Route("/B-List")]
        public async Task<IActionResult> _GetBannerList(string? name = "All")
        {
            var list = new List<WorkingHours>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/WorkingHours/GetWorking/{name}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<WorkingHours>>(apiRes.Result);
            }
            return PartialView(list);
        }
    }
}
