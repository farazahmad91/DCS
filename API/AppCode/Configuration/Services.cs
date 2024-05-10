using API.AppCode.IML;
using API.AppCode.ML;
using Microsoft.Extensions.DependencyInjection.Extensions;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace API.AppCode.Configuration
{
    public static class Services
    {
        public static void AddService(this IServiceCollection service, IConfiguration configuration)
        {
            var connectionString = configuration.GetConnectionString("DBCon");
            var connectioConfig = new Infrastructure.ConnectionStrings
            {
                DBCon = connectionString,
            };
           
        }
    }
}
