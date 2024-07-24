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

        [HttpPost(nameof(Proc_GetHospitalPolicyListOrById))]
        public async Task<IActionResult> Proc_GetHospitalPolicyListOrById(Common common)
        {
            var i =await _policies.Proc_GetHospitalPolicyListOrById(common);
            return Ok(i);
        }

        [HttpPost(nameof(UpdateHospitalPoliciesStatus))]
        public async Task<IActionResult> UpdateHospitalPoliciesStatus(Common common)
        {
            var i =await _policies.UpdateHospitalPoliciesStatus(common);
            return Ok(i);
        }

    }
}
