using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DCSPoliciesController : ControllerBase
    {
        private readonly IDCSPolicies _policies;
        public DCSPoliciesController(IDCSPolicies policies)
        {
            _policies = policies;
        }
        [HttpPost(nameof(AddorUpdateDCSPolicies))]
        public async Task<IActionResult> AddorUpdateDCSPolicies(DCSPolicies policy)
        {
            var i =await _policies.AddorUpdateDCSPolicies(policy);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSPoliciesListOrById))]
        public async Task<IActionResult> GetDCSPoliciesListOrById(Common common)
        {
            var i =await _policies.GetDCSPoliciesListOrById(common);
            return Ok(i);
        }

        [HttpPost(nameof(UpdateDCSPoliciesStatus))]
        public async Task<IActionResult> UpdateDCSPoliciesStatus(Common common)
        {
            var i =await _policies.UpdateDCSPoliciesStatus(common);
            return Ok(i);
        }
    }
}
