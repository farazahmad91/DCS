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
        [HttpPost(nameof(AddOrUpdatePurchaseService))]
        public async Task<IActionResult> AddOrUpdatePurchaseService(PurchaseService service)
        {
            var i = await _purchase.AddOrUpdatePurchaseService(service);
            return Ok(i);
        }

        [HttpPost(nameof(GetPurchaseService)+"/{email}")]
        public async Task<IActionResult> GetPurchaseService(string? email)
        {
            var i = await _purchase.GetPurchaseService(email);
            return Ok(i);
        }

        [HttpPost(nameof(GetPurchaseServiceById)+"/{Id}")]
        public async Task<IActionResult> GetPurchaseServiceById(int Id)
        {
            var i =await _purchase.GetPurchaseServiceById(Id);
            return Ok(i);
        }
    }
}
