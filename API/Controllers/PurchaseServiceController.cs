using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PurchaseServiceController : ControllerBase
    {
        private readonly IPurchaseService _purchase;
        public PurchaseServiceController(IPurchaseService purchase)
        {
            _purchase =purchase;
        }
        [HttpPost(nameof(AddTreatment))]
        public async Task<IActionResult> AddTreatment(PurchaseService service)
        {
            var i = await _purchase.AddOrUpdatePurchaseService(service);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatment)+"/{email}")]
        public async Task<IActionResult> GetTreatment(string email)
        {
            var i = await _purchase.GetPurchaseService(email);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatmentByPId)+"/{Id}")]
        public async Task<IActionResult> GetTreatmentByPId(int Id)
        {
            var i =await _purchase.GetPurchaseServiceById(Id);
            return Ok(i);
        }
    }
}
