using API.AppCode.IML;
using API.AppCode.ML;
using Entities;
using Entities.Response;

namespace API.AppCode.DL
{
    public class Proc_UpdateApplicationSetting : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_UpdateApplicationSetting(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
			//ApplicationSetting application = new ApplicationSetting();
			var setting = (ApplicationSetting)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
                var param = new
                {
                    IsSocialAlert = setting.IsSocialAlert,
                    IsEmailVerificationRequired = setting.IsEmailVerificationRequired,
					IsEmailMarketing = setting.IsEmailMarketing,
                    IsShowPassword = setting.IsShowPassword,
                    IsMultipleMobileAllowed = setting.IsMultipleMobileAllowed,
                    ProjectID = setting.ProjectID,
					IsBackUpService = setting.IsBackUpService,
					IsPasswordOnly = setting.IsPasswordOnly,
                    IsReferral = setting.IsReferral,
                    IsPaymentGateway = setting.IsPaymentGateway,
                    IsTwoFactorAuthenticationEnabled = setting.IsTwoFactorAuthenticationEnabled,
                    MaxLoginAttempts = setting.MaxLoginAttempts,
                    IsDarkModeEnabled = setting.IsDarkModeEnabled,
                    IsSmsNotificationEnabled = setting.IsSmsNotificationEnabled,
                    IsAppointmentReminderEnabled = setting.IsAppointmentReminderEnabled,
                    IsDoctorAvailabilityNotificationEnabled = setting.IsDoctorAvailabilityNotificationEnabled,
                    IsLabResultsNotificationEnabled = setting.IsLabResultsNotificationEnabled,
					IsMSServiceEnabled = setting.IsMSServiceEnabled,
                    IsBillingNotificationEnabled = setting.IsBillingNotificationEnabled,
                    IsPrescriptionRefillReminderEnabled = setting.IsPrescriptionRefillReminderEnabled,
                    IsPatient = setting.IsPatient,
                    IsDoctor = setting.IsDoctor,
                    SuperAdmin = setting.SuperAdmin,
                    IsAdmin = setting.IsAdmin,
                    IsLabManagmentService = setting.IsLabManagmentService,
                    IsLowStorageMedicineNotification = setting.IsLowStorageMedicineNotification,
                    IsAppointmentContactService = setting.IsAppointmentContactService,
                    IsAppointmentFormService = setting.IsAppointmentFormService,
                    IsAppointmentStatus = setting.IsAppointmentStatus,
                    IsWhatsappMarketing = setting.IsWhatsappMarketing,
                };
                res= await _dapper.GetAsync<Response>(GetName(), param);
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
            return "UpdateApplicationSetting";
        }
    }

    public class Proc_GetApplicationSettingById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetApplicationSettingById(IDapper dapper)
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
                    ProjectId = id,

                };
                var i = await _dapper.GetAsync<ApplicationSetting>(GetName(), param);
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
            return "Proc_GetApplicationSettingById";
        }
    }

	public class Proc_GetApplicationSetting : IProcedureAsync
	{
		private readonly IDapper _dapper;
		public Proc_GetApplicationSetting(IDapper dapper)
		{
			_dapper=dapper;
		}
		public async Task<object> Call(object obj)
		{
			int Id = (int)obj;
			try
			{
				var param = new
				{
					Projectid = Id,

				};
				var i = await _dapper.GetAll<ApplicationSetting>(GetName(), param);
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
			return "Proc_GetApplicationSetting";
		}
	}


    public class Proc_GetApplicationSettingByIdOnload : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetApplicationSettingByIdOnload(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string email = (string)obj;
            var id = await _dapper.GetAsync<Response>("Proc_GetApplicationSettingByIdOnload", new {Email= email });
            try
            {
                var param = new
                {
                    ProjectId = id.ProjectId,

                };
                var i = await _dapper.GetAsync<ApplicationSetting>(GetName(), param);
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
            return "Proc_GetApplicationSettingById";
        }
    }
}
