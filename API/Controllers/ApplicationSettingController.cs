﻿using API.AppCode.IML;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ApplicationSettingController : ControllerBase
    {
        private readonly IApplicationSetting _setting;
        public ApplicationSettingController(IApplicationSetting setting)
        {
            _setting=setting;
        }
        [HttpPost(nameof(UpdateApplicationSetting))]
        public async Task<IActionResult> UpdateApplicationSetting(ApplicationSetting setting)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _setting.UpdateApplicationSetting(setting);
            return Ok(i);
        }
        [HttpPost(nameof(GetApplicationSetting)+"/{id}")]
        public async Task<IActionResult> GetApplicationSetting(int? id)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _setting.GetApplicationSetting(id);
            return Ok(i);
        }

        [HttpPost(nameof(GetApplicationSettingByProjectId)+"/{id}")]
        public async Task<IActionResult> GetApplicationSettingByProjectId(int id)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _setting.GetApplicationSettingByProjectId(id);
            return Ok(i);
        }

        [HttpPost(nameof(GetApplicationSettingByIdOnload)+"/{email}")]
        public async Task<IActionResult> GetApplicationSettingByIdOnload(string email)
        {
            var res = new Response
            {
                ResponseText ="An Error Occured Try After Some Time!",
                StatusCode = ResponseStatus.FAILED
            };
            var i = await _setting.GetApplicationSettingByIdOnload(email);
            return Ok(i);
        }
    }
}
