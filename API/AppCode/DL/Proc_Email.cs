using API.AppCode.IML;
using API.AppCode.ML;
using Entities;
using Entities.Response;

namespace API.AppCode.DL
{
    public class Proc_AddOrUpdateEmailTemplate: IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddOrUpdateEmailTemplate(IDapper dapper)
        {
            _dapper=dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (EmailTemplate)obj;
            Response res = new Response();
            try
            {
                var param = new
                {
                    TemplateID=req.TemplateID,
                    TemplateName=req.TemplateName,
                    Subject=req.Subject,
                    Body=req.Body,
                };
                res = await _dapper.GetAsync<Response>(GetName(),param);
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

                return res;
            }
            
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "usp_UpsertEmailTemplate";
        }
    }
    public class Proc_GetEmailTemplate : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetEmailTemplate(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call()
        {
            try
            {
                var res = await _dapper.GetAll<EmailTemplate>(GetName());
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
                return "something went wrong!!";
            }
            throw new NotImplementedException();
        }

        public Task<object> Call(object obj)
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetEmailTemplate";
        }
    }

    public class Proc_GetEmailTemplateById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetEmailTemplateById(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call()
        {
            
            throw new NotImplementedException();
        }

        public async Task<object> Call(object obj)
        {
            int req = (int)obj;
            try
            {
                var param = new
                {
                    TemplateID = req,
                };
                var res = await _dapper.GetAll<EmailTemplate>(GetName(), param);
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
                return "something went wrong!!";
            }
        }

        public string GetName()
        {
            return "proc_GetEmailTemplateById";
        }
    }
}
