using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HospitalPoliciesController : ControllerBase
    {
        private readonly IHospitalPolicies _policies;
        public HospitalPoliciesController(IHospitalPolicies policies)
        {
            _policies =policies;
        }
        [HttpPost(nameof(AddOrUpdateHospitalPolicies))]
        public IActionResult AddOrUpdateHospitalPolicies(HospitalPolicy hospitalPolicy)
        {
            var i = _policies.AddOrUpdateHospitalPolicies(hospitalPolicy);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalPolicies)+"/{name}")]
        public IActionResult GetHospitalPolicies(string name)
        {
            var i = _policies.GetHospitalPolicies(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalPoliciesById)+"/{Id}")]
        public IActionResult GetHospitalPoliciesById(int Id)
        {
            var i = _policies.GetHospitalPoliciesById(Id);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalPoliciesByTypeId)+"/{Id}")]
        public IActionResult GetHospitalPoliciesByTypeId(int Id)
        {
            var i = _policies.GetHospitalPoliciesByTypeId(Id);
            return Ok(i);
        }
    }
}
