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
        public IActionResult AddTreatment(PurchaseService service)
        {
            var i = _purchase.AddOrUpdatePurchaseService(service);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatment)+"/{email}")]
        public IActionResult GetTreatment(string email)
        {
            var i = _purchase.GetPurchaseService(email);
            return Ok(i);
        }

        [HttpPost(nameof(GetTreatmentByPId)+"/{Id}")]
        public IActionResult GetTreatmentByPId(int Id)
        {
            var i = _purchase.GetPurchaseServiceById(Id);
            return Ok(i);
        }
    }
}
