using API.AppCode.IML;
using Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MedicineManagementController : ControllerBase
    {
        private readonly IMedicineManagement _medicine;
        public MedicineManagementController(IMedicineManagement medicine)
        {
            _medicine=medicine;
        }

        [HttpPost(nameof(AddOrUpdateMedicines))]
        public async Task<IActionResult> AddOrUpdateMedicines(Medicines medicines)
        {
            var i = await _medicine.AddOrUpdateMedicines(medicines);
            return Ok(i);
        }

        [HttpPost(nameof(GetMedicinesById)+"/{id}")]
        public async Task<IActionResult> GetMedicinesById(int id)
        {
            var i = await _medicine.GetMedicinesById(id);
            return Ok(i);
        }

        [HttpPost(nameof(GetMedicines)+"/{name}")]
        public async Task<IActionResult> GetMedicines(string name)
        {
            var i = await _medicine.GetMedicines(name);
            return Ok(i);
        }

        [HttpPost(nameof(GetMedicinesQtyByName)+"/{name}")]
        public async Task<IActionResult> GetMedicinesQtyByName(string? name)
        {
            var i = await _medicine.GetMedicinesQtyByName(name);
            return Ok(i);
        }
    }
}
