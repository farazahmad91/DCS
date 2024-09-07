using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_AddBanner:IProcedureAsync  
    {
        private readonly IDapper _dapper;
        public Proc_AddBanner(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (BannerImage)obj;
            var res = new Response()
            {
                ResponseText = "Somthing wrong!!",
                StatusCode = ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    Id = req.Id,
                    ProjectId=req.ProjectId,
                    Name = req.Name,
                    Type = req.Type,
                    Image = req.Image,
                };
                var i = await _dapper.GetAsync<Response>(GetName(), param);
                res = i;
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
            return "Proc_AddOrUpdateBanner";
        }
    }

    public class Proc_GetBanner : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetBanner(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            string name = (string)obj;
            try
            {
                var param = new
                {
                    Name = name,

                };
                var i = await _dapper.GetAll<BannerImage>(GetName(), param);
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
            return "Proc_GetBanner";
        }
    }

    public class Proc_GetBannerById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetBannerById(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            int id = (int)obj;
            try
            {
                var param = new
                {
                    Id = id,

                };
                var i = await _dapper.GetAsync<BannerImage>(GetName(), param);
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
            return "Proc_GetBannerById";
        }

    }


    public class Proc_BannerModifyStatus : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_BannerModifyStatus(IDapper dapper)
        {
            _dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            int id = (int)obj;
            try
            {
                var param = new
                {
                    Id = id,

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
            return "Proc_BannerModifyStatus";
        }

    }
}

