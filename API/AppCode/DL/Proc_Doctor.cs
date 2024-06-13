using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.BlazorIdentity.Pages.Manage;

namespace API.AppCode.DL
{
    public class Proc_AddDoctor : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddDoctor(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (Doctor)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    DrId = req.DrId,
                    Name = req.Name,
                    Email = req.Email,
                    Phone = req.Phone,
                    DrImage = req.DrImage,
                    Address = req.Address,
                    Specialization = req.Specialization,
                    Gender = req.Gender,
                    DateOfBirth = req.DateOfBirth,
                    Qualifications = req.Qualifications,
                    ExperienceYears = req.ExperienceYears,
                    Affiliations = req.Affiliations,
                    Languages = req.Languages,
                    ConsultationFee = req.ConsultationFee,
                    Availability = req.Availability,
                    Status=req.Status,
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
            }
            return res;
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "proc_InsertOrUpdateDoctor";
        }
    }

    public class Proc_GetDoctor : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetDoctor(IDapper dapper)
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
                    Name = name,

                };
                var i = await _dapper.GetAll<Doctor>(GetName(), param);
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetDoctors";
        }
    }

    public class Proc_GetDoctorById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetDoctorById(IDapper dapper)
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
                    DrId = id,

                };
                var i = await _dapper.GetAsync<Doctor>(GetName(), param);
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
                var _ = new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetDoctorsById";
        }
    }
}
