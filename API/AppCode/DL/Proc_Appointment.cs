﻿using API.AppCode.IML;
using Entities;
using DCS.Models;
using API.AppCode.ML;
using API.Service;
using Microsoft.AspNetCore.Identity;
using API.DBContext;
using Entities.Response;
using System.Text;
using System.Security.Cryptography;

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
                    ServiceId = req.ServiceId,
                    PId=req.PId,
                    Date = req.Date,
                    Time = req.Time,
                    Notes = req.Notes,
                    Status = req.Status,
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
            string Date = (string)obj;
            try
            {
                var param = new
                {
                    Date = Date,

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
            return "Proc_GetAppointmentIdById";
        }
    }
}
