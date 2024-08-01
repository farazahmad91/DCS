using API.AppCode.IML;
using API.AppCode.ML;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_GetDashboardStatus : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetDashboardStatus(IDapper dapper)
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
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                };

                var i = await _dapper.GetAsync<DashboardStatus>(GetName(), param);
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
            return "Proc_DashboardStatus";
        }
    }

    public class Proc_GetApointmentForDonutChart : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetApointmentForDonutChart(IDapper dapper)
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
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                };

                var i = await _dapper.GetAll<ApointmentDonutChart>(GetName(), param);
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
            return "Proc_GetApointmentForDonutChart";
        }
    }

    public class GetAppointmentDetailNextSevenDay : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public GetAppointmentDetailNextSevenDay(IDapper dapper)
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
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                };

                var i = await _dapper.GetAll<AppointmentDetailNextSevenDay>(GetName(), param);
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
            return "Proc_GetAppointmentDetailNextSevenDay";
        }
    }

    public class Proc_GetTopHospitalService : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetTopHospitalService(IDapper dapper)
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
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                };

                var i = await _dapper.GetAll<TopHospitalService>(GetName(), param);
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
            return "Proc_GetTopHospitalService";
        }
    }

    public class Proc_GetAppointmentDetailNextSevenDay : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetAppointmentDetailNextSevenDay(IDapper dapper)
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
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                };

                var i = await _dapper.GetAll<AppointmentDetailNextSevenDay>(GetName(), param);
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
            return "Proc_GetAppointmentDetailNextSevenDay";
        }
    }

    public class Proc_GetTopAddressOfUser : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetTopAddressOfUser(IDapper dapper)
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
                    Role = req.Role,
                    ProjectId = req.ProjectId,
                };

                var i = await _dapper.GetAll<TopAddressOfUser>(GetName(), param);
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
            return "Proc_GetTopAddressOfUser";
        }
    }
}
