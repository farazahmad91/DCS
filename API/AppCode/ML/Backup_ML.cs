using API.AppCode.IML;
using API.Data;
using Entities.Response;
using Microsoft.AspNetCore.Hosting;

namespace API.AppCode.ML
{
	public class Backup_ML: IBackup
    {
        private readonly IWebHostEnvironment _webHostEnvironment;
        private readonly IDapper _dapper;
        public Backup_ML(IDapper dapper, IWebHostEnvironment webHostEnvironment)
        {
            this._dapper = dapper;
            this._webHostEnvironment = webHostEnvironment;
        }
        public async Task<Response> GetBackUpDataBase()
        {
            Response response = new Response()
            {
                ResponseText = "",
                StatusCode = ResponseStatus.FAILED
            };

            try
            {
                // Define the network path for the backup location
                string backupLocation = @"\\DESKTOP-0TJ02PJ\\MSSQLSERVER03\BackupFolder";

                // Create the full backup file name
                string backupFileName = Path.Combine(backupLocation, DateTime.Now.ToString("ddMMyyyy_HHmmss") + ".Bak");

                // Log the path for debugging
                Console.WriteLine("Backup File Path: " + backupFileName); // Or use a logger

                // Name of the stored procedure
                string sp = "Proc_GetBackupAsync";

                // Execute the stored procedure asynchronously
                response = await _dapper.GetAsync<Response>(sp, new { Location = backupFileName });

                if (response.StatusCode == ResponseStatus.SUCCESS)
                {
                    response.ResponseText = "Backup of Database has been completed successfully.";
                }
            }
            catch (Exception ex)
            {
                response.ResponseText = "An error occurred while creating a backup of the database. Error: " + ex.Message;
            }

            return response;
        }




    }
}
