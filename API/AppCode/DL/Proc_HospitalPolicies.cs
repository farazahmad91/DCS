using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_AddHospitalPolicies : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddHospitalPolicies(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (HospitalPolicy)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    HosPolicyId = req.HosPolicyId,
                    ProjectId = req.ProjectId,
                    Title = req.Title,
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
            return "Proc_UpsertHospitalPolicy";
        }
    }
    public class Proc_GetHospitalPolicyListOrById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetHospitalPolicyListOrById(IDapper dapper)
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
                    Title = req.name,
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                    PageLength = req.PageLength
                };
                var i = await _dapper.GetAll<HospitalPolicy>(GetName(), param);
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
           return "Proc_GetHospitalPolicyListOrById";
        }
    }
    public class Proc_updateHospitalPoliciesStatus : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_updateHospitalPoliciesStatus(IDapper dapper)
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
                    Status = req.Status,
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
            return "Proc_updateHospitalPoliciesStatus";
        }
    }

}
