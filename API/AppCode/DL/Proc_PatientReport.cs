using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_AddPatientReport : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddPatientReport(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (PatientReport)obj;
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
                    ServiceId = req.ServiceId,
                    DrId = req.DrId,
                    HospitalId = req.HospitalId,
                    Diagnosis = req.Diagnosis,
                    PrescribeMedicine = req.PrescribeMedicine,
                    MedicineTiming = req.MedicineTiming,
                    NextAppointmentDate = req.NextAppointmentDate,
                    Cost = req.Cost,
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
            return "proc_InsertOrUpdateDoctor";
        }
    }

    public class Proc_GetPatientReport : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPatientReport(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string EntryOn = (string)obj;
            try
            {
                var param = new
                {
                    EntryOn = EntryOn,

                };
                var i = await _dapper.GetAll<PatientReport>(GetName(), param);
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

    public class Proc_GetPatientReportById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPatientReportById(IDapper dapper)
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
                    PId = id,

                };
                var i = await _dapper.GetAsync<PatientReport>(GetName(), param);
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
