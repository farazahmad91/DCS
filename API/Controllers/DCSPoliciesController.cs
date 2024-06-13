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
        public IActionResult AddorUpdateDCSPolicies(DCSPolicies policy)
        {
            var i = _policies.AddorUpdateDCSPolicies(policy);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSPolicies)+"/{name}")]
        public IActionResult GetDCSPolicies(string name)
        {
            var i = _policies.GetDCSPolicies(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetDCSPoliciesById)+"/{Id}")]
        public IActionResult GetDCSPoliciesById(int Id)
        {
            var i = _policies.GetDCSPoliciesById(Id);
            return Ok(i);
        }
    }
}
