﻿using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

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
                    PatientID = req.PatientID,
                    PatientName = req.PatientName,
                    PatientEmail = req.PatientEmail,
                    PatientPhone = req.PatientPhone,
                    Address = req.Address,
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
            throw new NotImplementedException();
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
            string name = (string)obj;
            try
            {
                var param = new
                {
                    PatientName = name,

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
            throw new NotImplementedException();
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
            throw new NotImplementedException();
        }
    }
}
