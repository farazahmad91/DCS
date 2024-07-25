using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_AddOrUpdateEmployee : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddOrUpdateEmployee(IDapper dapper)
        {
            this._dapper = dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (HospitalEmployee)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED,
            };
            try
            {
                var param = new
                {
                    EmployeeId = req.EmployeeId,
                    ProjectId = req.ProjectId,
                    Name = req.Name,
                    Email = req.Email,
                    ContactNumber = req.ContactNumber,
                    ProfileImage = req.ProfileImage,
                    Address = req.Address,
                    Specialization = req.Specialization,
                    Gender = req.Gender,
                    DateOfBirth = req.DateOfBirth,
                    DateOfJoining = req.DateOfJoining,
                    Qualifications = req.Qualifications,
                    ExperienceYears = req.ExperienceYears,
                    Department = req.Department,
                    Position = req.Position,
                    Salary = req.Salary,
                    AdharNumber = req.AdharNumber,
                    AdharImage = req.AdharImage,
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
            return "Proc_AddOrUpdateHospitalEmployee";
        }
    }
    public class Proc_GetEmployeeListOrById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetEmployeeListOrById(IDapper dapper)
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
                    Id = req.Id,
                    email = req.name,
                    Role=req.Role,
                    ProjectId = req.ProjectId,
                    PageLength = req.PageLength
                };

                var i = await _dapper.GetAll<HospitalEmployee>(GetName(), param);
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
            return "Proc_GetHospitalEmployeeListOrById";
        }
    }

    public class Proc_UpdateHospitalEmployeeStatus : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_UpdateHospitalEmployeeStatus(IDapper dapper)
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
            return "Proc_UpdateHospitalEmployeeStatus";
        }
    }
}
