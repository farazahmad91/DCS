using API.AppCode.IML;
using API.AppCode.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class FAQController : ControllerBase
    {
        private readonly IAppointment _appointment;
        public FAQController(IAppointment appointment)
        {
            _appointment=appointment;
        }

    }
}
