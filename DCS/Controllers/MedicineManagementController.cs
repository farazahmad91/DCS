using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Authorization;
using API.Claims;
using DCS.APIRequest;

namespace DCS.Controllers
{
    [Authorize]
    public class MedicineManagementController : Controller
    {
		private readonly IConfiguration _configuration;
		private readonly string _BaseUrl;
		private readonly IBaseUrl _baseurl;
		public MedicineManagementController(IConfiguration configuration, IBaseUrl baseUrl)
		{
			this._configuration = configuration;
			this._baseurl = baseUrl;
			_BaseUrl = baseUrl.GetBaseUrl();
		}
		[HttpGet]
        [Route("/Medicines")]
        public IActionResult Medicines()
        {
            return View();
        }
        [Route("/Medicine_List")]
        public async Task<IActionResult> _Lists(string? name="All")
        {
            var list = new List<Medicines>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicines/{name}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Medicines>>(apiRes.Result);
            }
            return PartialView(list);
        }
        [Route("/EditMedicines")]
        public async Task<IActionResult> _EditMedicines( int id)
        {
            var list = new Medicines();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicinesById/{id}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<Medicines>(apiRes.Result);
            }
            return PartialView(list);
        }

        [HttpPost]
        [Route("/AddOrUpdateMedicines")]
        public async Task<IActionResult> AddOrUpdateMedicines(Medicines medicines)
        {
            var res = new Response()
            {
                ResponseText="something wrong!",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/AddOrUpdateMedicines", JsonConvert.SerializeObject(medicines), User.GetLoggedInUserToken());
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return Json(res);
                }
                return Json(res);
            }
            catch (Exception ex)
            {
                res.ResponseText="Something wrong!!";
                res.StatusCode = ResponseStatus.FAILED;
                return Json(res);
            }
        }


        [Route("/GetMedicine")]
        public async Task<IActionResult> GetMedicine(string? name="All")
        {
            var list = new List<Medicines>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicines/{name}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Medicines>>(apiRes.Result);
            }
            return Json(list);
        }

        [Route("/details")]
        public async Task<IActionResult> details(string? name = "All")
        {
            var list = new List<Medicines>();
            var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicines/{name}", null, User.GetLoggedInUserToken());
            if (apiRes.Result != null)
            {
                list = JsonConvert.DeserializeObject<List<Medicines>>(apiRes.Result);
            }
            return PartialView(list);
        }
    }
}
