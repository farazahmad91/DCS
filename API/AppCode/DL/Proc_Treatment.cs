using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;
using System.Data;
using static System.Runtime.InteropServices.JavaScript.JSType;
using System.Security.AccessControl;

namespace API.AppCode.DL
{

    public class Proc_AddTreatment : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddTreatment(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            var treatment = (Treatment)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var j = await _dapper.GetAsync<Patient>("proc_GetPatientIdByEmail", new {Email  = treatment .Email});
                if (j.PId==0)
                {
                    res.ResponseText="email not register please add email or provide register email id";
                    res.StatusCode = ResponseStatus.FAILED;
                    return res;
                }
                var param = new
                {
                    PatientId = j.PId,
                    ProjectId=treatment.ProjectId,
                    DoctorId = treatment.DrId,
                    Diagnosis = treatment.Diagnosis,
                    Description = treatment.Description,
                    Medications = ConvertToDataTable(treatment.Medications),
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

        public DataTable ConvertToDataTable(List<Entities.Medication> medication)
        {
            var dataTable = new DataTable();

            dataTable.Columns.Add("Name", typeof(string));
            dataTable.Columns.Add("Dosage", typeof(string));
            dataTable.Columns.Add("Frequency", typeof(string));
            dataTable.Columns.Add("FollowUpDate", typeof(string));

            foreach (var item in medication)
            {
                dataTable.Rows.Add(
                    item.Name,
                    item.Dosage,
                    item.Frequency,
                    item.FollowUpDate
                );
            }
            return dataTable;
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName() => "Proc_InsertTreatment";
    }

    public class Proc_UpdateTreatment : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_UpdateTreatment(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<object> Call(object obj)
        {
            var treatment = (Treatment)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    TreatmentId = treatment.TreatmentId,
                    PId = treatment.PId,
                    DrId = treatment.DrId,
                    Diagnosis = treatment.Diagnosis,
                    Description = treatment.Description,
                    Status = treatment.Status,
                    ModifiedBy = treatment.ModifiedBy,
                    Medications = ConvertToDataTable(treatment.Medications),
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

        public DataTable ConvertToDataTable(List<Entities.Medication> medication)
        {
            var dataTable = new DataTable();

            dataTable.Columns.Add("Name", typeof(string));
            dataTable.Columns.Add("Dosage", typeof(string));
            dataTable.Columns.Add("Frequency", typeof(double));
            dataTable.Columns.Add("FollowUpDate", typeof(string));

            foreach (var item in medication)
            {
                dataTable.Rows.Add(
                    item.Name,
                    item.Dosage,
                    item.Frequency,
                    item.FollowUpDate
                );
            }
            return dataTable;
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName() => "Proc_UpdateTreatment";
    }

    public class Proc_GetTreatmentListOrById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetTreatmentListOrById(IDapper dapper)
        {
            this._dapper = dapper;
        }
        
        public async Task<object> Call(object obj)
        {
            var common = (Common)obj;
            try
            {
                var param = new
                {
                    CreatedDate = common.Date,
                    Id= common.Id,
                    PageLength= common.PageLength,
                    ProjectId = common.ProjectId,
                    Role = common.Role,
                };
                var i = await _dapper.GetAll<Treatment>(GetName(),param);
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
            return "something went wrong";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetTreatmentList";
        }
    }

    public class Proc_GetTreatmentById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetTreatmentById(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<object> Call()
        {

            throw new NotImplementedException();
        }

        public async Task<object> Call(object obj)
        {
            int PId = (int)obj;
            TreatmentDetails treatmentdetails = new TreatmentDetails();
            IEnumerable<Medication> items = new List<Medication>();
            try
            {
                var TreatmentData = await _dapper.GetAll<Treatment>(GetName(), new { PId = PId, Case = 1 });
                items = await _dapper.GetAll<Medication>(GetName(), new { PId = PId, Case = 2 });
                treatmentdetails.treatment = TreatmentData;
                treatmentdetails.Medications = items.ToList();

                return treatmentdetails;
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
            return treatmentdetails;
        }

        public string GetName()
        {
            return "Proc_GetTreatmentById";
        }
    }

    public class Proc_GetMedicationListById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetMedicationListById(IDapper dapper)
        {
            this._dapper = dapper;
        }
        public async Task<object> Call()
        {

            throw new NotImplementedException();
        }

        public async Task<object> Call(object obj)
        {
            int Id = (int)obj;
            try
            {
                var items = await _dapper.GetAll<Medication>(GetName(), new { Id = Id });

                return items;
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
            return "something went wrong!";
        }

        public string GetName()
        {
            return "Proc_GetMedicationListById";
        }
    }
}
