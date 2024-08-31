using API.AppCode.IML;
using API.AppCode.ML;
using Entities;
using Entities.Response;
using Microsoft.CodeAnalysis;
using Microsoft.Data.SqlClient.DataClassification;

namespace API.AppCode.DL
{
    public class Proc_AddOrUpdateEmailTemplate : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddOrUpdateEmailTemplate(IDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (EmailTemplate)obj;
            Response res = new Response();
            try
            {
                var param = new
                {
                    TemplateID = req.TemplateID,
                    ProjectId = req.ProjectId,
                    EmailType = req.EmailType,
                    Subject = req.Subject,
                    Content = req.Content,
                    TemplateImage = req.TemplateImage,
                    Status = req.Status,
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
            return "usp_UpsertEmailTemplate";
        }
    }
    public class Proc_GetEmailTemplate : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetEmailTemplate(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (Common)obj;
            try
            {
                var param = new
                {
                    Id = req.Id,
                    Subject = req?.name,
                    Role = req.Role,
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
            _dapper = dapper;
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
                    ProjectId = req.ProjectId,
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
            _dapper = dapper;
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

    public class Proc_ComposeMailAsync : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_ComposeMailAsync(IDapper dapper)
        {
            _dapper = dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (Inbox)obj;
            Response res = new Response();
            try
            {
                var param = new
                {
                    Id=req.Id,
                    FromMail = "cozmotest91@gmail.com",
                    ToMail = req.ToMail,
                    Subject = req.Subject,
                    Message = req.Message,
                    Label=req.Label,
                    Image = req.ImageURL,
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
            return "Proc_ComposeMailAsync";
        }
    }
    public class Proc_GetComposeAsync : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetComposeAsync(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (Common)obj;
            try
            {
                var param = new
                {
                    Id = req.Id,
                    Label = req.name,
                    ProjectId = req.ProjectId,
                };
                var res = await _dapper.GetAll<Inbox>(GetName(), param);
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
            return "Proc_GetComposeAsync";
        }
    }

    public class Proc_DeleteComposeAsync : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_DeleteComposeAsync(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (Common)obj;
            try
            {
                var param = new
                {
                    Id = req.Id,
                };
                var res = await _dapper.GetAsync<Response>(GetName(), param);
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
            return "Proc_DeleteComposeMail";
        }
    }

    public class Proc_GetComposeMailById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetComposeMailById(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            int Id = (int)obj;
            try
            {
                var param = new
                {
                    Id = Id,

                };
                var i = await _dapper.GetAsync<Inbox>(GetName(), param);
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
                new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetComposeMailById";
        }

    }
}
