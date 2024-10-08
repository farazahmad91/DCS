﻿using API.AppCode.IML;
using API.AppCode.Infrastructure;
using API.Connection;
using Dapper;
using Entities;
using System.Data;
using System.Data.Common;
using System.Data.SqlClient;
using static Dapper.SqlMapper;

namespace API.Data
{
    public class Dapper : IDapper
    {
        private readonly IConfiguration _config;
        private readonly string Constr;
        public Dapper(ConnectionStrings conn)
        {
            Constr = conn.Default;
        }

        public async Task<int> Insert(object entity, string storedProcedure)
        {
            using (var connection = new SqlConnection(Constr))
            {
                connection.Open();
                return await connection.ExecuteAsync(storedProcedure, entity);
            }
        }

        public int Delete(object id, string query)
        {
            using (var connection = new SqlConnection(Constr))
            {
                connection.Open();
                return connection.Execute(query, id);
            }
        }

        public async Task<T> GetAsync<T>(string sp, object parms = null, CommandType commandType = CommandType.StoredProcedure)
        {
            T result;

            try
            {
                using (IDbConnection db = new SqlConnection(Constr))
                {
                    var response = await db.QueryAsync<T>(sp, parms, commandType: commandType);
                    result = response.FirstOrDefault();
                }
            }
  //"responseText": "An error occurred while creating a backup of the database. Error: Invalid object name 'xp_fileexist'.",
            catch (Exception ex)
            {
                throw ex;
            }
            return result;
        }
        public T GetById<T>(object id, string query)
        {
            using (var connection = new SqlConnection(Constr))
            {
                connection.Open();
                return connection.QueryFirstOrDefault<T>(query, id);
            }
        }
        public async Task<IEnumerable<T>> GetAll<T>(string query, object parms, CommandType commandType = CommandType.StoredProcedure)
        {
            using (var connection = new SqlConnection(Constr))
            {
              await  connection.OpenAsync();
                return await connection.QueryAsync<T>(query, parms, commandType: commandType);
            }
        }

        public async Task<IEnumerable<T>> GetAll<T>(string query)
        {
            using (var connection = new SqlConnection(Constr))
            {
                await connection.OpenAsync();
                return await connection.QueryAsync<T>(query);
            }
        }


        public int Update(object entity, string storedProcedure)
        {
            using (var connection = new SqlConnection(Constr))
            {
                connection.Open();
                return connection.Execute(storedProcedure, entity);
            }
        }
    }

}
