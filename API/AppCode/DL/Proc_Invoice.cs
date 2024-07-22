using API.AppCode.IML;
using API.AppCode.ML;
using API.Data;
using Entities;
using Entities.Response;
using System.Collections.Generic;
using System.Data;

namespace API.AppCode.DL
{
    public class Proc_Invoice : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_Invoice(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            var invoiceView = (InvoiceViewModel)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    PatientName = invoiceView.CustomerName,
                    Email = invoiceView.Email,
                    Phone = invoiceView.Phone,
                    Address = invoiceView.Address,
                    Subtotal = invoiceView.Subtotal,
                    DiscountAmount = invoiceView.DiscountAmount,
                    TotalVAT = invoiceView.TotalVAT,
                    TotalAmount = invoiceView.TotalAmount,
                    InvoiceItems = ConvertToDataTable(invoiceView.Items),
                    Transaction = ConvertToDataTable(invoiceView.Transactions)
                };

                var i = await _dapper.GetAsync<Response>(GetName(), param);
                res=i;
                return res;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                 new ErrorLog_ML(_dapper).Error(error);
            }
            return res;
        }

        public DataTable ConvertToDataTable(List<Entities.InvoiceItem> invoiceItems)
        {
            var dataTable = new DataTable();

            dataTable.Columns.Add("Service", typeof(string));
            dataTable.Columns.Add("Product", typeof(string));
            dataTable.Columns.Add("Quantity", typeof(double));
            dataTable.Columns.Add("Unit", typeof(string));
            dataTable.Columns.Add("Price", typeof(double));
            dataTable.Columns.Add("VAT", typeof(double));
            dataTable.Columns.Add("Discount", typeof(double));
            dataTable.Columns.Add("SingleDiscountAmount", typeof(double));
            dataTable.Columns.Add("SubAmount", typeof(double));
            dataTable.Columns.Add("NetAmount", typeof(double));
            dataTable.Columns.Add("VATAmount", typeof(double));
            dataTable.Columns.Add("TotalAmount", typeof(double));

            foreach (var item in invoiceItems)
            {
                dataTable.Rows.Add(
                    item.Service,
                    item.Product,
                    item.Quantity,
                    item.Unit,
                    item.Price,
                    item.VAT,
                    item.Discount,
                    item.SingleDiscountAmount,
                    item.SubAmount,
                    item.NetAmount,
                    item.VATAmount,
                    item.TotalAmount
                );
            }
            return dataTable;
        }
        public DataTable ConvertToDataTable(List<Entities.TransactionDetails> transactionDetailsList)
        {
            var dataTable = new DataTable();

            dataTable.Columns.Add("Mode", typeof(string));
            dataTable.Columns.Add("TransactionId", typeof(string));
            dataTable.Columns.Add("IsPaid", typeof(double));
            dataTable.Columns.Add("DueDate", typeof(string));
            foreach (var transactionDetail in transactionDetailsList)
            {
                dataTable.Rows.Add(
                    transactionDetail.Mode,
                    transactionDetail.Id,
                    transactionDetail.IsPaid,
                    transactionDetail.DueDate
                );
            }
            return dataTable;
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName() => "InsertInvoiceData";
    }

    public class Proc_GetInvoice : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetInvoice(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
			var req = (Common)obj;
			try
			{
				var param = new
				{
					Id = req.Id,
					PatientName = req.name,
					ProjectId = req.ProjectId,
					PageLength = req.PageLength
				};
				var res = await _dapper.GetAll<InvoiceViewModel>(GetName(), param);
				return res;
			}
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                 new ErrorLog_ML(_dapper).Error(error);
				return "something went wrong!!";
			}
			
		}

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_Proc_GetInvoiceListAndBYId";
        }
    }

    public class Proc_GetInvoiceDataByInvoiceId : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetInvoiceDataByInvoiceId(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<object> Call()
        {

            throw new NotImplementedException();
        }

        public async Task<object> Call(object obj)
        {
            int invoiceId = (int)obj;
            InvoiceViewModelDetails invoiceDetails = new InvoiceViewModelDetails();
            IEnumerable<InvoiceItem> items = new List<InvoiceItem>();
            try
            {
                var param = new
                {
                    InvoiceID = invoiceId,
                    Case=1

                };
                var invoiceData = await _dapper.GetAll<InvoiceViewModel>(GetName(),new { InvoiceID = invoiceId, Case = 1 });
                items = await _dapper.GetAll<InvoiceItem>(GetName(), new { InvoiceID = invoiceId, Case = 2 });
                var transactionData = await _dapper.GetAll<TransactionDetails>(GetName(), new { InvoiceID = invoiceId, Case = 3 });

                invoiceDetails.InvoiceViewModels = invoiceData;
                invoiceDetails.InvoiceItems = items.ToList();
                invoiceDetails.TransactionDetail = transactionData;

                return invoiceDetails;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                 new ErrorLog_ML(_dapper).Error(error);
            }
            return invoiceDetails;
        }

        public string GetName()
        {
            return "Proc_GetInvoiceDataByInvoiceId";
        }
    }
}
