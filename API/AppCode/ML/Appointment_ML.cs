using API.AppCode.DL;
using API.AppCode.IML;
using API.AppCode.IService;
using API.DBContext;
using API.Service;
using DCS.Models;
using Entities.Response;
using Microsoft.AspNetCore.Identity;

namespace API.AppCode.ML
{
    public class Appointment_ML : IAppointment
    {
        private readonly IDapper _dapper;
        private readonly IUserService _User;
        private readonly UserManager<ApplicationUser> userManager;
        public Appointment_ML(IDapper dapper, IUserService User, UserManager<ApplicationUser> userManager)
        {
            this._dapper = dapper;
            this._User = User;
            this.userManager = userManager;
        }
        public async Task<Response> AddOrUpdateAppointment(Appointment req)
        {
            IProcedureAsync proc = new Proc_Appointment(_dapper, _User, userManager);
            var i= await  proc.Call(req);
            return (Response)i;
        }

        public IEnumerable<Appointment> GetAppointment()
        {
            throw new NotImplementedException();
        }

        public Appointment GetAppointment(int id)
        {
            throw new NotImplementedException();
        }

        public int DeleteAppointment(int id)
        {
            throw new NotImplementedException();
        }
    }
}
