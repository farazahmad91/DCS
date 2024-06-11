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
                    IsBulkEmail = setting.IsBulkEmail,
                    IsShowPassword = setting.IsShowPassword,
                    IsMultipleMobileAllowed = setting.IsMultipleMobileAllowed,
                    ProjectID = setting.ProjectID,
                    IsPasswordOnly = setting.IsPasswordOnly,
                    IsDefaultOTPDisabled = setting.IsDefaultOTPDisabled,
                    IsShowPartner = setting.IsShowPartner,
                    IsReferral = setting.IsReferral,
                    IsPaymentGateway = setting.IsPaymentGateway,
                    IsMultipleVendorAllowed = setting.IsMultipleVendorAllowed,
                    IsTwoFactorAuthenticationEnabled = setting.IsTwoFactorAuthenticationEnabled,
                    IsDataEncryptionEnabled = setting.IsDataEncryptionEnabled,
                    MaxLoginAttempts = setting.MaxLoginAttempts,
                    PasswordExpiryDays = setting.PasswordExpiryDays,
                    IsUserActivityLoggingEnabled = setting.IsUserActivityLoggingEnabled,
                    IsDarkModeEnabled = setting.IsDarkModeEnabled,
                    IsAutoUpdateEnabled = setting.IsAutoUpdateEnabled,
                    IsSmsNotificationEnabled = setting.IsSmsNotificationEnabled,
                    SessionTimeoutMinutes = setting.SessionTimeoutMinutes,
                    IsEmergencyAlertEnabled = setting.IsEmergencyAlertEnabled,
                    IsPatientRecordEncryptionEnabled = setting.IsPatientRecordEncryptionEnabled,
                    IsAppointmentReminderEnabled = setting.IsAppointmentReminderEnabled,
                    IsDoctorAvailabilityNotificationEnabled = setting.IsDoctorAvailabilityNotificationEnabled,
                    MaxPatientRecordsView = setting.MaxPatientRecordsView,
                    IsLabResultsNotificationEnabled = setting.IsLabResultsNotificationEnabled,
                    IsInsuranceVerificationRequired = setting.IsInsuranceVerificationRequired,
                    IsTelemedicineEnabled = setting.IsTelemedicineEnabled,
                    IsBillingNotificationEnabled = setting.IsBillingNotificationEnabled,
                    IsPrescriptionRefillReminderEnabled = setting.IsPrescriptionRefillReminderEnabled,
                    IsPatient = setting.IsPatient,
                    IsDoctor = setting.IsDoctor,
                    SuperAdmin = setting.SuperAdmin,
                    IsAdmin = setting.IsAdmin
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
            throw new NotImplementedException();
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
}
