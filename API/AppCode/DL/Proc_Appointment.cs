using API.AppCode.IML;
using Entities;
using DCS.Models;
using API.AppCode.ML;
using API.Service;
using Microsoft.AspNetCore.Identity;
using API.DBContext;
using Entities.Response;
using System.Text;

namespace API.AppCode.DL
{
    public class Proc_Appointment : IProcedureAsync
    {   private readonly IDapper _dapper;
        private readonly IUserService _User;
        private readonly UserManager<ApplicationUser> userManager;
        private static Random random = new Random();
        private static string specialCharacters = "!@#$%^&*()_+-=[]{}|;:,.<>?";
        public Proc_Appointment(IDapper dapper, IUserService User , UserManager<ApplicationUser> userManager)
        {
             this._dapper = dapper;
            this._User = User;
            this.userManager = userManager;
        }

        public async Task<object> Call(object obj)
        {
            var appointment = (Appointment)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    PatientName = appointment.PatientName,
                    PatientEmail = appointment.PatientEmail,
                    PatientPhone = appointment.PatientPhone,
                    Address=appointment.Address,
                    AppointmentDate = appointment.AppointmentDate,
                    AppointTime = appointment.AppointTime,
                    Status = appointment.Status,
                };

                var i = await _dapper.GetAsync<Response>(GetName(), param);
              
                res=i;
                if (res.StatusCode==ResponseStatus.SUCCESS)
                {
                    var userexists = await _dapper.GetAsync<Response>("Proc_FindUser",new {Email= appointment.PatientEmail});
                    if (userexists.StatusCode==ResponseStatus.SUCCESS)
                    {
                        string password = GeneratePassword();
                        var registerViewModel = new API.DBContext.Entities.RegisterViewModel
                        {
                            Name = appointment.PatientName,
                            Email = appointment.PatientEmail,
                            PhoneNo = appointment.PatientPhone,
                            Password = password,
                            ConfirmPassword = password,
                            Role = "Patient"
                        };
                        await _User.RegisterAsync(registerViewModel);
                    }
                   
                }
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

        public static string GeneratePassword(int minLength = 8)
        {
            if (minLength < 8)
            {
                throw new ArgumentException("Password length must be at least 8 characters.");
            }

            StringBuilder password = new StringBuilder();
            password.Append((char)random.Next('A', 'Z' + 1));
            bool specialCharAdded = false;
            for (int i = 1; i < minLength; i++)
            {
                if (i == minLength - 1 && !specialCharAdded)
                {
                    password.Append(specialCharacters[random.Next(specialCharacters.Length)]);
                    specialCharAdded = true;
                }
                else
                {
                    int charType = random.Next(4);
                    switch (charType)
                    {
                        case 0:
                            password.Append((char)random.Next('a', 'z' + 1));
                            break;
                        case 1:
                            password.Append((char)random.Next('0', '9' + 1));
                            break;
                        case 2:
                            password.Append((char)random.Next('A', 'Z' + 1));
                            break;
                        case 3:
                            password.Append(specialCharacters[random.Next(specialCharacters.Length)]);
                            specialCharAdded = true;
                            break;
                    }
                }
            }
            return new string(password.ToString().OrderBy(c => random.Next()).ToArray());
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_InsertPatientAndAppointment";
        }
    }
}
