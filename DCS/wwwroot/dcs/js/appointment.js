        
        
CREATE PROCEDURE Proc_ManagePurchase
@PurchaseID INT = NULL,
    @ProjectID INT,
        @UserEmail VARCHAR(255),
            @ServiceID INT,
                @ActivationDate DATETIME,
                    @ExpiryDate DATETIME,
                        @Price DECIMAL(10, 2),
                            @Discount DECIMAL(10, 2),
                                @FinalPrice DECIMAL(10, 2),
                                    @RenewalOption BIT
AS
BEGIN
Declare
@EmailMarketing bit,
    @EmailVerificationService bit,
        @ShowYourUserPassword bit,
            @ReferralService bit,
                @BackUpService bit,
                    @SmsNotificationService bit,
                        @IsDarkModeEnabled bit,
                            @UserAppointmentReminderService bit,
                                @DoctorAvailabilityNotificationService bit,
                                    @MedicineStoreManagementService bit,
                                        @TwoFactorAuthenticationService bit,
                                            @IsMultipleMobileAllowed BIT,
                                                @IsBillingNotificationEnabled BIT,
                                                    @IsPrescriptionRefillReminderEnabled BIT,
                                                        @MaxLoginAttempts BIT,
                                                            @IsShowPassword BIT,
                                                                @IsSocialAlert BIT,
                                                                    @IsPasswordOnly BIT,
                                                                        @IsPatient BIT,
                                                                            @IsDoctor BIT,
                                                                                @SuperAdmin BIT,
                                                                                    @IsAdmin BIT,
                                                                                        @IsLabManagmentService BIT,
                                                                                            @IsLowStorageMedicineNotification BIT,
                                                                                                @IsAppointmentContactService BIT,
                                                                                                    @IsAppointmentFormService BIT,
                                                                                                        @IsAppointmentStatus BIT,
                                                                                                            @IsWhatsappMarketing BIT    
    SET NOCOUNT ON;        
            
    BEGIN TRY    
    IF Not EXISTS(SELECT 1 FROM Purchases WHERE PurchaseID = @PurchaseID)
BEGIN        
 SET @ExpiryDate = DATEADD(YEAR, @@ExpiryYear, GETDATE());
            INSERT INTO Purchases(UserEmail, ServiceID, ActivationDate, ExpiryDate, Price, Discount, FinalPrice, RenewalOption)
VALUES(@UserEmail, @ServiceID, @ActivationDate, @ExpiryDate, @Price, @Discount, @FinalPrice, @RenewalOption);       
      
      
   Select @EmailMarketing=EmailMarketing, @EmailVerificationService = EmailVerificationService, @ShowYourUserPassword = ShowYourUserPassword, @ReferralService = ReferralService,
    @BackUpService = BackUpService, @SmsNotificationService = SmsNotificationService, @UserAppointmentReminderService = UserAppointmentReminderService,
    @DoctorAvailabilityNotificationService = DoctorAvailabilityNotificationService, @MedicineStoreManagementService = MedicineStoreManagementService, @TwoFactorAuthenticationService = TwoFactorAuthenticationService,
    @IsMultipleMobileAllowed = IsMultipleMobileAllowed, @IsBillingNotificationEnabled = IsBillingNotificationEnabled, @IsPrescriptionRefillReminderEnabled = IsPrescriptionRefillReminderEnabled,
    @MaxLoginAttempts = MaxLoginAttempts,
    @IsShowPassword = IsShowPassword, @IsSocialAlert = IsSocialAlert, @IsPasswordOnly = IsPasswordOnly, @IsPatient = IsPatient, @IsDoctor = IsDoctor, @SuperAdmin = SuperAdmin, @IsAdmin = IsAdmin      
   From PremiumService Where ServiceID = @ServiceID;      
      
   Update ApplicationSetting Set  IsEmailVerificationRequired = @EmailVerificationService, IsEmailMarketing = @EmailMarketing, IsShowPassword = @ShowYourUserPassword, IsReferral = @ReferralService,
    IsBackUpService = @BackUpService, IsSmsNotificationEnabled = @SmsNotificationService, IsDarkModeEnabled = @IsDarkModeEnabled, IsAppointmentReminderEnabled = @UserAppointmentReminderService, IsDoctorAvailabilityNotificationEnabled = @DoctorAvailabilityNotificationSe
rvice,
    IsMSServiceEnabled = @MedicineStoreManagementService, IsTwoFactorAuthenticationEnabled = @TwoFactorAuthenticationService, IsMultipleMobileAllowed = @IsMultipleMobileAllowed,
    IsBillingNotificationEnabled = @IsBillingNotificationEnabled, IsPrescriptionRefillReminderEnabled = @IsPrescriptionRefillReminderEnabled, MaxLoginAttempts = @MaxLoginAttempts,
    IsSocialAlert = @IsSocialAlert, IsPasswordOnly = @IsPasswordOnly, IsPatient = @IsPatient, IsDoctor = @IsDoctor, SuperAdmin = @SuperAdmin, IsAdmin = @IsAdmin,
    IsLabManagmentService = @IsLabManagmentService, IsLowStorageMedicineNotification = @IsLowStorageMedicineNotification, IsAppointmentContactService = @IsAppointmentContactService,
    IsAppointmentFormService = @IsAppointmentFormService, IsAppointmentStatus = @IsAppointmentStatus, IsWhatsappMarketing = @IsWhatsappMarketing, Updatedate = GETDATE()   
   Where ProjectID = @ProjectID;      
      
            SELECT 1 AS StatusCode, 'Add Successful' AS ResponseText;
END
ELSE
BEGIN        
            UPDATE Purchases        
            SET UserEmail = @UserEmail,
    ServiceID = @ServiceID,
    ActivationDate = @ActivationDate,
    ExpiryDate = @ExpiryDate,
    Price = @Price,
    Discount = @Discount,
    FinalPrice = @FinalPrice,
    RenewalOption = @RenewalOption        
            WHERE PurchaseID = @PurchaseID;       
            SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
END        
    END TRY        
    BEGIN CATCH        
         SELECT 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;        
    END CATCH
END; 