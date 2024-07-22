using API.AppCode.IML;
using API.AppCode.ML;
using Entities;
using Entities.Response;
using Microsoft.CodeAnalysis;

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
                    ProjectId = req.ProjectId,
                    EmailType = req.EmailType,
                    Subject=req.Subject,
                    Content = req.Content,
                    TemplateImage = req.TemplateImage,
                    Status=req.Status,
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
                 new ErrorLog_ML(_dapper).Error(error);

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
        public async Task<object> Call(object obj)
        {
            var req = (Common)obj;
            try
            {
                var param = new
                {
                    Id=req.Id,
                    Subject = req?.name,
                    ProjectId = req.ProjectId,
                    PageLength = req.PageLength
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
            throw new NotImplementedException();
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetEmailTemplate";
        }
    }
    public class Proc_MasterEmailTemplateType : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_MasterEmailTemplateType(IDapper dapper)
        {
            _dapper=dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (MasterEmailTemplateType)obj;
            Response res = new Response();
            try
            {
                var param = new
                {
                    EmailTypeId = req.EmailTypeId,
                    ProjectId=req.ProjectId,
                    EmailType = req.EmailType,
                    Status = req.Status,
                    IsDefault = req.IsDefault,
                };
                res = await _dapper.GetAsync<Response>(GetName(), param);
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

                return res;
            }

        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_AddOrUpdateMasterEmailTemplateType";
        }
    }

    public class Proc_GetMasterEmailTemplateType : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetMasterEmailTemplateType(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (Common)obj;
            try
            {
                var param = new
                {
                    Id = req.Id,
                    EmailType = req.name,
                    ProjectId = req.ProjectId,
                    PageLength = req.PageLength
                };
                var res = await _dapper.GetAll<MasterEmailTemplateType>(GetName(), param);
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

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetMasterEmailTemplateType";
        }
    }

}
