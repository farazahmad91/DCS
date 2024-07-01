using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;
using API.AppCode.Configuration;
using Microsoft.AspNetCore.Http.HttpResults;

namespace API.AppCode.DL
{
    public class Proc_AddPremiumServices : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddPremiumServices(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (PlanServices)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    ServiceID = req.ServiceID,
                    ServiceName = req.ServiceName,
                    Description = req.Description,
                    Price = req.Price,
                    Duration = req.Duration,
                    Availability = req.Availability,
                    Features = req.Features,
                    ServiceLevel = req.ServiceLevel,
                    ActivationDate =req.ActivationDate ,
                    ExpiryDate = req.ExpiryDate,
                    RenewalOption = req.RenewalOption,
                    Discounts =req.Discounts, 
                    CustomerSupportLevel = req.CustomerSupportLevel,
                    TermsAndConditions = req.TermsAndConditions,
                    UsageLimits = req.UsageLimits,
                    FeedbackRating =req.FeedbackRating, 
                    Popularity = req.Popularity,
                    EmailMarketing = req.EmailMarketing,
                    EmailVerificationService = req.EmailVerificationService,
                    ShowYourUserPassword=req.ShowYourUserPassword,
                    ReferralService=req.ReferralService,
                    BackUpService = req.BackUpService,
                    SmsNotificationService = req.SmsNotificationService,
                    UserAppointmentReminderService = req.UserAppointmentReminderService,
                    DoctorAvailabilityNotificationService = req.DoctorAvailabilityNotificationService,
                    MedicineStoreManagementService = req.MedicineStoreManagementService,
                    TwoFactorAuthenticationService=req.TwoFactorAuthenticationService,
                    IsLabManagmentService=req.IsLabManagmentService,
                    IsLowStorageMedicineNotification=req.IsLowStorageMedicineNotification,
                    IsAppointmentContactService=req.IsAppointmentContactService,
                    IsAppointmentFormService=req.IsAppointmentFormService,
                    IsAppointmentStatus=req.IsAppointmentStatus,
                    IsWhatsappMarketing=req.IsWhatsappMarketing,
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
            return "Proc_InsertOrUpdatePremiumService";
        }
    }

    public class Proc_GetPremiumServices : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPremiumServices(IDapper dapper)
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
                    ServiceName = name,

                };
                var i = await _dapper.GetAll<PlanServices>(GetName(), param);
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
            return "Proc_GetPremiumService";
        }
    }

    public class Proc_GetPremiumServicesById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetPremiumServicesById(IDapper dapper)
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
                    ServiceId = id,

                };
                var i = await _dapper.GetAsync<PlanServices>(GetName(), param);
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
            return "Proc_GetPremiumServiceById";
        }
    }
}
