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
                    Title = req.Title,
                    Description = req.Description,
                    TypeId = req.TypeId,
                    LastUpdated = req.LastUpdated,
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
            throw new NotImplementedException();
        }
    }
    public class Proc_GetHospitalPolicies : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetHospitalPolicies(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string name = (string)obj;
            try
            {
                var param = new
                {
                    Title = name,

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
            throw new NotImplementedException();
        }
    }
    public class Proc_GetHospitalPoliciesById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetHospitalPoliciesById(IDapper dapper)
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
                    HosPolicyId = id,

                };
                var i = await _dapper.GetAsync<HospitalPolicy>(GetName(), param);
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
            throw new NotImplementedException();
        }
    }
    public class Proc_GetHospitalPoliciesByTypeId : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetHospitalPoliciesByTypeId(IDapper dapper)
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
                    TypeId = id,

                };
                var i = await _dapper.GetAsync<HospitalPolicy>(GetName(), param);
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
            throw new NotImplementedException();
        }
    }
}
