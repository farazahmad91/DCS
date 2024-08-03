﻿using API.AppCode.IML;
using Entities;
using API.AppCode.ML;
using Entities.Response;
using Microsoft.CodeAnalysis;
using System.Security.AccessControl;

namespace API.AppCode.DL
{
    public class Proc_Appointment : IProcedureAsync
    {   private readonly IDapper _dapper;
        public Proc_Appointment(IDapper dapper)
        {
             this._dapper = dapper;
        }

        public async Task<object> Call(object obj)
        {
            var req = (Appointment)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED,
                AppointmentId=0
            };
            try
            {
                var param = new
                {
                    DrId = req.DrId,
                    ProjectId=req.ProjectId,
                    Name=req.Name,
                    Email = req.Email,
                    PhoneNo = req.PhoneNo,
                    ServiceId = req.ServiceId,
                    PId=req.PId,
                    Date = req.Date,
                    Notes = req.Notes,
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
            return "Proc_UpsertAppointment";
        }
    }
    public class Proc_GetAppointment : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetAppointment(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            
            var common = (Common)obj;
            try
            {
                var param = new
                {
                    Date = common.Date,
                    Id= common.Id,
                    ProjectId = common.ProjectId,
                    PageLength=common.PageLength,

                };
                var i = await _dapper.GetAll<Appointment>(GetName(), param);
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
            return "Proc_GetAppointments";
        }
    }
    public class Proc_GetAppointmentByPId : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetAppointmentByPId(IDapper dapper)
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
                    AppointmentId = id,

                };
                var i = await _dapper.GetAsync<Appointment>(GetName(), param);
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
            return "Proc_GetAppointmentIdById";
        }
    }
    public class Proc_GetAppointmentStatusByUser : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetAppointmentStatusByUser(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        { int PId = 0;
            string email = (string)obj;
            var i = await _dapper.GetAsync<Response>("Proc_GetPatientId", new {Email = email });
            i.PatientId =PId;
            try
            {
                var param = new
                {
                    PId = PId,

                };
                var j = await _dapper.GetAll<Appointment>(GetName(), param);
                return j;
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
            return "Proc_GetAppointmentStatusByPId";
        }
    }
    public class Proc_GetAppointmentStatus : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetAppointmentStatus(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call()
        {
            try
            {
                var i = await _dapper.GetAll<Appointment>(GetName());
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

        public Task<object> Call(object obj)
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetAppointmentStatus";
        }
    }
}
