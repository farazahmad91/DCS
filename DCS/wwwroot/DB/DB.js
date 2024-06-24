USE[master]
GO
/****** Object:  Database [DCS]    Script Date: 24-06-2024 18:37:46 ******/
CREATE DATABASE[DCS]

USE[DCS]
GO
/****** Object:  UserDefinedTableType [dbo].[InvoiceItemType]    Script Date: 24-06-2024 18:37:46 ******/
CREATE TYPE[dbo].[InvoiceItemType] AS TABLE(
    [Service][nvarchar](100) NULL,
    [Product][nvarchar](100) NULL,
    [Quantity][float] NULL,
    [Unit][nvarchar](50) NULL,
    [Price][float] NULL,
    [VAT][float] NULL,
    [Discount][float] NULL,
    [SingleDiscountAmount][float] NULL,
    [SubAmount][float] NULL,
    [NetAmount][float] NULL,
    [VATAmount][float] NULL,
    [TotalAmount][float] NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[MedicationType]    Script Date: 24-06-2024 18:37:46 ******/
CREATE TYPE[dbo].[MedicationType] AS TABLE(
    [Name][nvarchar](100) NULL,
    [Dosage][nvarchar](50) NULL,
    [Frequency][nvarchar](50) NULL,
    [FollowUpDate][nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TransactionDetailType]    Script Date: 24-06-2024 18:37:46 ******/
CREATE TYPE[dbo].[TransactionDetailType] AS TABLE(
    [InvoiceID][int] NULL,
    [Mode][nvarchar](50) NULL,
    [TransactionId][nvarchar](50) NULL,
    [IsPaid][bit] NULL,
    [DueDate][nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TransactionType]    Script Date: 24-06-2024 18:37:46 ******/
CREATE TYPE[dbo].[TransactionType] AS TABLE(
    [Mode][nvarchar](50) NULL,
    [TransactionId][nvarchar](50) NULL,
    [IsPaid][bit] NULL,
    [DueDate][nvarchar](50) NULL
)
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[__EFMigrationsHistory](
    [MigrationId][nvarchar](150) NOT NULL,
    [ProductVersion][nvarchar](32) NOT NULL,
    CONSTRAINT[PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED
    (
        [MigrationId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[ApplicationSetting]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[ApplicationSetting](
    [AppId][int] IDENTITY(1, 1) NOT NULL,
    [ProjectID][int] NULL,
    [IsSocialAlert][bit] NULL,
    [IsEmailVerificationRequired][bit] NULL,
    [IsEmailMarketing][bit] NULL,
    [IsShowPassword][bit] NULL,
    [IsMultipleMobileAllowed][bit] NULL,
    [IsPasswordOnly][bit] NULL,
    [IsReferral][bit] NULL,
    [IsBackUpService][bit] NULL,
    [IsPaymentGateway][bit] NULL,
    [IsMultipleVendorAllowed][bit] NULL,
    [IsTwoFactorAuthenticationEnabled][bit] NULL,
    [MaxLoginAttempts][int] NULL,
    [IsSmsNotificationEnabled][bit] NULL,
    [IsAppointmentReminderEnabled][bit] NULL,
    [IsDoctorAvailabilityNotificationEnabled][bit] NULL,
    [IsLabResultsNotificationEnabled][bit] NULL,
    [IsMSServiceEnabled][bit] NULL,
    [IsBillingNotificationEnabled][bit] NULL,
    [IsPrescriptionRefillReminderEnabled][bit] NULL,
    [IsPatient][bit] NULL,
    [IsDoctor][bit] NULL,
    [SuperAdmin][bit] NULL,
    [IsAdmin][bit] NULL,
    [EntryOn][datetime] NULL,
    [Updatedate][datetime] NULL,
    [IsLabManagmentService][bit] NULL,
    [IsLowStorageMedicineNotification][bit] NULL,
    [IsAppointmentContactService][bit] NULL,
    [IsAppointmentFormService][bit] NULL,
    [IsAppointmentStatus][bit] NULL,
    [IsWhatsappMarketing][bit] NULL,
    [IsDarkModeEnabled][bit] NULL,
    PRIMARY KEY CLUSTERED
    (
        [AppId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Appointments]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Appointments](
    [AppointmentId][int] IDENTITY(1000, 1) NOT NULL,
    [DrId][int] NULL,
    [PId][int] NULL,
    [ServiceId][int] NULL,
    [Date][date] NULL,
    [Time][nvarchar](10) NULL,
    [Status][int] NULL,
    [Notes][nvarchar](max) NULL,
    [CreatedOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [AppointmentId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetRoleClaims](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [RoleId][nvarchar](450) NOT NULL,
    [ClaimType][nvarchar](max) NULL,
    [ClaimValue][nvarchar](max) NULL,
    CONSTRAINT[PK_AspNetRoleClaims] PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetRoles](
    [Id][nvarchar](450) NOT NULL,
    [Name][nvarchar](256) NULL,
    [NormalizedName][nvarchar](256) NULL,
    [ConcurrencyStamp][nvarchar](max) NULL,
    CONSTRAINT[PK_AspNetRoles] PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetUserClaims](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [UserId][nvarchar](450) NOT NULL,
    [ClaimType][nvarchar](max) NULL,
    [ClaimValue][nvarchar](max) NULL,
    CONSTRAINT[PK_AspNetUserClaims] PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetUserLogins](
    [LoginProvider][nvarchar](450) NOT NULL,
    [ProviderKey][nvarchar](450) NOT NULL,
    [ProviderDisplayName][nvarchar](max) NULL,
    [UserId][nvarchar](450) NOT NULL,
    CONSTRAINT[PK_AspNetUserLogins] PRIMARY KEY CLUSTERED
    (
        [LoginProvider] ASC,
        [ProviderKey] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetUserRoles](
    [UserId][nvarchar](450) NOT NULL,
    [RoleId][nvarchar](450) NOT NULL,
    CONSTRAINT[PK_AspNetUserRoles] PRIMARY KEY CLUSTERED
    (
        [UserId] ASC,
        [RoleId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetUsers](
    [Id][nvarchar](450) NOT NULL,
    [Name][nvarchar](max) NOT NULL,
    [PhoneNo][nvarchar](max) NOT NULL,
    [UserName][nvarchar](256) NULL,
    [NormalizedUserName][nvarchar](256) NULL,
    [Email][nvarchar](256) NULL,
    [NormalizedEmail][nvarchar](256) NULL,
    [EmailConfirmed][bit] NOT NULL,
    [PasswordHash][nvarchar](max) NULL,
    [SecurityStamp][nvarchar](max) NULL,
    [ConcurrencyStamp][nvarchar](max) NULL,
    [PhoneNumber][nvarchar](max) NULL,
    [PhoneNumberConfirmed][bit] NOT NULL,
    [TwoFactorEnabled][bit] NOT NULL,
    [LockoutEnd][datetimeoffset](7) NULL,
    [LockoutEnabled][bit] NOT NULL,
    [AccessFailedCount][int] NOT NULL,
    CONSTRAINT[PK_AspNetUsers] PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetUserTokens](
    [UserId][nvarchar](450) NOT NULL,
    [LoginProvider][nvarchar](450) NOT NULL,
    [Name][nvarchar](450) NOT NULL,
    [Value][nvarchar](max) NULL,
    CONSTRAINT[PK_AspNetUserTokens] PRIMARY KEY CLUSTERED
    (
        [UserId] ASC,
        [LoginProvider] ASC,
        [Name] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Doctors]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Doctors](
    [DrId][int] IDENTITY(101, 1) NOT NULL,
    [Name][varchar](100) NULL,
    [Email][varchar](100) NULL,
    [Phone][varchar](20) NULL,
    [DrImage][varchar](200) NULL,
    [Address][varchar](200) NULL,
    [Specialization][varchar](100) NULL,
    [Gender][char](1) NULL,
    [DateOfBirth][varchar](200) NULL,
    [Qualifications][varchar](200) NULL,
    [ExperienceYears][int] NULL,
    [Affiliations][varchar](200) NULL,
    [Languages][varchar](200) NULL,
    [ConsultationFee][decimal](10, 2) NULL,
    [Availability][varchar](100) NULL,
    [Status][int] NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [DrId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[EmailLogs]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[EmailLogs](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [ToEmail][nvarchar](255) NULL,
    [Subject][nvarchar](255) NULL,
    [Body][nvarchar](max) NULL,
    [ErrorMessage][nvarchar](max) NULL,
    [SentStatus][bit] NULL,
    [Entryon][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[EmailTemplates]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[EmailTemplates](
    [TemplateID][int] IDENTITY(1, 1) NOT NULL,
    [TemplateName][varchar](255) NULL,
    [Subject][varchar](255) NULL,
    [Body][text] NULL,
    [CreatedAt][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [TemplateID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[ErrorLog]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[ErrorLog](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [ClassName][varchar](255) NULL,
    [FuncName][varchar](255) NULL,
    [ProcName][varchar](255) NULL,
    [Error][varchar](max) NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[FAQs]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[FAQs](
    [FAQID][int] IDENTITY(1, 1) NOT NULL,
    [Question][varchar](500) NULL,
    [Answer][varchar](500) NULL,
    [Status][int] NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [FAQID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Invoice]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Invoice](
    [InvoiceID][int] IDENTITY(1, 1) NOT NULL,
    [PatientName][nvarchar](100) NULL,
    [Email][nvarchar](100) NULL,
    [Phone][nvarchar](20) NULL,
    [Address][nvarchar](255) NULL,
    [Subtotal][float] NULL,
    [DiscountAmount][float] NULL,
    [TotalVAT][float] NULL,
    [TotalAmount][float] NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [InvoiceID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[InvoiceItem]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[InvoiceItem](
    [ID][int] IDENTITY(1, 1) NOT NULL,
    [InvoiceID][int] NULL,
    [Service][nvarchar](100) NULL,
    [Product][nvarchar](100) NULL,
    [Quantity][float] NULL,
    [Unit][nvarchar](50) NULL,
    [Price][float] NULL,
    [VAT][float] NULL,
    [Discount][float] NULL,
    [SingleDiscountAmount][float] NULL,
    [SubAmount][float] NULL,
    [NetAmount][float] NULL,
    [VATAmount][float] NULL,
    [TotalAmount][float] NULL,
    PRIMARY KEY CLUSTERED
    (
        [ID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[MedicalHistory]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[MedicalHistory](
    [MedicalHistoryID][int] IDENTITY(1, 1) NOT NULL,
    [PatientID][int] NULL,
    [MedicalCondition][varchar](255) NULL,
    [DiagnosisDate][date] NULL,
    [Notes][text] NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [MedicalHistoryID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Medication]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Medication](
    [MedicationId][int] IDENTITY(1, 1) NOT NULL,
    [TreatmentId][int] NULL,
    [Name][nvarchar](255) NULL,
    [Dosage][nvarchar](255) NULL,
    [Frequency][nvarchar](255) NULL,
    [FollowUpDate][nvarchar](255) NULL,
    PRIMARY KEY CLUSTERED
    (
        [MedicationId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Medicines]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Medicines](
    [MedicineID][int] IDENTITY(1, 1) NOT NULL,
    [Name][nvarchar](100) NOT NULL,
    [Description][nvarchar](255) NULL,
    [Manufacturer][nvarchar](100) NULL,
    [ExpiryDate][varchar](100) NULL,
    [CreatedAt][datetime] NULL,
    [Price][float] NULL,
    [MedTypeID][int] NULL,
    PRIMARY KEY CLUSTERED
    (
        [MedicineID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[MedicineStocks]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[MedicineStocks](
    [StockID][int] IDENTITY(1, 1) NOT NULL,
    [MedicineID][int] NULL,
    [Quantity][int] NULL,
    [UpdatedAt][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [StockID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[MedicinesType]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[MedicinesType](
    [MedTypeID][int] IDENTITY(1, 1) NOT NULL,
    [MedTypeName][varchar](100) NULL,
    PRIMARY KEY CLUSTERED
    (
        [MedTypeID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Patient_Services]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Patient_Services](
    [PatientID][int] NULL,
    [ServiceID][int] NULL,
    [EntryOn][datetime] NULL
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Patients]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Patients](
    [PId][int] IDENTITY(101, 1) NOT NULL,
    [Name][nvarchar](100) NOT NULL,
    [DateOfBirth][nvarchar](100) NULL,
    [Gender][nvarchar](10) NULL,
    [Email][nvarchar](100) NULL,
    [Phone][nvarchar](20) NULL,
    [PImage][nvarchar](200) NULL,
    [Address][nvarchar](200) NULL,
    [MedicalHistory][nvarchar](max) NULL,
    [InsuranceInformation][nvarchar](max) NULL,
    [EmergencyContactName][nvarchar](100) NULL,
    [EmergencyContactPhone][nvarchar](20) NULL,
    [PrimaryCarePhysicianName][nvarchar](100) NULL,
    [PrimaryCarePhysicianPhone][nvarchar](20) NULL,
    [Allergies][nvarchar](max) NULL,
    [Medications][nvarchar](max) NULL,
    [BloodType][nvarchar](10) NULL,
    [Height][int] NULL,
    [Weight][int] NULL,
    [PreferredLanguage][nvarchar](50) NULL,
    [Occupation][nvarchar](100) NULL,
    [Status][int] NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [PId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Payments](
    [PaymentID][int] IDENTITY(1, 1) NOT NULL,
    [AppointmentID][int] NULL,
    [Amount][decimal](10, 2) NULL,
    [PaymentDate][date] NULL,
    [PaymentMethod][varchar](50) NULL,
    [Status][int] NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [PaymentID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[PremiumService]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[PremiumService](
    [ServiceID][int] IDENTITY(101, 1) NOT NULL,
    [ServiceName][varchar](255) NULL,
    [Description][varchar](255) NULL,
    [Price][decimal](10, 2) NULL,
    [Duration][varchar](255) NULL,
    [Availability][bit] NULL,
    [Features][text] NULL,
    [ServiceLevel][varchar](50) NULL,
    [ActivationDate][datetime] NULL,
    [ExpiryDate][datetime] NULL,
    [RenewalOption][bit] NULL,
    [Discounts][decimal](10, 2) NULL,
    [CustomerSupportLevel][varchar](255) NULL,
    [TermsAndConditions][varchar](255) NULL,
    [UpdatedAt][varchar](255) NULL,
    [UsageLimits][int] NULL,
    [FeedbackRating][decimal](3, 2) NULL,
    [Popularity][int] NULL,
    [EmailMarketing][bit] NULL,
    [EmailVerificationService][bit] NULL,
    [ShowYourUserPassword][bit] NULL,
    [ReferralService][bit] NULL,
    [BackUpService][bit] NULL,
    [SmsNotificationService][bit] NULL,
    [EmergencyAlertService][bit] NULL,
    [UserAppointmentReminderService][bit] NULL,
    [DoctorAvailabilityNotificationService][bit] NULL,
    [MedicineStoreManagementService][bit] NULL,
    [TwoFactorAuthenticationService][bit] NULL,
    [IsMultipleMobileAllowed][bit] NULL,
    [IsDarkModeEnabled][bit] NULL,
    [IsBillingNotificationEnabled][bit] NULL,
    [IsPrescriptionRefillReminderEnabled][bit] NULL,
    [MaxLoginAttempts][bit] NULL,
    [IsShowPassword][bit] NULL,
    [IsSocialAlert][bit] NULL,
    [IsPasswordOnly][bit] NULL,
    [IsPatient][bit] NULL,
    [IsDoctor][bit] NULL,
    [SuperAdmin][bit] NULL,
    [IsAdmin][bit] NULL,
    [CreatedAt][datetime] NULL,
    [IsLabManagmentService][bit] NULL,
    [IsLowStorageMedicineNotification][bit] NULL,
    [IsAppointmentContactService][bit] NULL,
    [IsAppointmentFormService][bit] NULL,
    [IsAppointmentStatus][bit] NULL,
    [IsWhatsappMarketing][bit] NULL
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Projects](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
    [UserEmail][varchar](255) NULL,
    [ProjectName][varchar](255) NULL,
    [DomainName][varchar](255) NULL,
    [Validity][varchar](50) NULL,
    [IsLifeTime][bit] NULL,
    [Status][bit] NULL,
    [CreatedOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Purchases]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Purchases](
    [PurchaseID][int] IDENTITY(1101, 1) NOT NULL,
    [UserEmail][varchar](255) NULL,
    [ServiceID][int] NULL,
    [PurchaseDate][datetime] NULL,
    [ActivationDate][datetime] NULL,
    [ExpiryDate][datetime] NULL,
    [Price][decimal](10, 2) NULL,
    [Discount][decimal](10, 2) NULL,
    [FinalPrice][decimal](10, 2) NULL,
    [RenewalOption][bit] NULL,
    PRIMARY KEY CLUSTERED
    (
        [PurchaseID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Reviews]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Reviews](
    [ReviewID][int] IDENTITY(1, 1) NOT NULL,
    [PatientID][int] NULL,
    [DentistID][int] NULL,
    [Rating][decimal](2, 1) NULL,
    [ReviewText][varchar](250) NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [ReviewID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Services]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Services](
    [ServiceID][int] IDENTITY(1, 1) NOT NULL,
    [ServiceName][varchar](255) NULL,
    [Description][text] NULL,
    [Price][numeric](10, 2) NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [ServiceID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_PageErrorLog]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[tbl_PageErrorLog](
    [_ID][int] IDENTITY(1, 1) NOT NULL,
    [_ClsName][varchar](100) NULL,
    [_FnName][varchar](100) NULL,
    [_ProcName][varchar](100) NULL,
    [_UserID][int] NULL,
    [_Error][nvarchar](500) NULL,
    [_EntryDate][datetime] NULL
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_users]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[tbl_users](
    [userId][int] IDENTITY(1, 1) NOT NULL,
    [username][varchar](100) NULL,
    [PasswordHash][nvarchar](255) NULL,
    [EntryOn][datetime] NULL,
    [IsVerified][bit] NULL,
    [IsLocked][bit] NULL,
    [IsActive][bit] NULL,
    [InvalidLoginAttempts][int] NULL,
    PRIMARY KEY CLUSTERED
    (
        [userId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_Validate_Email]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[tbl_Validate_Email](
    [vID][int] IDENTITY(1, 1) NOT NULL,
    [vEmail][varchar](100) NULL,
    [vOTP][int] NULL,
    [vEntry][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [vID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionDetails]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[TransactionDetails](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [InvoiceID][int] NULL,
    [Mode][nvarchar](50) NULL,
    [TransactionId][nvarchar](50) NULL,
    [IsPaid][bit] NULL,
    [DueDate][nvarchar](50) NULL,
    [DueAmountPayDate][nvarchar](50) NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [Id] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Treatment]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Treatment](
    [TreatmentId][int] IDENTITY(1, 1) NOT NULL,
    [PId][int] NULL,
    [DrId][int] NULL,
    [Diagnosis][nvarchar](255) NULL,
    [TreatmentDate][datetime] NULL,
    [Description][nvarchar](max) NULL,
    [Status][nvarchar](50) NULL,
    [CreatedDate][datetime] NULL,
    [CreatedBy][nvarchar](255) NULL,
    [ModifiedDate][datetime] NULL,
    [ModifiedBy][nvarchar](255) NULL,
    PRIMARY KEY CLUSTERED
    (
        [TreatmentId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[UserLogins]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[UserLogins](
    [LoginID][int] IDENTITY(1, 1) NOT NULL,
    [UserEmail][nvarchar](255) NULL,
    [DeviceID][int] NULL,
    [IPAddress][nvarchar](45) NULL,
    [LoginStatus][int] NULL,
    [LoginTime][datetime] NULL,
    [LogOutTime][nvarchar](45) NULL,
    PRIMARY KEY CLUSTERED
    (
        [LoginID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[WorkingHours]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[WorkingHours](
    [WorkingHoursID][int] IDENTITY(1, 1) NOT NULL,
    [DentistID][int] NULL,
    [DayOfWeek][varchar](10) NULL,
    [StartTime][time](7) NULL,
    [EndTime][time](7) NULL,
    [EntryOn][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [WorkingHoursID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
INSERT[dbo].[__EFMigrationsHistory]([MigrationId], [ProductVersion]) VALUES(N'20240516050714_init', N'8.0.5')
GO
INSERT[dbo].[AspNetRoles]([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES(N'0ac53903-91aa-48d6-8486-911b83a32011', N'Admin', N'ADMIN', NULL)
GO
INSERT[dbo].[AspNetRoles]([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES(N'b367ed2c-3a08-462d-a6ca-12d9bd08a6cb', N'User', N'USER', NULL)
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'8f16e949-f04c-47b3-a934-a058b5980554', N'0ac53903-91aa-48d6-8486-911b83a32011')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'a66c24c8-9c1c-4639-b61c-635dd11e0158', N'0ac53903-91aa-48d6-8486-911b83a32011')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'e41ada2a-088e-48fa-8328-d0cc94b98ef6', N'0ac53903-91aa-48d6-8486-911b83a32011')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'7acd9f6b-234a-4928-b1b6-26bdef47600f', N'b367ed2c-3a08-462d-a6ca-12d9bd08a6cb')
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'7acd9f6b-234a-4928-b1b6-26bdef47600f', N'Faraz', N'99877', N'Farazshaikh08538@gmail.com', N'FARAZSHAIKH08538@GMAIL.COM', N'Farazshaikh08538@gmail.com', N'FARAZSHAIKH08538@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAENUcii3Jijj42ivWGn2H38TdyOv95BvLcjKhxjPcBekGr/koAtg4ySYcW04HFj8RVw==', N'XIPTBJHEEFFSTOKPUDIPSGCAPWULK4M6', N'3dd576b2-d1ae-4ce6-a04f-6c00359fe707', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'8f16e949-f04c-47b3-a934-a058b5980554', N'faraz', N'65645', N'faraz@gmail.com', N'FARAZ@GMAIL.COM', N'faraz@gmail.com', N'FARAZ@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEJ0fW5h76d4MkyHu2JS5UAAQ6tNu2OcKsN/b4PMGcY8MsfVrJZgtf9J0OEIWPKUd7Q==', N'P5EG7F7LNQEJFJZDASJM7LZ2J7AEDG46', N'525f4776-e3b7-402c-8d62-93909566a59a', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'a66c24c8-9c1c-4639-b61c-635dd11e0158', N'Faraz', N'78678', N'user@example.com', N'USER@EXAMPLE.COM', N'user@example.com', N'USER@EXAMPLE.COM', 1, N'AQAAAAIAAYagAAAAEGdmDogjoILD/LAyO7bZXNDznQ9igcnkM0iFT+RLJBNB8DX38Xx9Yygs7qbYQ4iGbg==', N'RPH52SNI6EKJD566CZFIZX2GKAEUTQTW', N'fd87cf6d-57d5-4119-8e2d-21d29a48ff15', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'e41ada2a-088e-48fa-8328-d0cc94b98ef6', N'faraz', N'65645', N'farazshaikh8960@gmail.com', N'FARAZSHAIKH8960@GMAIL.COM', N'farazshaikh8960@gmail.com', N'FARAZSHAIKH8960@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEJg4eOAM46LgCsUxhWukYpAv/sIn/uxM06ENMKG+AqyOgN6zY6uV3fleMiioC1m4/Q==', N'IOFPAULZHMB7BSTJ22T4DQ7ICVZMBWPW', N'5874a93e-e196-47a2-a088-86fa2c68fe3e', NULL, 0, 0, NULL, 1, 0)
GO
SET IDENTITY_INSERT[dbo].[Doctors] ON
GO
INSERT[dbo].[Doctors]([DrId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(101, N'hgjghj', N'ghjgh', N'ghjghj', N'https://localhost:7079//images/Specification/Dictionary/140524061705PM.png', N'ghjgh', N'ghjgh', N'g', N'ghjh', N'ghjghj', 7, N'bnmbm', N'bnmnbm', CAST(9.90 AS Decimal(10, 2)), N'bnmnb', 6, CAST(N'2024-06-14T18:05:21.437' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(102, N'hgjghj', N'ghjgh', N'ghjghj', N'https://localhost:7079//images/Specification/Dictionary/140824061208PM.png', N'ghjgh', N'ghjgh', N'g', N'ghjh', N'ghjghj', 7, N'bnmbm', N'bnmnbm', CAST(9.90 AS Decimal(10, 2)), N'bnmnb', 6, CAST(N'2024-06-14T18:08:17.967' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(103, N'hgfhg', N'ghjghj', N'ghjghj', N'https://localhost:7079//images/142224060422PM.png', N'ghjghj', N'ghjgh', N'g', N'ghjghj', N'ghjghj', 6, N'ghjg', N'ghjgh', CAST(99.90 AS Decimal(10, 2)), N'gfgfh', 5, CAST(N'2024-06-14T18:22:11.527' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(104, N'grtg', N'gfg', N'657575676', N'http://localhost:5085//images/143924062539PM.png', N'yuyjh', N'hfgh', N'y', N'56756', N'ythyt', 56, N'ty', N'tyh', CAST(677.00 AS Decimal(10, 2)), N'yt', 97, CAST(N'2024-06-14T18:39:38.637' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(105, N'   ; color: #666666; font-family: ''Lato'', Helvetica, Arial, sans-serif; font-size: 18px; font-weight', N'nbvnbnm', N'bnmnbm', N'http://localhost:5085//images/144924062249PM.png', N'bnmnbm', N'bnmnbm', N'b', N'nbmnb', N'nbmnbm', 7, N'nm,mn,', N'nm,mn', CAST(99.00 AS Decimal(10, 2)), N'mn,mn', 8, CAST(N'2024-06-14T18:49:27.193' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[Doctors] OFF
GO
SET IDENTITY_INSERT[dbo].[EmailLogs] ON
GO
INSERT[dbo].[EmailLogs]([Id], [ToEmail], [Subject], [Body], [ErrorMessage], [SentStatus], [Entryon]) VALUES(1, N'farazshaikh8960@gmail.com', N'ghjghjgh', N'gjhjghjghjg', N'', 0, CAST(N'2024-06-10T18:31:18.000' AS DateTime))
GO
INSERT[dbo].[EmailLogs]([Id], [ToEmail], [Subject], [Body], [ErrorMessage], [SentStatus], [Entryon]) VALUES(2, N'farazshaikh8960@gmail.com', N'ghjghjgh', N'gjhjghjghjg', N'', 0, CAST(N'2024-06-10T18:32:40.690' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[EmailLogs] OFF
GO
SET IDENTITY_INSERT[dbo].[ErrorLog] ON
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(1, N'Proc_Invoice', N'InsertInvoiceData', N'InsertInvoiceData', N'The member  of type Entities.InvoiceItem cannot be used as a parameter value', CAST(N'2024-06-05T12:36:33.420' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(2, N'Proc_Invoice', N'InsertInvoiceData', N'InsertInvoiceData', N'Trying to pass a table-valued parameter with 4 column(s) where the corresponding user-defined table type requires 5 column(s).', CAST(N'2024-06-05T13:03:19.670' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(3, N'Proc_Invoice', N'InsertInvoiceData', N'InsertInvoiceData', N'Trying to pass a table-valued parameter with 4 column(s) where the corresponding user-defined table type requires 5 column(s).', CAST(N'2024-06-05T13:06:25.267' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(4, N'UserService', N'LoginAsync', N'', N'Session has not been configured for this application or request.', CAST(N'2024-06-06T11:24:04.110' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(5, N'UserService', N'LoginAsync', N'', N'Procedure or function ''Proc_IncrementInvalidLoginAttempts'' expects parameter ''@Username'', which was not supplied.', CAST(N'2024-06-06T11:42:44.500' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(6, N'Proc_Appointment', N'call', N'Proc_InsertPatientAndAppointment', N'Cannot access a disposed object.
Object name: ''Microsoft.AspNetCore.Identity.UserManager`1[[API.DBContext.ApplicationUser, API, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]''.', CAST(N'2024-06-07T18:41:35.773' AS DateTime))
GO
INSERT [dbo].[ErrorLog] ([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (7, N'UserService', N'RegisterAsync', N'', N'Cannot access a disposed object.
Object name: ''Microsoft.AspNetCore.Identity.UserManager`1[[API.DBContext.ApplicationUser, API, Version = 1.0.0.0, Culture = neutral, PublicKeyToken = null]]''.', CAST(N'2024-06-07T18: 56: 17.430' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(8, N'Proc_AddOrUpdateMedicines', N'call', N'Proc_UpsertMedicineAndStock', N'Procedure or function Proc_UpsertMedicineAndStock has too many arguments specified.', CAST(N'2024-06-10T13:55:18.497' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(9, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Error converting data type nvarchar to date.', CAST(N'2024-06-11T18:08:09.493' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(10, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Error converting data type nvarchar to date.', CAST(N'2024-06-11T18:10:46.387' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(11, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Procedure or function Prc_InsertOrUpdateProject has too many arguments specified.', CAST(N'2024-06-11T18:11:12.740' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(12, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Procedure or function ''Prc_InsertOrUpdateProject'' expects parameter ''@UserEmail'', which was not supplied.', CAST(N'2024-06-11T18:32:12.130' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(13, N'Proc_AddDoctor', N'call', N'proc_InsertOrUpdateDoctor', N'Error converting data type nvarchar to date.', CAST(N'2024-06-14T17:57:37.300' AS DateTime))
GO
INSERT[dbo].[ErrorLog]([Id], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES(14, N'Proc_AddDoctor', N'call', N'proc_InsertOrUpdateDoctor', N'Error converting data type nvarchar to date.', CAST(N'2024-06-14T18:02:44.447' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[ErrorLog] OFF
GO
SET IDENTITY_INSERT[dbo].[Invoice] ON 
GO
INSERT[dbo].[Invoice]([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES(1, N'string', N'string', N'string', N'string', 0, 0, 0, 0, CAST(N'2024-06-05T13:06:32.930' AS DateTime))
GO
INSERT[dbo].[Invoice]([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES(2, N'string', N'string', N'string', N'string', 0, 0, 0, 0, CAST(N'2024-06-05T13:08:42.173' AS DateTime))
GO
INSERT[dbo].[Invoice]([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES(3, N'fdg', N'dfgdf', N'9988773737', N'dfgfdg', 336, 16.799999237060547, 188.16000366210938, 507.3599853515625, CAST(N'2024-06-05T16:52:30.000' AS DateTime))
GO
INSERT[dbo].[Invoice]([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES(4, N'fdg', N'dfgdf', N'9988773737', N'dfgfdg', 649362, 156184.5625, 29554.560546875, 522732, CAST(N'2024-06-05T16:57:01.050' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[Invoice] OFF
GO
SET IDENTITY_INSERT[dbo].[InvoiceItem] ON 
GO
INSERT[dbo].[InvoiceItem]([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES(1, 1, N'string', N'string', 0, N'string', 0, 0, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[InvoiceItem]([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES(2, 2, N'string', N'string', 0, N'string', 0, 0, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[InvoiceItem]([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES(3, 3, N'Mobiles', N'dsf', 6, N'tablet', 56, 56, 5, 16.799999237060547, 336, 0, 0, 507.3599853515625)
GO
INSERT[dbo].[InvoiceItem]([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES(4, 4, N'Mobiles', N'dsf', 6, N'tablet', 56, 56, 5, 16.799999237060547, 336, 0, 0, 507.3599853515625)
GO
INSERT[dbo].[InvoiceItem]([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES(5, 4, N'Books', N'dfsdf', 546, N'tablet', 565, 4, 44, 135735.59375, 308490, 0, 0, 185094)
GO
INSERT[dbo].[InvoiceItem]([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES(6, 4, N'Mobiles', N'fddfgfd', 56756, N'Select Unit', 6, 5, 6, 20432.16015625, 340536, 0, 0, 337130.625)
GO
SET IDENTITY_INSERT[dbo].[InvoiceItem] OFF
GO
SET IDENTITY_INSERT[dbo].[Medicines] ON 
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(1, N'Medicine1', N'Description1', N'Manufacturer1', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 10.5, 1)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(2, N'Medicine2', N'Description2', N'Manufacturer2', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 12.75, 2)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(3, N'Medicine3', N'Description3', N'Manufacturer3', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 8.2, 3)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(4, N'Medicine4', N'Description4', N'Manufacturer4', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 15, 4)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(5, N'Medicine5', N'Description5', N'Manufacturer5', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 9.99, 5)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(6, N'Medicine6', N'Description6', N'Manufacturer6', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 20.5, 6)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(7, N'Medicine7', N'Description7', N'Manufacturer7', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 5.75, 7)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(8, N'Medicine8', N'Description8', N'Manufacturer8', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 18.3, 8)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(9, N'Medicine9', N'Description9', N'Manufacturer9', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 14.2, 9)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(10, N'Medicine10', N'Description10', N'Manufacturer10', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 11.5, 10)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(11, N'string', N'string', N'string', N'string', CAST(N'2024-06-10T13:58:31.260' AS DateTime), 0, 0)
GO
INSERT[dbo].[Medicines]([MedicineID], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES(12, N'string', N'string', N'string', N'string', CAST(N'2024-06-10T18:20:26.623' AS DateTime), 0, 0)
GO
SET IDENTITY_INSERT[dbo].[Medicines] OFF
GO
SET IDENTITY_INSERT[dbo].[MedicineStocks] ON 
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(1, 1, 100, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(2, 2, 150, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(3, 3, 200, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(4, 4, 80, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(5, 5, 120, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(6, 6, 90, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(7, 7, 300, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(8, 8, 70, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(9, 9, 180, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(10, 10, 250, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(11, 11, 0, CAST(N'2024-06-10T13:58:31.260' AS DateTime))
GO
INSERT[dbo].[MedicineStocks]([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES(12, 12, 0, CAST(N'2024-06-10T18:20:26.623' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[MedicineStocks] OFF
GO
SET IDENTITY_INSERT[dbo].[MedicinesType] ON 
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(1, N'Type A')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(2, N'Type B')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(3, N'Type C')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(4, N'Type D')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(5, N'Type E')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(6, N'Type F')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(7, N'Type G')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(8, N'Type H')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(9, N'Type I')
GO
INSERT[dbo].[MedicinesType]([MedTypeID], [MedTypeName]) VALUES(10, N'Type J')
GO
SET IDENTITY_INSERT[dbo].[MedicinesType] OFF
GO
SET IDENTITY_INSERT[dbo].[Projects] ON 
GO
INSERT[dbo].[Projects]([Id], [ProjectId], [UserEmail], [ProjectName], [DomainName], [Validity], [IsLifeTime], [Status], [CreatedOn]) VALUES(1, 636190, N'string', N'string', N'string', N'string', 1, 0, CAST(N'2024-06-11T18:45:24.153' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[Projects] OFF
GO
SET IDENTITY_INSERT[dbo].[tbl_users] ON 
GO
INSERT[dbo].[tbl_users]([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES(1, N'faraz@gmail.com', N'ts/rTdP0AyPKNg1nNjW/G1u0/RxzquIMTEn/9jx5Us8=', CAST(N'2024-05-16T16:11:05.373' AS DateTime), NULL, NULL, 1, 3)
GO
INSERT[dbo].[tbl_users]([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES(2, N'Farazshaikh08538@gmail.com', N'Ihh3xfAefViWj8YBd0G16QXFZ2eFFZZdNOyazqtZA2k=', CAST(N'2024-06-06T11:40:20.697' AS DateTime), NULL, NULL, 1, 4)
GO
SET IDENTITY_INSERT[dbo].[tbl_users] OFF
GO
SET IDENTITY_INSERT[dbo].[tbl_Validate_Email] ON 
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(2, N'farazshaikh8960@gmail.com', 414045, CAST(N'2024-05-17T18:24:57.467' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(3, N'farazshaikh8960@gmail.com', 51054, CAST(N'2024-05-17T18:25:37.993' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(4, N'farazshaikh8960@gmail.com', 30228, CAST(N'2024-05-17T18:29:17.660' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(5, N'farazshaikh8960@gmail.com', 557898, CAST(N'2024-05-17T18:35:54.743' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(6, N'farazshaikh8960@gmail.com', 619465, CAST(N'2024-05-17T18:41:02.450' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(7, N'farazshaikh8960@gmail.com ', 482146, CAST(N'2024-05-29T17:49:37.020' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(8, N'Farazshaikh8960@gmail.com ', 86805, CAST(N'2024-05-29T17:57:23.537' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(9, N'farazshaikh8960@gmail.com ', 561152, CAST(N'2024-05-29T18:02:43.780' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(13, N'farazshaikh8960@gmail.com ', 811711, CAST(N'2024-05-30T12:27:44.450' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(14, N'farazshaikh8960@gmail.com ', 272417, CAST(N'2024-05-30T12:32:00.153' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(15, N'farazshaikh8960@gmail.com', 885314, CAST(N'2024-06-01T10:43:13.403' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(16, N'farazshaikh8960@gmail.com', 781682, CAST(N'2024-06-01T10:46:38.520' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(17, N'farazshaikh8960@gmail.com', 911570, CAST(N'2024-06-01T10:52:20.763' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(18, N'farazshaikh8960@gmail.com', 420577, CAST(N'2024-06-01T10:53:17.143' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(19, N'farazshaikh8960@gmail.com', 349892, CAST(N'2024-06-01T10:57:17.010' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(20, N'farazshaikh8960@gmail.com', 197330, CAST(N'2024-06-01T10:58:50.763' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(21, N'farazshaikh8960@gmail.com', 49812, CAST(N'2024-06-01T11:05:35.693' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(22, N'farazshaikh8960@gmail.com', 471181, CAST(N'2024-06-01T11:08:32.357' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(24, N'farazshaikh8960@gmail.com', 985664, CAST(N'2024-06-01T11:16:43.630' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(25, N'farazshaikh8960@gmail.com', 86074, CAST(N'2024-06-01T11:21:12.697' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(26, N'farazshaikh8960@gmail.com', 737575, CAST(N'2024-06-01T11:22:39.833' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(27, N'farazshaikh8960@gmail.com', 573082, CAST(N'2024-06-01T11:24:07.427' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(29, N'farazshaikh8960@gmail.com', 30396, CAST(N'2024-06-01T11:27:26.680' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(30, N'farazshaikh8960@gmail.com', 195918, CAST(N'2024-06-01T11:45:33.330' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(31, N'farazshaikh8960@gmail.com', 852617, CAST(N'2024-06-01T11:49:04.397' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(32, N'farazshaikh8960@gmail.com', 966045, CAST(N'2024-06-01T11:50:14.473' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(33, N'farazshaikh8960@gmail.com', 231240, CAST(N'2024-06-01T11:51:27.627' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(34, N'farazshaikh8960@gmail.com', 447915, CAST(N'2024-06-01T11:52:36.527' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(35, N'farazshaikh8960@gmail.com', 199830, CAST(N'2024-06-01T11:53:54.133' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(36, N'farazshaikh8960@gmail.com', 894994, CAST(N'2024-06-01T11:57:18.807' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(39, N'farazshaikh8960@gmail.com', 691884, CAST(N'2024-06-01T12:12:36.790' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(40, N'farazshaikh8960@gmail.com', 905228, CAST(N'2024-06-01T12:15:20.003' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(41, N'farazshaikh8960@gmail.com', 749557, CAST(N'2024-06-01T12:16:40.653' AS DateTime))
GO
INSERT[dbo].[tbl_Validate_Email]([vID], [vEmail], [vOTP], [vEntry]) VALUES(1007, N'Farazshaikh08538@gmail.com', 17988, CAST(N'2024-06-06T11:40:25.127' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[tbl_Validate_Email] OFF
GO
SET IDENTITY_INSERT[dbo].[TransactionDetails] ON 
GO
INSERT[dbo].[TransactionDetails]([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES(1, 1, N'string', N'string', 1, N'string', NULL, CAST(N'2024-06-05T13:06:32.930' AS DateTime))
GO
INSERT[dbo].[TransactionDetails]([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES(2, 2, N'string', N'string', 1, N'string', NULL, CAST(N'2024-06-05T13:08:42.173' AS DateTime))
GO
INSERT[dbo].[TransactionDetails]([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES(3, 3, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-05T16:52:30.107' AS DateTime))
GO
INSERT[dbo].[TransactionDetails]([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES(4, 4, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-05T16:57:01.050' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[TransactionDetails] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 24-06-2024 18:37:46 ******/
CREATE NONCLUSTERED INDEX[IX_AspNetRoleClaims_RoleId] ON[dbo].[AspNetRoleClaims]
    (
        [RoleId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 24-06-2024 18:37:46 ******/
CREATE UNIQUE NONCLUSTERED INDEX[RoleNameIndex] ON[dbo].[AspNetRoles]
    (
        [NormalizedName] ASC
    )
WHERE([NormalizedName] IS NOT NULL)
WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 24-06-2024 18:37:46 ******/
CREATE NONCLUSTERED INDEX[IX_AspNetUserClaims_UserId] ON[dbo].[AspNetUserClaims]
    (
        [UserId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 24-06-2024 18:37:46 ******/
CREATE NONCLUSTERED INDEX[IX_AspNetUserLogins_UserId] ON[dbo].[AspNetUserLogins]
    (
        [UserId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 24-06-2024 18:37:46 ******/
CREATE NONCLUSTERED INDEX[IX_AspNetUserRoles_RoleId] ON[dbo].[AspNetUserRoles]
    (
        [RoleId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 24-06-2024 18:37:46 ******/
CREATE NONCLUSTERED INDEX[EmailIndex] ON[dbo].[AspNetUsers]
    (
        [NormalizedEmail] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 24-06-2024 18:37:46 ******/
CREATE UNIQUE NONCLUSTERED INDEX[UserNameIndex] ON[dbo].[AspNetUsers]
    (
        [NormalizedUserName] ASC
    )
WHERE([NormalizedUserName] IS NOT NULL)
WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
/****** Object:  Index [UQ__Projects__761ABEF156B357F3]    Script Date: 24-06-2024 18:37:46 ******/
ALTER TABLE[dbo].[Projects] ADD UNIQUE NONCLUSTERED
    (
        [ProjectId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
/****** Object:  Index [UK_vOTP]    Script Date: 24-06-2024 18:37:46 ******/
ALTER TABLE[dbo].[tbl_Validate_Email] ADD  CONSTRAINT[UK_vOTP] UNIQUE NONCLUSTERED
    (
        [vOTP] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsSocialAlert]  DEFAULT((0)) FOR[IsSocialAlert]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsEmailVerificationRequired]  DEFAULT((0)) FOR[IsEmailVerificationRequired]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsEmailMarketing]  DEFAULT((0)) FOR[IsEmailMarketing]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsShowPassword]  DEFAULT((0)) FOR[IsShowPassword]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsMultipleMobileAllowed]  DEFAULT((0)) FOR[IsMultipleMobileAllowed]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsPasswordOnly]  DEFAULT((0)) FOR[IsPasswordOnly]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsReferral]  DEFAULT((0)) FOR[IsReferral]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsBackUpService]  DEFAULT((0)) FOR[IsBackUpService]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsPaymentGateway]  DEFAULT((0)) FOR[IsPaymentGateway]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsMultipleVendorAllowed]  DEFAULT((0)) FOR[IsMultipleVendorAllowed]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsTwoFactorAuthenticationEnabled]  DEFAULT((0)) FOR[IsTwoFactorAuthenticationEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsSmsNotificationEnabled]  DEFAULT((0)) FOR[IsSmsNotificationEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsAppointmentReminderEnabled]  DEFAULT((0)) FOR[IsAppointmentReminderEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsDoctorAvailabilityNotificationEnabled]  DEFAULT((0)) FOR[IsDoctorAvailabilityNotificationEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsLabResultsNotificationEnabled]  DEFAULT((0)) FOR[IsLabResultsNotificationEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsMSServiceEnabled]  DEFAULT((0)) FOR[IsMSServiceEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsBillingNotificationEnabled]  DEFAULT((0)) FOR[IsBillingNotificationEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsPrescriptionRefillReminderEnabled]  DEFAULT((0)) FOR[IsPrescriptionRefillReminderEnabled]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsPatient]  DEFAULT((0)) FOR[IsPatient]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsDoctor]  DEFAULT((0)) FOR[IsDoctor]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_SuperAdmin]  DEFAULT((0)) FOR[SuperAdmin]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  CONSTRAINT[DF_ApplicationSetting_IsAdmin]  DEFAULT((0)) FOR[IsAdmin]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  DEFAULT((0)) FOR[IsLowStorageMedicineNotification]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  DEFAULT((0)) FOR[IsAppointmentContactService]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  DEFAULT((0)) FOR[IsAppointmentFormService]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  DEFAULT((0)) FOR[IsAppointmentStatus]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  DEFAULT((0)) FOR[IsWhatsappMarketing]
GO
ALTER TABLE[dbo].[ApplicationSetting] ADD  DEFAULT((0)) FOR[IsDarkModeEnabled]
GO
ALTER TABLE[dbo].[Appointments] ADD  DEFAULT(getdate()) FOR[CreatedOn]
GO
ALTER TABLE[dbo].[Doctors] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[EmailLogs] ADD  DEFAULT(getdate()) FOR[Entryon]
GO
ALTER TABLE[dbo].[EmailTemplates] ADD  DEFAULT(getdate()) FOR[CreatedAt]
GO
ALTER TABLE[dbo].[ErrorLog] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[FAQs] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Invoice] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[MedicalHistory] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Medicines] ADD  DEFAULT(getdate()) FOR[CreatedAt]
GO
ALTER TABLE[dbo].[MedicineStocks] ADD  DEFAULT(getdate()) FOR[UpdatedAt]
GO
ALTER TABLE[dbo].[Patient_Services] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Patients] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Payments] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[PremiumService] ADD  DEFAULT(getdate()) FOR[CreatedAt]
GO
ALTER TABLE[dbo].[PremiumService] ADD  DEFAULT((0)) FOR[IsLowStorageMedicineNotification]
GO
ALTER TABLE[dbo].[PremiumService] ADD  DEFAULT((0)) FOR[IsAppointmentContactService]
GO
ALTER TABLE[dbo].[PremiumService] ADD  DEFAULT((0)) FOR[IsAppointmentFormService]
GO
ALTER TABLE[dbo].[PremiumService] ADD  DEFAULT((0)) FOR[IsAppointmentStatus]
GO
ALTER TABLE[dbo].[PremiumService] ADD  DEFAULT((0)) FOR[IsWhatsappMarketing]
GO
ALTER TABLE[dbo].[Projects] ADD  DEFAULT(getdate()) FOR[CreatedOn]
GO
ALTER TABLE[dbo].[Purchases] ADD  DEFAULT(getdate()) FOR[PurchaseDate]
GO
ALTER TABLE[dbo].[Reviews] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Services] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[tbl_PageErrorLog] ADD  DEFAULT(getdate()) FOR[_EntryDate]
GO
ALTER TABLE[dbo].[tbl_users] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[tbl_users] ADD  DEFAULT((0)) FOR[InvalidLoginAttempts]
GO
ALTER TABLE[dbo].[tbl_Validate_Email] ADD  DEFAULT(getdate()) FOR[vEntry]
GO
ALTER TABLE[dbo].[TransactionDetails] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Treatment] ADD  DEFAULT(getdate()) FOR[CreatedDate]
GO
ALTER TABLE[dbo].[UserLogins] ADD  DEFAULT(getdate()) FOR[LoginTime]
GO
ALTER TABLE[dbo].[WorkingHours] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT[FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES[dbo].[AspNetRoles]([Id])
ON DELETE CASCADE
GO
ALTER TABLE[dbo].[AspNetRoleClaims] CHECK CONSTRAINT[FK_AspNetRoleClaims_AspNetRoles_RoleId]
GO
ALTER TABLE[dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT[FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES[dbo].[AspNetUsers]([Id])
ON DELETE CASCADE
GO
ALTER TABLE[dbo].[AspNetUserClaims] CHECK CONSTRAINT[FK_AspNetUserClaims_AspNetUsers_UserId]
GO
ALTER TABLE[dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT[FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES[dbo].[AspNetUsers]([Id])
ON DELETE CASCADE
GO
ALTER TABLE[dbo].[AspNetUserLogins] CHECK CONSTRAINT[FK_AspNetUserLogins_AspNetUsers_UserId]
GO
ALTER TABLE[dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT[FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
REFERENCES[dbo].[AspNetRoles]([Id])
ON DELETE CASCADE
GO
ALTER TABLE[dbo].[AspNetUserRoles] CHECK CONSTRAINT[FK_AspNetUserRoles_AspNetRoles_RoleId]
GO
ALTER TABLE[dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT[FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES[dbo].[AspNetUsers]([Id])
ON DELETE CASCADE
GO
ALTER TABLE[dbo].[AspNetUserRoles] CHECK CONSTRAINT[FK_AspNetUserRoles_AspNetUsers_UserId]
GO
ALTER TABLE[dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT[FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
REFERENCES[dbo].[AspNetUsers]([Id])
ON DELETE CASCADE
GO
ALTER TABLE[dbo].[AspNetUserTokens] CHECK CONSTRAINT[FK_AspNetUserTokens_AspNetUsers_UserId]
GO
/****** Object:  StoredProcedure [dbo].[InsertEmailLog]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[InsertEmailLog]
    @ToEmail NVARCHAR(255),
    @Subject NVARCHAR(255),
    @Body NVARCHAR(MAX),
    @ErrorMessage NVARCHAR(MAX) = NULL, --Optional parameter with default value NULL
@SentStatus BIT
AS
BEGIN
--Insert a new record into the EmailLogs table
    INSERT INTO EmailLogs(ToEmail, Subject, Body, ErrorMessage, SentStatus)
VALUES(@ToEmail, @Subject, @Body, @ErrorMessage, @SentStatus);
END;
GO
/****** Object:  StoredProcedure [dbo].[InsertInvoiceData]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[InsertInvoiceData]
@PatientName NVARCHAR(100),
    @Email NVARCHAR(100),
        @Phone NVARCHAR(20),
            @Address NVARCHAR(255),
                @Subtotal FLOAT,
                    @DiscountAmount FLOAT,
                        @TotalVAT FLOAT,
                            @TotalAmount FLOAT,
                                @InvoiceItems InvoiceItemType READONLY, --Table - valued parameter for InvoiceItem
    @Transaction TransactionType READONLY
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        DECLARE @InvoiceID INT;

--Insert into Invoice table
        INSERT INTO Invoice(PatientName, Email, Phone, Address, Subtotal, DiscountAmount, TotalVAT, TotalAmount)
VALUES(@PatientName, @Email, @Phone, @Address, @Subtotal, @DiscountAmount, @TotalVAT, @TotalAmount);
        
        SET @InvoiceID = SCOPE_IDENTITY();

--Insert into InvoiceItem table
        INSERT INTO InvoiceItem(InvoiceID, Service, Product, Quantity, Unit, Price, VAT, Discount, SingleDiscountAmount, SubAmount, NetAmount, VATAmount, TotalAmount)
        SELECT @InvoiceID, Service, Product, Quantity, Unit, Price, VAT, Discount, SingleDiscountAmount, SubAmount, NetAmount, VATAmount, TotalAmount
        FROM @InvoiceItems;

--Insert into TransactionDetails table
        INSERT INTO TransactionDetails(InvoiceID, Mode, TransactionId, IsPaid, DueDate)
       SELECT @InvoiceID, Mode, TransactionId, IsPaid, DueDate FROM @Transaction;
                SELECT 1 AS StatusCode, 'Create Invoice Successful' AS ResponseText;
        COMMIT TRANSACTION;
    END TRY
    BEGIN CATCH
SELECT - 1 AS StatusCode, 'Invoice Saved Field!' AS ResponseText;
        ROLLBACK TRANSACTION;
THROW;
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[Prc_InsertOrUpdateProject]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE[dbo].[Prc_InsertOrUpdateProject]
@ProjectId INT,
    @UserEmail VARCHAR(255),
        @ProjectName VARCHAR(255),
            @DomainName VARCHAR(255),
                @Validity VARCHAR(50),
                    @IsLifeTime BIT,
                        @Status BIT
AS
BEGIN
    SET NOCOUNT ON;

    BEGIN TRY
        IF EXISTS(SELECT 1 FROM Projects WHERE ProjectId = @ProjectId)
BEGIN
            UPDATE Projects
            SET ProjectName = @ProjectName,
    DomainName = @DomainName,
    Validity = @Validity,
    IsLifeTime = @IsLifeTime,
    Status = @Status
            WHERE ProjectId = @ProjectId;
            SELECT 1 AS StatusCode, 'Project updated successfully' AS ResponseText;
END
ELSE
BEGIN
            INSERT INTO Projects(ProjectId, UserEmail, ProjectName, DomainName, Validity, IsLifeTime, Status)
VALUES(@ProjectId, @UserEmail, @ProjectName, @DomainName, @Validity, @IsLifeTime, @Status);
			 INSERT INTO ApplicationSetting(ProjectId)
Values(@ProjectId);
            SELECT 1 AS StatusCode, 'Project inserted successfully' AS ResponseText;
END
    END TRY
    BEGIN CATCH
SELECT - 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_ConfirmEmail]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc[dbo].[Proc_ConfirmEmail]
@IsVerfied int,
    @Email Varchar(100)
As
Begin
Update tbl_users set IsVerified = @IsVerfied where username = @Email;
End
GO
/****** Object:  StoredProcedure [dbo].[Proc_FindUser]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_FindUser]
@Email VARCHAR(100)
AS
BEGIN
    BEGIN TRY
        IF EXISTS(SELECT 1 FROM AspNetUsers WHERE Email = @Email)
BEGIN
SELECT - 1 AS StatusCode, 'User Already Exists!' AS ResponseText;
END
ELSE
BEGIN
            SELECT 1 AS StatusCode, 'User Does Not Exist!' AS ResponseText;
END
    END TRY
    BEGIN CATCH
--You can handle errors here, for example:
    SELECT - 1 AS StatusCode, 'Something went wrong!' AS ResponseText; 
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetApplicationSetting]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetApplicationSetting]
@Projectid INT = NULL
AS
BEGIN
IF(@Projectid IS NOT NULL)
BEGIN
SELECT *
    FROM ApplicationSetting 
        WHERE Projectid = @Projectid;
END
ELSE
BEGIN
SELECT *
    FROM ApplicationSetting;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetAppointmentIdById]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE[dbo].[Proc_GetAppointmentIdById]
@AppointmentId int
AS
BEGIN

SELECT * FROM Appointments WHERE AppointmentId = @AppointmentId;

END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetAppointments]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetAppointments]
@Date varchar(255)
AS
BEGIN
IF(@Date IS NOT NULL)
BEGIN
SELECT * FROM Appointments WHERE Date = @Date ORDER BY 1 DESC;
END
ELSE
BEGIN
SELECT * FROM Appointments ORDER BY 1 DESC;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetDoctors]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetDoctors]
@Name varchar(255) = Null
AS
BEGIN
IF(@Name IS NOT NULL)
BEGIN
SELECT * FROM Doctors  WHERE Name LIKE '%' + @Name + '%' ORDER BY 1 DESC;
END
ELSE
BEGIN
SELECT * FROM Doctors ORDER BY 1 DESC;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetDoctorsById]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE[dbo].[Proc_GetDoctorsById]
@DrId int
AS
BEGIN

SELECT * FROM Doctors WHERE DrId = @DrId;

END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetEmailTemplate]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetEmailTemplate]
As
Begin
Select * from EmailTemplates
End
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetInvoiceDataByInvoiceId]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetInvoiceDataByInvoiceId]
@InvoiceID INT,
    @Case int
AS
BEGIN  
    BEGIN TRY  
        BEGIN TRANSACTION;
IF(@case=1)
Begin
SELECT
    *
    FROM Invoice
        WHERE InvoiceID = @InvoiceID;
end

		Else IF(@case=2)
Begin
SELECT
    *
    FROM InvoiceItem
        WHERE InvoiceID = @InvoiceID;
end


		Else IF(@case=3)
Begin
SELECT
    *
    FROM TransactionDetails
        WHERE InvoiceID = @InvoiceID;
end

        COMMIT TRANSACTION;  
    END TRY  
    BEGIN CATCH  
        ROLLBACK TRANSACTION;
THROW;  
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetInvoiceList]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc[dbo].[Proc_GetInvoiceList]
As
Begin
select * from Invoice order by 1 desc;
End
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetMedicineById]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetMedicineById]
@MedicineID INT
AS
BEGIN
SELECT
m.*,
    ms.Quantity
FROM 
        Medicines m 
    INNER JOIN 
        MedicineStocks ms
ON
m.MedicineID = ms.MedicineID
WHERE
m.MedicineID = @MedicineID;
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetMedicines]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetMedicines]
@Name VARCHAR(255) = NULL
AS
BEGIN
IF(@Name IS NOT NULL)
BEGIN
        SELECT m.*, ms.Quantity, mt.MedTypeName   
        FROM Medicines m   
        INNER JOIN MedicineStocks ms ON m.MedicineID = ms.MedicineID  
        INNER JOIN MedicinesType mt ON m.MedTypeID = mt.MedTypeID
        WHERE m.Name LIKE '%' + @Name + '%';
END
ELSE
BEGIN
        SELECT m.*, ms.Quantity, mt.MedTypeName   
        FROM Medicines m   
        INNER JOIN MedicineStocks ms ON m.MedicineID = ms.MedicineID  
        INNER JOIN MedicinesType mt ON m.MedTypeID = mt.MedTypeID;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetMedQuantityByName]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc[dbo].[Proc_GetMedQuantityByName]
@Name Varchar(255)
As
Begin
SELECT ms.Quantity 
FROM MedicineStocks ms 
INNER JOIN Medicines m ON m.MedicineID = ms.MedicineID 
WHERE m.Name LIKE '%' + @Name + '%';
End
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetPatients]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetPatients]
@Email varchar(255)
AS
BEGIN
IF(@Email IS NOT NULL)
BEGIN
SELECT * FROM Patients WHERE Email LIKE '%' + @Email + '%' ORDER BY 1 DESC;
END
ELSE
BEGIN
SELECT * FROM Patients;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetPatientsById]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create PROCEDURE[dbo].[Proc_GetPatientsById]
@PId int
AS
BEGIN

SELECT * FROM Patients WHERE PId = @PId;

END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetPremiumService]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetPremiumService]
@ServiceName NVARCHAR(100) = NULL
AS
BEGIN
IF(@ServiceName IS NOT NULL)
BEGIN
SELECT * FROM PremiumServices WHERE ServiceName LIKE '%' + @ServiceName + '%';
END
ELSE
BEGIN
SELECT * FROM PremiumServices;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetPremiumServiceById]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetPremiumServiceById]
@ServiceID int
AS
BEGIN
SELECT * FROM PremiumServices WHERE ServiceID = @ServiceID;
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetPurchaseServiceById]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetPurchaseServiceById]
@PurchaseID int
AS
BEGIN
SELECT * FROM Purchases WHERE PurchaseID = @PurchaseID;
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetPurchasesService]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetPurchasesService]
@UserEmail int
AS
BEGIN
IF(@UserEmail IS NOT NULL)
BEGIN
SELECT * FROM Purchases WHERE UserEmail LIKE '%' + @UserEmail + '%';
END
ELSE
BEGIN
SELECT * FROM Purchases;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetTreatmentById]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetTreatmentById]
@PId INT = NULL,
    @Case INT
AS
BEGIN    
    SET NOCOUNT ON;
    
    BEGIN TRY    
        BEGIN TRANSACTION;    

        IF @Case = 1
BEGIN  
            IF @PId IS NOT NULL
BEGIN
SELECT *
    FROM Treatment  
                WHERE PId = @PId;
END
ELSE
BEGIN
SELECT *
    FROM Treatment;
END
END  
        ELSE IF @Case = 2
BEGIN
SELECT *
    FROM Medication;
END  

        COMMIT TRANSACTION;    
    END TRY    
    BEGIN CATCH    
        ROLLBACK TRANSACTION;
THROW;    
    END CATCH
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetTreatmentList]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_GetTreatmentList]
@Date datetime = NULL
AS
BEGIN
    SET NOCOUNT ON; --This prevents extra result sets from interfering with the main result set
    
    IF @Date IS NOT NULL
BEGIN
        SELECT t.*, m.Name, m.Dosage, m.Frequency, m.FollowUpDate  
        FROM Treatment t  
        INNER JOIN Medication m ON t.TreatmentId = m.TreatmentId 
        WHERE CONVERT(DATE, t.CreatedDate) = CONVERT(DATE, @Date) 
        ORDER BY t.CreatedDate DESC;
END
ELSE
BEGIN
        SELECT t.*, m.Name, m.Dosage, m.Frequency, m.FollowUpDate  
        FROM Treatment t  
        INNER JOIN Medication m ON t.TreatmentId = m.TreatmentId 
        ORDER BY t.CreatedDate DESC;
END
END
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetUser]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Proc[dbo].[Proc_GetUser]
As
Begin
 SELECT U.Id, U.Name, U.UserName, U.Email, R.Name AS Role, tu.PasswordHash, tu.IsVerified, tu.IsActive, tu.IsLocked
 FROM AspNetUsers U
 JOIN AspNetUserRoles UR ON U.Id = UR.UserId
 JOIN tbl_users tu ON U.Email = tu.username
 JOIN AspNetRoles R ON UR.RoleId = R.Id;
End
GO
/****** Object:  StoredProcedure [dbo].[Proc_IncrementInvalidLoginAttempts]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_IncrementInvalidLoginAttempts]
@Email VARCHAR(50)
AS
BEGIN
--Check if the user exists
    IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email)
BEGIN
--Increment the invalid login attempts
        UPDATE tbl_users
        SET InvalidLoginAttempts = InvalidLoginAttempts + 1
        WHERE username = @Email;

--Optional: Return the current invalid login attempts count
        SELECT InvalidLoginAttempts
        FROM tbl_users
        WHERE username = @Email;
END
ELSE
BEGIN
--Handle the case where the user does not exist
RAISERROR('User not found.', 16, 1);
END
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_InsertErrorLog]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_InsertErrorLog]
@ClassName NVARCHAR(255),
    @FuncName NVARCHAR(255),
        @ProcName NVARCHAR(255),
            @Error NVARCHAR(MAX)
AS
BEGIN  
    SET NOCOUNT ON;

    BEGIN TRY
        INSERT INTO ErrorLog(ClassName, FuncName, ProcName, Error)
VALUES(@ClassName, @FuncName, @ProcName, @Error);  
    END TRY
    BEGIN CATCH
--Log the error to a special error table or take other appropriate actions
        INSERT INTO ErrorLog(ClassName, FuncName, ProcName, Error)
VALUES('ErrorLog Procedure', 'ErrorLog', 'Proc_InsertErrorLog', ERROR_MESSAGE());

--Throw or handle the error as needed
THROW;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[proc_InsertOrUpdateDoctor]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
  
CREATE PROCEDURE[dbo].[proc_InsertOrUpdateDoctor]
@DrId INT = NULL,
    @Name VARCHAR(100),
        @Email VARCHAR(100),
            @Phone VARCHAR(20),
                @DrImage VARCHAR(200),
                    @Address VARCHAR(200),
                        @Specialization VARCHAR(100),
                            @Gender CHAR(1),
                                @DateOfBirth VARCHAR(200),
                                    @Qualifications VARCHAR(200),
                                        @ExperienceYears INT,
                                            @Affiliations VARCHAR(200),
                                                @Languages VARCHAR(200),
                                                    @ConsultationFee DECIMAL(10, 2),
                                                        @Availability VARCHAR(100),
                                                            @Status INT
AS
BEGIN  
    SET NOCOUNT ON;  
  
    BEGIN TRY  
        IF @DrId IS NULL OR @DrId = 0
BEGIN
--Insert new record  
            INSERT INTO Doctors(
    Name, Email, Phone, DrImage, Address, Specialization, Gender, DateOfBirth,
    Qualifications, ExperienceYears, Affiliations, Languages, ConsultationFee,
    Availability, Status
)
VALUES(
    @Name, @Email, @Phone, @DrImage, @Address, @Specialization, @Gender, @DateOfBirth,
    @Qualifications, @ExperienceYears, @Affiliations, @Languages, @ConsultationFee,
    @Availability, @Status
);  
           SELECT 1 AS StatusCode, 'Insert Successful' AS ResponseText;
END
ELSE
BEGIN
--Update existing record  
            UPDATE Doctors  
            SET Name = @Name,
    Email = @Email,
    Phone = @Phone,
    DrImage = CASE WHEN @DrImage IS NOT NULL AND @DrImage != '' THEN @DrImage ELSE DrImage END,
        Address = @Address,
        Specialization = @Specialization,
        Gender = @Gender,
        DateOfBirth = @DateOfBirth,
        Qualifications = @Qualifications,
        ExperienceYears = @ExperienceYears,
        Affiliations = @Affiliations,
        Languages = @Languages,
        ConsultationFee = @ConsultationFee,
        Availability = @Availability,
        Status = @Status  
            WHERE DrId = @DrId;  
            SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
END  
    END TRY  
    BEGIN CATCH
SELECT - 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;  
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[proc_InsertOrUpdatePatient]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[proc_InsertOrUpdatePatient]
@PId INT = NULL,
    @AppointmentId INT = NULL,
        @Name NVARCHAR(100),
            @DateOfBirth NVARCHAR(100),
                @Gender NVARCHAR(10),
                    @Email NVARCHAR(100),
                        @Phone NVARCHAR(20),
                            @PImage NVARCHAR(200),
                                @Address NVARCHAR(200),
                                    @MedicalHistory NVARCHAR(MAX),
                                        @InsuranceInformation NVARCHAR(MAX),
                                            @EmergencyContactName NVARCHAR(100),
                                                @EmergencyContactPhone NVARCHAR(20),
                                                    @PrimaryCarePhysicianName NVARCHAR(100),
                                                        @PrimaryCarePhysicianPhone NVARCHAR(20),
                                                            @Allergies NVARCHAR(MAX),
                                                                @Medications NVARCHAR(MAX),
                                                                    @BloodType NVARCHAR(10),
                                                                        @Height INT,
                                                                            @Weight INT,
                                                                                @PreferredLanguage NVARCHAR(50),
                                                                                    @Occupation NVARCHAR(100),
                                                                                        @Status INT
AS
BEGIN  
    SET NOCOUNT ON;  
  
    BEGIN TRY  
        IF @PId IS NULL
BEGIN   
            INSERT INTO Patients(
    Name, DateOfBirth, Gender, Email, Phone, PImage, Address,
    MedicalHistory, InsuranceInformation, EmergencyContactName, EmergencyContactPhone,
    PrimaryCarePhysicianName, PrimaryCarePhysicianPhone, Allergies, Medications,
    BloodType, Height, Weight, PreferredLanguage, Occupation, Status
)
VALUES(
    @Name, @DateOfBirth, @Gender, @Email, @Phone, @PImage, @Address,
    @MedicalHistory, @InsuranceInformation, @EmergencyContactName, @EmergencyContactPhone,
    @PrimaryCarePhysicianName, @PrimaryCarePhysicianPhone, @Allergies, @Medications,
    @BloodType, @Height, @Weight, @PreferredLanguage, @Occupation, @Status
);  
			  SET @PId = SCOPE_IDENTITY();
			update Appointments set PId = @PId where AppointmentId = @AppointmentId;
            SELECT @PId AS PatientId, 1 AS StatusCode, 'Insert Successful' AS ResponseText;
END
ELSE
BEGIN
--Update existing record  
            UPDATE Patients  
            SET Name = @Name,
    DateOfBirth = @DateOfBirth,
    Gender = @Gender,
    Email = @Email,
    Phone = @Phone,
    PImage = CASE WHEN @PImage IS NOT NULL AND @PImage != '' THEN @PImage ELSE PImage END,
        Address = @Address,
        MedicalHistory = @MedicalHistory,
        InsuranceInformation = @InsuranceInformation,
        EmergencyContactName = @EmergencyContactName,
        EmergencyContactPhone = @EmergencyContactPhone,
        PrimaryCarePhysicianName = @PrimaryCarePhysicianName,
        PrimaryCarePhysicianPhone = @PrimaryCarePhysicianPhone,
        Allergies = @Allergies,
        Medications = @Medications,
        BloodType = @BloodType,
        Height = @Height,
        Weight = @Weight,
        PreferredLanguage = @PreferredLanguage,
        Occupation = @Occupation,
        Status = @Status  
            WHERE PId = @PId; 
			update Appointments set PId = @PId where AppointmentId = @AppointmentId;
            SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
END  
    END TRY  
    BEGIN CATCH
SELECT - 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;  
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_InsertOrUpdatePremiumService]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_InsertOrUpdatePremiumService]
@ServiceID INT = NULL,
    @ServiceName NVARCHAR(100),
        @Description NVARCHAR(500),
            @Price DECIMAL(18, 2),
                @Duration INT,
                    @Availability BIT,
                        @Features NVARCHAR(MAX),
                            @ServiceLevel NVARCHAR(50),
                                @ActivationDate DATETIME,
                                    @ExpiryDate DATETIME,
                                        @RenewalOption BIT,
                                            @Discounts DECIMAL(18, 2),
                                                @CustomerSupportLevel NVARCHAR(50),
                                                    @TermsAndConditions NVARCHAR(MAX),
                                                        @UsageLimits INT,
                                                            @FeedbackRating DECIMAL(3, 2),
                                                                @Popularity INT,
                                                                    @EmailMarketing BIT,
                                                                        @EmailVerificationService BIT,
                                                                            @ShowYourUserPassword BIT,
                                                                                @ReferralService BIT,
                                                                                    @BackUpService BIT,
                                                                                        @SmsNotificationService BIT,
                                                                                            @EmergencyAlertService BIT,
                                                                                                @UserAppointmentReminderService BIT,
                                                                                                    @DoctorAvailabilityNotificationService BIT,
                                                                                                        @MedicineStoreManagementService BIT,
                                                                                                            @TwoFactorAuthenticationService BIT,
                                                                                                                @IsMultipleMobileAllowed BIT,
                                                                                                                    @IsDarkModeEnabled BIT,
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
AS
BEGIN    
    BEGIN TRY    
        IF @ServiceID IS NULL
BEGIN
--Insert new record    
            INSERT INTO PremiumService(
    ServiceName,
    Description,
    Price,
    Duration,
    Availability,
    Features,
    ServiceLevel,
    ActivationDate,
    ExpiryDate,
    RenewalOption,
    Discounts,
    CustomerSupportLevel,
    TermsAndConditions,
    CreatedAt,
    UpdatedAt,
    UsageLimits,
    FeedbackRating,
    Popularity,
    EmailMarketing,
    EmailVerificationService,
    ShowYourUserPassword,
    ReferralService,
    BackUpService,
    SmsNotificationService,
    UserAppointmentReminderService,
    DoctorAvailabilityNotificationService,
    MedicineStoreManagementService,
    TwoFactorAuthenticationService,
    IsMultipleMobileAllowed,
    IsDarkModeEnabled,
    IsBillingNotificationEnabled,
    IsPrescriptionRefillReminderEnabled,
    MaxLoginAttempts,
    IsShowPassword,
    IsSocialAlert,
    IsPasswordOnly,
    IsPatient,
    IsDoctor,
    SuperAdmin,
    IsAdmin,
    IsLabManagmentService,
    IsLowStorageMedicineNotification,
    IsAppointmentContactService,
    IsAppointmentFormService,
    IsAppointmentStatus,
    IsWhatsappMarketing

) VALUES(
    @ServiceName,
    @Description,
    @Price,
    @Duration,
    @Availability,
    @Features,
    @ServiceLevel,
    @ActivationDate,
    @ExpiryDate,
    @RenewalOption,
    @Discounts,
    @CustomerSupportLevel,
    @TermsAndConditions,
    GETDATE(), --CreatedAt    
                GETDATE(), --UpdatedAt    
                @UsageLimits,
    @FeedbackRating,
    @Popularity,
    @EmailMarketing,
    @EmailVerificationService,
    @ShowYourUserPassword,
    @ReferralService,
    @BackUpService,
    @SmsNotificationService,
    @UserAppointmentReminderService,
    @DoctorAvailabilityNotificationService,
    @MedicineStoreManagementService,
    @TwoFactorAuthenticationService,
    @IsMultipleMobileAllowed,
    @IsDarkModeEnabled,
    @IsBillingNotificationEnabled,
    @IsPrescriptionRefillReminderEnabled,
    @MaxLoginAttempts,
    @IsShowPassword,
    @IsSocialAlert,
    @IsPasswordOnly,
    @IsPatient,
    @IsDoctor,
    @SuperAdmin,
    @IsAdmin,
    @IsLabManagmentService,
    @IsLowStorageMedicineNotification,
    @IsAppointmentContactService,
    @IsAppointmentFormService,
    @IsAppointmentStatus,
    @IsWhatsappMarketing
);    
            SELECT 1 AS StatusCode, 'Add Successful' AS ResponseText;
END
ELSE
BEGIN
--Update existing record    
            UPDATE PremiumService
SET
ServiceName = @ServiceName,
    Description = @Description,
    Price = @Price,
    Duration = @Duration,
    Availability = @Availability,
    Features = @Features,
    ServiceLevel = @ServiceLevel,
    ActivationDate = @ActivationDate,
    ExpiryDate = @ExpiryDate,
    RenewalOption = @RenewalOption,
    Discounts = @Discounts,
    CustomerSupportLevel = @CustomerSupportLevel,
    TermsAndConditions = @TermsAndConditions,
    UpdatedAt = GETDATE(), --UpdatedAt
UsageLimits = @UsageLimits,
    FeedbackRating = @FeedbackRating,
    Popularity = @Popularity,
    EmailMarketing = @EmailMarketing,
    EmailVerificationService = @EmailVerificationService,
    ShowYourUserPassword = @ShowYourUserPassword,
    ReferralService = @ReferralService,
    BackUpService = @BackUpService,
    SmsNotificationService = @SmsNotificationService,
    UserAppointmentReminderService = @UserAppointmentReminderService,
    DoctorAvailabilityNotificationService = @DoctorAvailabilityNotificationService,
    MedicineStoreManagementService = @MedicineStoreManagementService,
    TwoFactorAuthenticationService = @TwoFactorAuthenticationService,
    IsMultipleMobileAllowed = @IsMultipleMobileAllowed,
    IsDarkModeEnabled = @IsDarkModeEnabled,
    IsBillingNotificationEnabled = @IsBillingNotificationEnabled,
    IsPrescriptionRefillReminderEnabled = @IsPrescriptionRefillReminderEnabled,
    MaxLoginAttempts = @MaxLoginAttempts,
    IsShowPassword = @IsShowPassword,
    IsSocialAlert = @IsSocialAlert,
    IsPasswordOnly = @IsPasswordOnly,
    IsPatient = @IsPatient,
    IsDoctor = @IsDoctor,
    SuperAdmin = @SuperAdmin,
    IsAdmin = @IsAdmin,
    IsLabManagmentService = @IsLabManagmentService,
    IsLowStorageMedicineNotification = @IsLowStorageMedicineNotification,
    IsAppointmentContactService = @IsAppointmentContactService,
    IsAppointmentFormService = @IsAppointmentFormService,
    IsAppointmentStatus = @IsAppointmentStatus,
    IsWhatsappMarketing = @IsWhatsappMarketing
            WHERE ServiceID = @ServiceID;    
            SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
END    
    END TRY    
    BEGIN CATCH
SELECT - 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;    
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_InsertTreatment]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_InsertTreatment]
@PatientId INT,
    @DoctorId INT,
        @Diagnosis NVARCHAR(MAX),
            @TreatmentDate DATETIME,
                @Description NVARCHAR(MAX),
                    @Status NVARCHAR(50),
                        @CreatedBy NVARCHAR(100),
                            @Medications MedicationType READONLY-- Table type for Medications  
AS  
BEGIN  
  Begin Try
    SET NOCOUNT ON;  
  
    DECLARE @TreatmentId INT;

--Insert into Treatment table  
    INSERT INTO Treatment(PId, DrId, Diagnosis, TreatmentDate, Description, Status, CreatedBy)
VALUES(@PatientId, @DoctorId, @Diagnosis, @TreatmentDate, @Description, @Status, @CreatedBy);  
  
    SET @TreatmentId = SCOPE_IDENTITY();

--Insert into Medication table  
    INSERT INTO Medication(TreatmentId, Name, Dosage, Frequency, FollowUpDate)  
    SELECT @TreatmentId, Name, Dosage, Frequency, FollowUpDate  
    FROM @Medications;  
  
    SELECT 1 AS StatusCode, 'Add Successful' AS ResponseText;
  End try
  Begin Catch
SELECT - 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
  End Catch
END;

GO
/****** Object:  StoredProcedure [dbo].[Proc_InsertUserLogin]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_InsertUserLogin]
@UserEmail NVARCHAR(255),
    @DeviceID INT,
        @IPAddress NVARCHAR(45),
            @LoginStatus INT
AS
BEGIN
    INSERT INTO UserLogins(UserEmail, DeviceID, IPAddress, LoginStatus)
VALUES(@UserEmail, @DeviceID, @IPAddress, @LoginStatus);
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_IsUserVerfied]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO

CREATE PROCEDURE[dbo].[Proc_IsUserVerfied]
@Email VARCHAR(100)
AS
BEGIN
      IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND(IsActive = 0 OR IsActive IS NULL))
BEGIN
        SELECT 3 AS StatusCode, 'Your account has been deactivated. Please contact the support team for assistance.' AS ResponseText;
END
	ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND IsLocked = 1)
BEGIN
SELECT - 1 AS StatusCode, 'The user account is temporarily locked.' AS ResponseText;
END
    ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND IsVerified = 1)
BEGIN
        SELECT 1 AS StatusCode, 'Email Verified' AS ResponseText;
END
    ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND(IsVerified = 0 OR IsVerified IS NULL))
BEGIN
        SELECT 2 AS StatusCode, 'Email Not Verified' AS ResponseText;
END
ELSE
BEGIN
SELECT - 1 AS StatusCode, 'Invalid Email' AS ResponseText;
END
END;

GO
/****** Object:  StoredProcedure [dbo].[Proc_ManagePurchase]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
    
    
CREATE PROCEDURE[dbo].[Proc_ManagePurchase]
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
        IF @PurchaseID IS NULL
BEGIN    
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
    IsBackUpService = @BackUpService, IsSmsNotificationEnabled = @SmsNotificationService, IsDarkModeEnabled = @IsDarkModeEnabled, IsAppointmentReminderEnabled = @UserAppointmentReminderService, IsDoctorAvailabilityNotificationEnabled = @DoctorAvailabilityNotificationService,
    IsMSServiceEnabled = @MedicineStoreManagementService, IsTwoFactorAuthenticationEnabled = @TwoFactorAuthenticationService, IsMultipleMobileAllowed = @IsMultipleMobileAllowed,
    IsBillingNotificationEnabled = @IsBillingNotificationEnabled, IsPrescriptionRefillReminderEnabled = @IsPrescriptionRefillReminderEnabled, MaxLoginAttempts = @MaxLoginAttempts,
    IsSocialAlert = @IsSocialAlert, IsPasswordOnly = @IsPasswordOnly, IsPatient = @IsPatient, IsDoctor = @IsDoctor, SuperAdmin = @SuperAdmin, IsAdmin = @IsAdmin,
    IsLabManagmentService = @IsLabManagmentService, IsLowStorageMedicineNotification = @IsLowStorageMedicineNotification, IsAppointmentContactService = @IsAppointmentContactService,
    IsAppointmentFormService = @IsAppointmentFormService, IsAppointmentStatus = @IsAppointmentStatus, IsWhatsappMarketing = @IsWhatsappMarketing
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
GO
/****** Object:  StoredProcedure [dbo].[Proc_PageErrorLog]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc[dbo].[Proc_PageErrorLog]
    (
        @ClsName varchar(100),
        @FnName varchar(100),
        @ProcName nvarchar(100),
        @UserID INT,
        @Error NVARCHAR(max)
    )
AS
BEGIN
--! Replace DB Name  
INSERT INTO tbl_PageErrorLog(_ClsName, _FnName, _ProcName, _UserID, _Error)
VALUES(@ClsName, @FnName, @ProcName, @UserID, @Error)  
  
SELECT 1, 'Error Log Sucessfully Inserted' Msg

end
GO
/****** Object:  StoredProcedure [dbo].[Proc_ResetInvalidLoginAttempts]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE[dbo].[Proc_ResetInvalidLoginAttempts]
@Email VARCHAR(50)
AS
BEGIN
--Check if the user exists
    IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email)
BEGIN
--Increment the invalid login attempts
        UPDATE tbl_users
        SET InvalidLoginAttempts = 0
        WHERE username = @Email;
END
ELSE
BEGIN
--Handle the case where the user does not exist
RAISERROR('User not found.', 16, 1);
END
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_UpdateTreatment]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_UpdateTreatment]
@TreatmentId INT,
    @PatientId INT,
        @DoctorId INT,
            @Diagnosis NVARCHAR(MAX),
                @TreatmentDate DATETIME,
                    @Description NVARCHAR(MAX),
                        @Status NVARCHAR(50),
                            @ModifiedBy NVARCHAR(100),
                                @Medications MedicationType READONLY-- Table type for Medications  
AS  
BEGIN  
 Begin Try
 SET NOCOUNT ON;

--Update Treatment table  
    UPDATE Treatment  
    SET PId = @PatientId,
    DrId = @DoctorId,
    Diagnosis = @Diagnosis,
    TreatmentDate = @TreatmentDate,
    Description = @Description,
    Status = @Status,
    ModifiedDate = getdate(),
    ModifiedBy = @ModifiedBy  
    WHERE TreatmentId = @TreatmentId;

--Delete existing Medications  
    DELETE FROM Medication WHERE TreatmentId = @TreatmentId;

--Insert new Medications  
    INSERT INTO Medication(TreatmentId, Name, Dosage, Frequency, FollowUpDate)  
    SELECT @TreatmentId, Name, Dosage, Frequency, FollowUpDate  
    FROM @Medications;
	SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
  End try
  Begin Catch
SELECT - 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
  End Catch
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_UpsertAppointment]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_UpsertAppointment]
@AppointmentId INT = NULL,
    @DrId INT,
        @PId INT = NULL,
            @ServiceId INT,
                @Date DATE,
                    @Time NVARCHAR(20),
                        @Status INT,
                            @Notes NVARCHAR(MAX) = NULL
AS
BEGIN
    BEGIN TRY
        SET NOCOUNT ON;

        IF @AppointmentId IS NULL OR NOT EXISTS(SELECT 1 FROM Appointments WHERE AppointmentId = @AppointmentId)
BEGIN
--Insert new appointment
            INSERT INTO Appointments(DrId, PId, ServiceId, Date, Time, Status, Notes)
VALUES(@DrId, @PId, @ServiceId, @Date, @Time, 1, @Notes);
            SELECT SCOPE_IDENTITY() AS AppointmentId, 1 AS StatusCode, 'Insert Successful' AS ResponseText;
END
ELSE
BEGIN
--Update existing appointment
            UPDATE Appointments
            SET DrId = @DrId,
    PId = @PId,
    ServiceId = @ServiceId,
    Date = @Date,
    Time = @Time,
    Status = @Status,
    Notes = @Notes
            WHERE AppointmentId = @AppointmentId;

            SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
END
    END TRY
    BEGIN CATCH
SELECT - 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_UpsertMedicineAndStock]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_UpsertMedicineAndStock]
@MedicineID INT = NULL,
    @Name NVARCHAR(100),
        @Description NVARCHAR(255),
            @Manufacturer NVARCHAR(100),
                @Price float,
                    @MedTypeID varchar(100),
                        @ExpiryDate VARCHAR(100),
                            @Quantity INT
AS
BEGIN
    SET NOCOUNT ON;
    IF EXISTS(SELECT 1 FROM Medicines WHERE MedicineID = @MedicineID)
BEGIN
        UPDATE Medicines
        SET Name = @Name,
    Description = @Description,
    Manufacturer = @Manufacturer,
    Price = @Price,
    MedTypeID = @MedTypeID,
    ExpiryDate = @ExpiryDate
        WHERE MedicineID = @MedicineID;
        UPDATE MedicineStocks
        SET Quantity = @Quantity,
    UpdatedAt = GETDATE()
        WHERE MedicineID = @MedicineID;
		SELECT 1 AS StatusCode, 'Medicines Update Successful!' AS ResponseText;
END
ELSE
BEGIN
        INSERT INTO Medicines(Name, Description, Manufacturer, Price, MedTypeID, ExpiryDate)
VALUES(@Name, @Description, @Manufacturer, @Price, @MedTypeID, @ExpiryDate);
        DECLARE @NewMedicineID INT;
        SET @NewMedicineID = SCOPE_IDENTITY();
        INSERT INTO MedicineStocks(MedicineID, Quantity)
VALUES(@NewMedicineID, @Quantity);
		SELECT 1 AS StatusCode, 'Medicines Add Successful!' AS ResponseText;
END
SELECT - 1 AS StatusCode, 'Sorry something went wrong!' AS ResponseText;
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_VerifyConfirmationEmail]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[Proc_VerifyConfirmationEmail]
@Email VARCHAR(100),
    @OTP INT
AS
BEGIN      
    SET NOCOUNT ON;      
      
    DECLARE @IsValid BIT;      
    DECLARE @CurrentTime DATETIME;    
    DECLARE @ExpiryTime DATETIME;    
    
    SET @CurrentTime = GETDATE();    
    
    SET @ExpiryTime = DATEADD(MINUTE, -1, @CurrentTime);    
    
    IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)
BEGIN      
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;       
        SELECT 1 AS StatusCode, 'OTP Verified' AS ResponseText;
END      
    ELSE IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP)
BEGIN  
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;
SELECT - 1 AS StatusCode, 'OTP Has Expired' AS ResponseText;
END
ELSE
BEGIN
SELECT - 2 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
END
END
GO
/****** Object:  StoredProcedure [dbo].[sp_insert_user]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[sp_insert_user]
@username VARCHAR(100),
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    INSERT INTO tbl_users(username, PasswordHash)
VALUES(@username, @PasswordHash);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Validate_Email]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[sp_Validate_Email]
@Email VARCHAR(100),
    @OTP INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO tbl_Validate_Email(vEmail, vOTP)
VALUES(@Email, @OTP);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_VerifyOTP]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[sp_VerifyOTP]
@Email VARCHAR(100),
    @OTP INT
AS
BEGIN    
    SET NOCOUNT ON;    
    
    DECLARE @IsValid BIT;    
    DECLARE @CurrentTime DATETIME;  
    DECLARE @ExpiryTime DATETIME;  
  
    SET @CurrentTime = GETDATE();  
  
    SET @ExpiryTime = DATEADD(MINUTE, -1, @CurrentTime);  
  
    IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)
BEGIN    
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;     
        SELECT 1 AS StatusCode, 'OTP Verified' AS ResponseText;
END    
    ELSE IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP)
BEGIN
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;
SELECT - 1 AS StatusCode, 'OTP Has Expired' AS ResponseText;
END
ELSE
BEGIN
SELECT - 2 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
END
END
GO
/****** Object:  StoredProcedure [dbo].[UpdateApplicationSetting]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[UpdateApplicationSetting]
@IsSocialAlert BIT,
    @IsEmailVerificationRequired BIT,
        @IsEmailMarketing BIT,
            @IsShowPassword BIT,
                @IsMultipleMobileAllowed BIT,
                    @ProjectID INT,
                        @IsPasswordOnly BIT,
                            @IsReferral BIT,
                                @IsBackUpService bit,
                                    @IsPaymentGateway BIT,
                                        @IsMultipleVendorAllowed BIT,
                                            @IsTwoFactorAuthenticationEnabled BIT,
                                                @MaxLoginAttempts INT,
                                                    @IsSmsNotificationEnabled BIT,
                                                        @IsAppointmentReminderEnabled BIT,
                                                            @IsDoctorAvailabilityNotificationEnabled BIT,
                                                                @IsLabResultsNotificationEnabled BIT,
                                                                    @IsMSServiceEnabled BIT,
                                                                        @IsBillingNotificationEnabled BIT,
                                                                            @IsPrescriptionRefillReminderEnabled BIT,
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
AS
BEGIN    
    BEGIN TRY    
        BEGIN TRANSACTION;    
    
        UPDATE ApplicationSetting
SET
IsSocialAlert = @IsSocialAlert,
    IsEmailVerificationRequired = @IsEmailVerificationRequired,
    IsEmailMarketing = @IsEmailMarketing,
    IsShowPassword = @IsShowPassword,
    IsMultipleMobileAllowed = @IsMultipleMobileAllowed,
    IsPasswordOnly = @IsPasswordOnly,
    IsReferral = @IsReferral,
    IsPaymentGateway = @IsPaymentGateway,
    IsMultipleVendorAllowed = @IsMultipleVendorAllowed,
    IsTwoFactorAuthenticationEnabled = @IsTwoFactorAuthenticationEnabled,
    MaxLoginAttempts = @MaxLoginAttempts,
    IsBackUpService = @IsBackUpService,
    IsSmsNotificationEnabled = @IsSmsNotificationEnabled,
    IsAppointmentReminderEnabled = @IsAppointmentReminderEnabled,
    IsDoctorAvailabilityNotificationEnabled = @IsDoctorAvailabilityNotificationEnabled,
    IsLabResultsNotificationEnabled = @IsLabResultsNotificationEnabled,
    IsMSServiceEnabled = @IsMSServiceEnabled,
    IsBillingNotificationEnabled = @IsBillingNotificationEnabled,
    IsPrescriptionRefillReminderEnabled = @IsPrescriptionRefillReminderEnabled,
    IsPatient = @IsPatient,
    IsDoctor = @IsDoctor,
    SuperAdmin = @SuperAdmin,
    IsAdmin = @IsAdmin,
    Updatedate = Getdate(),
    IsLabManagmentService = @IsLabManagmentService,
    IsLowStorageMedicineNotification = @IsLowStorageMedicineNotification,
    IsAppointmentContactService = @IsAppointmentContactService,
    IsAppointmentFormService = @IsAppointmentFormService,
    IsAppointmentStatus = @IsAppointmentStatus,
    IsWhatsappMarketing = @IsWhatsappMarketing
WHERE
ProjectID = @ProjectID;    
    
        COMMIT TRANSACTION;    
        SELECT 1 AS StatusCode, 'Update Successfully' AS ResponseText;    
    END TRY    
    BEGIN CATCH
SELECT - 1 AS StatusCode, 'An error has been occured!' AS ResponseText;    
    END CATCH
END;
GO
/****** Object:  StoredProcedure [dbo].[usp_UpsertEmailTemplate]    Script Date: 24-06-2024 18:37:46 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE[dbo].[usp_UpsertEmailTemplate]
@TemplateID INT = NULL,
    @TemplateName VARCHAR(255),
        @Subject VARCHAR(255),
            @Body TEXT
AS
BEGIN
    SET NOCOUNT ON;

    IF EXISTS(SELECT 1 FROM EmailTemplates WHERE TemplateID = @TemplateID)
BEGIN
	 UPDATE EmailTemplates
        SET TemplateName = @TemplateName,
    Subject = @Subject,
    Body = @Body,
    CreatedAt = GETDATE()-- Update the CreatedAt field to the current date and time
        WHERE TemplateID = @TemplateID;
		SELECT 1 AS StatusCode, 'Update Successful!' AS ResponseText;


END
ELSE
BEGIN
      
        INSERT INTO EmailTemplates(TemplateName, Subject, Body)
VALUES(@TemplateName, @Subject, @Body);
END
SELECT - 1 AS StatusCode, 'Sorry something went wrong!' AS ResponseText;
END;

GO
USE[master]
GO
ALTER DATABASE[DCS] SET  READ_WRITE
GO





 public async Task < IActionResult > UploadImageInDictionary([FromForm] DictionaryImgUploadReq req)
{
    if (req.Image != null) {
        var res = new Service.Models.Response
        {
            StatusCode = ResponseStatus.Failed,
                ResponseText = "An error han occurred try after sometime."
        };
        var uploadImage = _fileUploadService.Upload(new FileUploadModel
                {
                file = req.Image,
                FileName = $"{DateTime.Now.ToString("ddmmyyhhssmmttt")}",
                FilePath =  FileDirectories.DictionaryImage,
            });
        if (uploadImage.StatusCode != ResponseStatus.Success) {
            res.ResponseText = uploadImage.ResponseText;
            return Ok(res);
        }
        req.ImagePath = uploadImage.ResponseText;
    }

    return Ok(await _specificationMaster.UploadImageInDictionary(new RequestBase < DictionaryImgUploadReq >
    {
        Data = req,
        LoginId = User.GetLoggedInUserId < int > ()
    }));
}




                public async Task < ActionResult > UploadImageInDictionary([FromForm]DictionaryImgUploadReq req)
{


    var response = new Response
    {
        ResponseText = "Failed to save Image.",
            StatusCode = ResponseStatus.Failed
    };
    try {
        req.ImagePath = string.Empty;
        var apiRes = await AppWebRequest.O.SendFileAndContentAsync($"{_BaseURL}/api/Specification/UploadImageInDictionary", User.GetLoggedInUserToken(), req, req.Image, null);
        var apiResponse = await apiRes.Content.ReadAsStringAsync();
        if (apiRes != null && apiRes.IsSuccessStatusCode) {
            response = JsonConvert.DeserializeObject < Response > (apiResponse);
        }
    }
    catch (Exception ex)
    {
        response.ResponseText = "An error has ocurred try after sometime!";
    }
    if (response.StatusCode == ResponseStatus.Success) {
        return Ok(response);
    }
    return BadRequest(response);
}

        public async Task < HttpResponseMessage > SendFileAndContentAsync < TContent > (string apiUrl, string authToken, TContent contentData, Microsoft.AspNetCore.Http.IFormFile file, Microsoft.AspNetCore.Http.IFormFile file1 = null)
{
    try {
        using(var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, apiUrl))
                    {

                        if (!string.IsNullOrEmpty(authToken))
        {
            request.Headers.Add("Authorization", $"Bearer {authToken}");
        }
        var formData = new MultipartFormDataContent();
        if (contentData != null) {
            // Add content parameters
            foreach(var property in typeof (TContent).GetProperties())
            {
                var __value = property.GetValue(contentData);
                if (__value != null) {
                    if (__value.GetType().Name.ToUpper() == "FORMFILE") {
                        file = (Microsoft.AspNetCore.Http.FormFile)__value;
                        if (file != null) {
                            // Add the file to the FormData
                            var fileStream = file.OpenReadStream();
                            var fileContent = new StreamContent(fileStream);
                            formData.Add(fileContent, property.Name, file.FileName);
                        }
                    }
                    else {
                        formData.Add(new StringContent(__value.ToString()), property.Name);
                    }
                }
            }
        }
        request.Content = formData;
        // Send the request
        var res = await httpClient.SendAsync(request);
        return res;
    }

                }
            }
            catch (Exception ex)
{
    throw;
}
        }




public async Task < HttpResponseMessage > SendFileAndContentAsync < TContent > (string apiUrl, string authToken, TContent contentData)
{
    try {
        using(var httpClient = new HttpClient())
            {
                using (var request = new HttpRequestMessage(HttpMethod.Post, apiUrl))
                    {

                        if (!string.IsNullOrEmpty(authToken))
        {
            request.Headers.Add("Authorization", $"Bearer {authToken}");
        }
        var formData = new MultipartFormDataContent();
        if (contentData != null) {
            // Add content parameters
            foreach(var property in typeof (TContent).GetProperties())
            {
                var __value = property.GetValue(contentData);
                if (__value != null) {
                    if (__value.GetType().IsGenericType && __value.GetType().GetGenericTypeDefinition() == typeof (List <>)) {
                        foreach(var item in (List < Microsoft.AspNetCore.Http.IFormFile >)__value)
                        {
                            var file = (Microsoft.AspNetCore.Http.FormFile)item;
                            if (file != null) {
                                // Add the file to the FormData
                                var fileStream = file.OpenReadStream();
                                var fileContent = new StreamContent(fileStream);
                                formData.Add(fileContent, property.Name, file.FileName);
                            }
                        }
                    }
                    else {
                        formData.Add(new StringContent(__value.ToString()), property.Name);
                    }
                }
            }
        }
        request.Content = formData;
        // Send the request
        var res = await httpClient.SendAsync(request);
        return res;
    }

                }
            }
            catch (Exception ex)
{
    throw;
}
        }



public string GetFormatedNotifications(string template, NotificationKeywordsReplacement param)
{
            StringBuilder sb = new StringBuilder(template);

    sb.Replace("{AuctionOpenAt}", param.AuctionOpenAt);
    sb.Replace("{AuctionEndAt}", param.AuctionEndAt);
    sb.Replace("{AccountNumber}", param.AccountNumber);
    sb.Replace("{Amount}", param.Amount?.ToString());
    sb.Replace("{BalanceAmount}", param.BalanceAmount?.ToString());
    sb.Replace("{BidAmount}", param.BidAmount?.ToString());
    sb.Replace("{BidderName}", param.BidderName);
    sb.Replace("{BidSubmissionDate}", param.BidSubmissionDate);
    sb.Replace("{CompanyAddress}", param.CompanyAddress);
    sb.Replace("{CompanyDomain}", param.CompanyDomain);
    sb.Replace("{CompanyEmail}", param.CompanyEmail);
    sb.Replace("{CompanyMobile}", param.CompanyMobile);
    sb.Replace("{CompanyName}", param.CompanyName);
    sb.Replace("{FromMobileNo}", param.FromMobileNo);
    sb.Replace("{FromUserName}", param.FromUserName);
    sb.Replace("{IFSC}", param.IFSC);
    sb.Replace("{LoginID}", param.LoginID);
    sb.Replace("{Message}", param.Message);
    sb.Replace("{Mobile}", param.Mobile);
    sb.Replace("{OTP}", param.OTP);
    sb.Replace("{Password}", param.Password);
    sb.Replace("{PinPassword}", param.PinPassword);
    sb.Replace("{ProductName}", param.ProductName);
    sb.Replace("{RecipientName}", param.RecipientName);
    sb.Replace("{SenderName}", param.SenderName);
    sb.Replace("{ToMobileNo}", param.ToMobileNo);
    sb.Replace("{ToUserName}", param.ToUserName);
    sb.Replace("{TransactionID}", param.TransactionID);
    sb.Replace("{TransactionDate}", param.TransactionDate);
    sb.Replace("{TransMode}", param.TransMode);
    sb.Replace("{UserEmail}", param.UserEmail);
    sb.Replace("{UserName}", param.UserName);
    sb.Replace("{UTRorRRN}", param.UTRorRRN);


    return sb.ToString();
}

