using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;


namespace API.AppCode.DL
{
 
    public class Proc_AddHospitalServices : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddHospitalServices(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (HospitalServices)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    ServiceID = req.ServiceID,
                    ProjectId = req.ProjectId,
                    ServiceName = req.ServiceName,
                    Description = req.Description,
                    Price = req.Price,

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
            return "Proc_UpsertHospitalService";
        }
    }

    public class Proc_GetHospitalServicesListOrById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetHospitalServicesListOrById(IDapper dapper)
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
                    ServiceName = req.name,
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                    PageLength = req.PageLength
                };
                var i = await _dapper.GetAll<HospitalServices>(GetName(), param);
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
            return "Proc_GetHospitalServicesListOrById";
        }
    }

    public class Proc_UpdateHospitalServiceStatus : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_UpdateHospitalServiceStatus(IDapper dapper)
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
            return "Proc_UpdateHospitalServiceStatus";
        }
    }
}
