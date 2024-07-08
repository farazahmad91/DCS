using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_AddPurchaseService : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddPurchaseService(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (PurchaseService)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var projectid = await _dapper.GetAsync<Response>("Proc_GetApplicationSettingByIdOnload", new { Email = req.UserEmail });
                var servicedetail = await _dapper.GetAsync<PlanServices>("Proc_GetPremiumServiceById", new { ServiceId = req.ServiceID });
                var param = new
                {
                    PurchaseID=req.PurchaseID,
                    ProjectID = projectid.ProjectId,
                    UserEmail =req.UserEmail,
                    ServiceID=req.ServiceID,
                    ExpiryYear = servicedetail.Duration,
                    Price= servicedetail.Price,
                    Discount= servicedetail.Discounts,
                    FinalPrice=req.FinalPrice,
                    RenewalOption=req.RenewalOption,
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
            }
            return res;
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_ManagePurchase";
        }
    }

    public class Proc_GetPurchaseService : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPurchaseService(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string email = (string)obj;
            try
            {
                var param = new
                {
                    UserEmail = email,

                };
                var i = await _dapper.GetAll<PurchaseService>(GetName(), param);
                return i;
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetPurchasesService";
        }
    }

    public class Proc_GetPurchaseServiceById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPurchaseServiceById(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            int id = (int)obj;
            try
            {
                var param = new
                {
                    PurchaseID = id,

                };
                var i = await _dapper.GetAsync<PurchaseService>(GetName(), param);
                return i;
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetPurchaseServiceById";
        }
    }
}
