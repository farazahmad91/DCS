﻿using API.AppCode.IService;
using API.AppCode.ML;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InvoiceController : ControllerBase
    {
        private readonly IInvoice _invoice;
        public InvoiceController(IInvoice invoice)
        {
           this. _invoice=invoice;
        }
        [HttpPost(nameof(InsertInvoiceData))]
        public async Task<ActionResult> InsertInvoiceData(InvoiceViewModel invoiceViewModel)
        {
            var result = await _invoice.InsertInvoiceData(invoiceViewModel);
            if (result.StatusCode==ResponseStatus.FAILED)
            {
                return BadRequest(result);
            }
            return Ok(result);
        }
    }
}
