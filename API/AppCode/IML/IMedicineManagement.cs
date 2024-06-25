using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IMedicineManagement
    {
        public Task<Response> AddOrUpdateMedicines(Medicines medicine);
        public Task<IEnumerable<Medicines>> GetMedicines(string? name);
        public Task<Medicines> GetMedicinesById(int id);
        public Task<Medicines> GetMedicinesQtyByName(string? name);
    }
}
