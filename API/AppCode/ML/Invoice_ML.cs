using API.AppCode.DL;
using API.AppCode.IML;
using API.AppCode.IService;
using DCS.Models;
using Entities;
using Entities.Response;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.VisualBasic;
using Newtonsoft.Json.Linq;
using System.Net;
using System.Numerics;
using System.Reflection.Metadata;

namespace API.AppCode.ML
{
    public class Invoice_ML:IInvoice
    {
        private readonly IDapper _dapper;
        public Invoice_ML(IDapper dapper)
        {
            this._dapper = dapper;
        }

        public async Task<Response> InsertInvoiceData(InvoiceViewModel invoiceView)
        {
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                IProcedureAsync proc = new Proc_Invoice(_dapper);
                var i = await proc.Call(invoiceView);
                return res= (Response)i;
            }
            catch (Exception ex)
            {
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "InsertInvoiceData",
                    Error = ex.Message,
                    ProcName = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
            }
            return res;
        }
    }
}
