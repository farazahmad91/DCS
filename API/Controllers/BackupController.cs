using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class BackupController : ControllerBase
	{
        private readonly IBackup _backup;
        public BackupController(IBackup backup)
        {
            _backup = backup;
        }
        [HttpPost(nameof(GetBackupDataBsae))]
        public async Task<IActionResult> GetBackupDataBsae()
        {
            var i = await _backup.GetBackUpDataBase();
            return Ok(i);
        }
    }
}
