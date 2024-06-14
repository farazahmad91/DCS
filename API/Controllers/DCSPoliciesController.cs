using API.AppCode.IML;
using DCS.Models;
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

        [HttpPost(nameof(GetDCSPolicies)+"/{name}")]
        public async Task<IActionResult> GetDCSPolicies(string name)
        {
            var i =await _policies.GetDCSPolicies(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSPoliciesById)+"/{Id}")]
        public async Task<IActionResult> GetDCSPoliciesById(int Id)
        {
            var i =await _policies.GetDCSPoliciesById(Id);
            return Ok(i);
        }
    }
}
