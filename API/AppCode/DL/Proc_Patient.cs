using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;
using DCS.Models;

namespace API.AppCode.DL
{
    public class Proc_AddPatient : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddPatient(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (Patient)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    PId = req.PId,
                    AppointmentId=req.AppointmentId,
                    Name = req.Name,
                    DateOfBirth = req.DateOfBirth,
                    Gender = req.Gender,
                    Email = req.Email,
                    Phone = req.Phone,
                    PImage = req.PImage,
                    Address = req.Address,
                    MedicalHistory = req.MedicalHistory,
                    InsuranceInformation = req.InsuranceInformation,
                    EmergencyContactName = req.EmergencyContactName,
                    EmergencyContactPhone = req.EmergencyContactPhone,
                    PrimaryCarePhysicianName = req.PrimaryCarePhysicianName,
                    PrimaryCarePhysicianPhone = req.PrimaryCarePhysicianPhone,
                    Allergies = req.Allergies,
                    Medications = req.Medications,
                    BloodType = req.BloodType,
                    Height = req.Height,
                    Weight = req.Weight,
                    PreferredLanguage = req.PreferredLanguage,
                    Occupation = req.Occupation
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
            return "proc_InsertOrUpdatePatient";
        }
    }

    public class Proc_GetPatient : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPatient(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string email = (string)obj;
            try
            {
                var param = new
                {
                    Email = email,

                };
                var i = await _dapper.GetAll<Patient>(GetName(), param);
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
            return "Proc_GetPatients";
        }
    }

    public class Proc_GetPatientById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPatientById(IDapper dapper)
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
                    PatientId = id,

                };
                var i = await _dapper.GetAsync<Patient>(GetName(), param);
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
            return "Proc_GetPatientsById";
        }
    }
}
