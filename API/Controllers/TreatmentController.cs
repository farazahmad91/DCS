﻿using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        private readonly ITreatment _treatment;
        public TreatmentController(ITreatment treatment)
        {
            _treatment =treatment;
        }
        [HttpPost(nameof(AddTreatment))]
        public async Task<IActionResult> AddTreatment(Treatment treatments)
        {
            var i =await _treatment.AddTreatment(treatments);
            return Ok(i);
        }

        [HttpPost(nameof(UpdateTreatment))]
        public async Task<IActionResult> UpdateTreatment(Treatment treatments)
        {
            var i =await _treatment.UpdateTreatment(treatments);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatment)+"/{date}")]
        public async Task<IActionResult> GetTreatment(DateTime? date,int? PId)
        {
            var i =await _treatment.GetTreatment(date,PId);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatmentByPId)+"/{Id}")]
        public async Task<IActionResult> GetTreatmentByPId(int Id)
        {
            var i =await _treatment.GetTreatmentByPId(Id);
            return Ok(i);
        }
    }
}
