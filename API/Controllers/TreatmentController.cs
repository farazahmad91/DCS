using API.AppCode.IML;
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
        public IActionResult AddTreatment(Treatment treatments)
        {
            var i = _treatment.AddTreatment(treatments);
            return Ok(i);
        }

        [HttpPost(nameof(UpdateTreatment))]
        public IActionResult UpdateTreatment(Treatment treatments)
        {
            var i = _treatment.UpdateTreatment(treatments);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatment)+"/{date}")]
        public IActionResult GetTreatment(DateTime date)
        {
            var i = _treatment.GetTreatment(date);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatmentByPId)+"/{Id}")]
        public IActionResult GetTreatmentByPId(int Id)
        {
            var i = _treatment.GetTreatmentByPId(Id);
            return Ok(i);
        }
    }
}
