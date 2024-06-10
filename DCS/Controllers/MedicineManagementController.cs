﻿using API.AppCode.APIRequest;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace DCS.Controllers
{
    public class MedicineManagementController : Controller
    {
        private readonly IConfiguration _configuration;
        private readonly string _BaseUrl;
        public MedicineManagementController(IConfiguration configuration)
        {
            this._configuration = configuration;
            _BaseUrl =  _configuration["APIBaseURl:BaseURl"];
        }
        [HttpGet]
        [Route("/Medicines")]
        public IActionResult Medicines()
        {
            return View();
        }
        [Route("/Medicine_List")]
        public async Task<IActionResult> _Lists(string name)
        {
            var res = new Response()
            {
                ResponseText="something wrong!",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicines{name}", null, null);
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return PartialView(res);
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
        [Route("/EditMedicines")]
        public async Task<IActionResult> _EditMedicines( int id)
        {
            var res = new Response()
            {
                ResponseText="something wrong!",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicinesById/{id}", null, null);
                if (apiRes.Result != null)
                {
                    res = JsonConvert.DeserializeObject<Response>(apiRes.Result);
                    return PartialView(res);
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

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/AddOrUpdateMedicines", JsonConvert.SerializeObject(medicines), null);
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
        public async Task<IActionResult> GetMedicine(string name)
        {
            var res = new Response()
            {
                ResponseText="something wrong!",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {

                var apiRes = await APIRequestML.O.PostAsync($"{_BaseUrl}/api/MedicineManagement/GetMedicines{name}", null, null);
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
    }
}