using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_AddDCSPolicies : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddDCSPolicies(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (DCSPolicies)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    PolicyId = req.PolicyId,
                    ProjectId = req.ProjectId,
                    PolicyName = req.PolicyName,
                    Description = req.Description,
                    Type = req.Type,
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

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_UpsertDCSPolicies";
        }
    }

    public class Proc_GetDCSPoliciesListOrById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetDCSPoliciesListOrById(IDapper dapper)
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
                    PolicyName = req.name,
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                    PageLength = req.PageLength
                };
                var i = await _dapper.GetAll<DCSPolicies>(GetName(), param);
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
            return "Proc_GetDCSPoliciesListOrById";
        }
    }

    public class Proc_UpdateDCSPoliciesStatus : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_UpdateDCSPoliciesStatus(IDapper dapper)
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
                    Status = req.Status

                };
                var i = await _dapper.GetAsync<Response>(GetName(), param);
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
            return "Proc_updateDCSPoliciesStatus";
        }
    }
}
