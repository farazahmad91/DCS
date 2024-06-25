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
        public async Task<IActionResult> AddOrUpdateHospitalPolicies(HospitalPolicy hospitalPolicy)
        {
            var i =await _policies.AddOrUpdateHospitalPolicies(hospitalPolicy);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalPolicies)+"/{name}")]
        public async Task<IActionResult> GetHospitalPolicies(string? name)
        {
            var i =await _policies.GetHospitalPolicies(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalPoliciesById)+"/{Id}")]
        public async Task<IActionResult> GetHospitalPoliciesById(int Id)
        {
            var i =await _policies.GetHospitalPoliciesById(Id);
            return Ok(i);
        }

        [HttpPost(nameof(GetHospitalPoliciesByTypeId)+"/{Id}")]
        public async Task<IActionResult> GetHospitalPoliciesByTypeId(int Id)
        {
            var i =await _policies.GetHospitalPoliciesByTypeId(Id);
            return Ok(i);
        }
    }
}
