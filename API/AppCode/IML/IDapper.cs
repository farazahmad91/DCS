using Dapper;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;

namespace API.AppCode.IML
{
    public interface IDapper
    {
        public Task<int> Insert(object entity, string storedProcedure);
        public int Delete(object id, string query);
        public T GetById<T>(object id, string query);
        public Task<IEnumerable<T>>  GetAll<T>(string query);
        public Task<IEnumerable<T>> GetAll<T>(string query, object parms, CommandType commandType = CommandType.StoredProcedure);
        public int Update(object entity, string storedProcedure);
        public Task<T> GetAsync<T>(string sp, object parms = null, CommandType commandType = CommandType.StoredProcedure);
    }
}
