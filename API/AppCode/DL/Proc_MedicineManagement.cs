using API.AppCode.IML;
using API.AppCode.ML;
using Entities;
using Entities.Response;
using Microsoft.AspNetCore.Http.HttpResults;

namespace API.AppCode.DL
{
    public class Proc_AddOrUpdateMedicines : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddOrUpdateMedicines(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var medicines = (Medicines)obj;
            Response res = new Response();
            try
            {
                var param = new
                {
                    MedicineID = medicines.MedicineID,
                    Name = medicines.Name,
                    Description = medicines.Description,
                    Manufacturer = medicines.Manufacturer,
                    Price = medicines.Price,
                    MedTypeID = medicines.MedTypeID,
                    ExpiryDate = medicines.ExpiryDate,
                    Quantity = medicines.Quantity,
                };
                res = await _dapper.GetAsync<Response>(GetName(), param);
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
            return "Proc_UpsertMedicineAndStock";
        }
    }
    public class Proc_GetMedicinesById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetMedicinesById(IDapper dapper)
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
                    MedicineID = id,
                };
              var  res = await _dapper.GetAsync<Medicines>(GetName(), param);
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
                return "something went wrong!!";
            }
            throw new NotImplementedException();
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetMedicineById";
        }
    }
    public class Proc_GetMedicines : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetMedicines(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string name = (string)obj;
            IEnumerable<Medicines> med = new List<Medicines>();
            try
            {
                var param = new
                {
                    Name = name,
                };
                var i = await _dapper.GetAll<Medicines>(GetName(), param);
                med=i;
                return med;
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
            return "something went wrong!!";
        }

        public async Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetMedicines";
        }
    }
    public class Proc_GetMedicinesQty : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetMedicinesQty(IDapper dapper)
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
                var i = await _dapper.GetAsync<Medicines>(GetName(), param);
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
            return "something went wrong!!";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetMedQuantityByName";
        }
    }
}
