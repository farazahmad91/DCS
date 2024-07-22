USE[master]
GO
/****** Object:  Database [DCS2]    Script Date: 19-07-2024 17:35:38 ******/
CREATE DATABASE[DCS2]
CONTAINMENT = NONE
 ON  PRIMARY
    (NAME = N'DCS2', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER03\MSSQL\DATA\DCS2.mdf', SIZE = 8192KB, MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB)
 LOG ON
    (NAME = N'DCS2_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER03\MSSQL\DATA\DCS2_log.ldf', SIZE = 8192KB, MAXSIZE = 2048GB, FILEGROWTH = 65536KB)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE[DCS2] SET COMPATIBILITY_LEVEL = 160
GO
IF(1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC[DCS2].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE[DCS2] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE[DCS2] SET ANSI_NULLS OFF
GO
ALTER DATABASE[DCS2] SET ANSI_PADDING OFF
GO
ALTER DATABASE[DCS2] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE[DCS2] SET ARITHABORT OFF
GO
ALTER DATABASE[DCS2] SET AUTO_CLOSE OFF
GO
ALTER DATABASE[DCS2] SET AUTO_SHRINK OFF
GO
ALTER DATABASE[DCS2] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE[DCS2] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE[DCS2] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE[DCS2] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE[DCS2] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE[DCS2] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE[DCS2] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE[DCS2] SET  ENABLE_BROKER
GO
ALTER DATABASE[DCS2] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE[DCS2] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE[DCS2] SET TRUSTWORTHY OFF
GO
ALTER DATABASE[DCS2] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE[DCS2] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE[DCS2] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE[DCS2] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE[DCS2] SET RECOVERY FULL
GO
ALTER DATABASE[DCS2] SET  MULTI_USER
GO
ALTER DATABASE[DCS2] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE[DCS2] SET DB_CHAINING OFF
GO
ALTER DATABASE[DCS2] SET FILESTREAM(NON_TRANSACTED_ACCESS = OFF)
GO
ALTER DATABASE[DCS2] SET TARGET_RECOVERY_TIME = 60 SECONDS
GO
ALTER DATABASE[DCS2] SET DELAYED_DURABILITY = DISABLED
GO
ALTER DATABASE[DCS2] SET ACCELERATED_DATABASE_RECOVERY = OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'DCS2', N'ON'
GO
ALTER DATABASE[DCS2] SET QUERY_STORE = ON
GO
ALTER DATABASE[DCS2] SET QUERY_STORE(OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE[DCS2]
GO
/****** Object:  UserDefinedTableType [dbo].[InvoiceItemType]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  UserDefinedTableType [dbo].[MedicationType]    Script Date: 19-07-2024 17:35:39 ******/
CREATE TYPE[dbo].[MedicationType] AS TABLE(
    [Name][nvarchar](100) NULL,
    [Dosage][nvarchar](50) NULL,
    [Frequency][nvarchar](50) NULL,
    [FollowUpDate][nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TransactionDetailType]    Script Date: 19-07-2024 17:35:39 ******/
CREATE TYPE[dbo].[TransactionDetailType] AS TABLE(
    [InvoiceID][int] NULL,
    [Mode][nvarchar](50) NULL,
    [TransactionId][nvarchar](50) NULL,
    [IsPaid][bit] NULL,
    [DueDate][nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TransactionType]    Script Date: 19-07-2024 17:35:39 ******/
CREATE TYPE[dbo].[TransactionType] AS TABLE(
    [Mode][nvarchar](50) NULL,
    [TransactionId][nvarchar](50) NULL,
    [IsPaid][bit] NULL,
    [DueDate][nvarchar](50) NULL
)
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[ApplicationSetting]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Appointments]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[AspNetUsers](
    [Id][nvarchar](450) NOT NULL,
    [Name][nvarchar](max) NOT NULL,
    [ProjectId][int] NOT NULL,
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
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Doctors]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Doctors](
    [DrId][int] IDENTITY(101, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[EmailLogs]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[EmailTemplates]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[EmailTemplates](
    [TemplateID][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
    [EmailType][nvarchar](255) NULL,
    [Subject][nvarchar](255) NULL,
    [TemplateImage][nvarchar](255) NULL,
    [Content][nvarchar](max) NULL,
    [CreatedAt][nvarchar](255) NULL,
    [Status][int] NULL,
    [UpdateOn][varchar](255) NULL,
    PRIMARY KEY CLUSTERED
    (
        [TemplateID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY] TEXTIMAGE_ON[PRIMARY]
GO
/****** Object:  Table [dbo].[ErrorLog]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[ErrorLog](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[FAQs]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[FAQs](
    [FAQID][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[Invoice]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Invoice](
    [InvoiceID][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[InvoiceItem]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[MedicalHistory]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Medication]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Medicines]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Medicines](
    [MedicineID][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[MedicineStocks]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[MedicinesType]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Patient_Services]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Patients]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Patients](
    [PId][int] IDENTITY(101, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[Payments]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Payments](
    [PaymentID][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[PremiumService]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[PremiumService](
    [ServiceID][int] IDENTITY(101, 1) NOT NULL,
    [ServiceName][varchar](255) NULL,
    [Description][varchar](255) NULL,
    [Price][decimal](10, 2) NULL,
    [LastPrice][decimal](10, 2) NULL,
    [Duration][varchar](255) NULL,
    [RenewalOption][bit] NULL,
    [Discounts][decimal](10, 2) NULL,
    [CustomerSupportLevel][varchar](255) NULL,
    [TermsAndConditions][varchar](255) NULL,
    [UpdatedAt][varchar](255) NULL,
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
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Projects]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Projects](
    [Id][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
    [Email][varchar](255) NULL,
    [ProjectName][varchar](255) NULL,
    [UpdatedProjectName][varchar](255) NULL,
    [Logo][nvarchar](255) NULL,
    [UpdatedLogo][nvarchar](255) NULL,
    [DomainName][varchar](255) NULL,
    [UpdatedDomainName][varchar](255) NULL,
    [Status][int] NULL,
    [Purchase_Date][datetime] NULL,
    [Update_Date][datetime] NULL
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Purchases]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Purchases](
    [PurchaseID][int] IDENTITY(1101, 1) NOT NULL,
    [UserEmail][varchar](255) NULL,
    [ProjectId][int] NULL,
    [ServiceID][int] NULL,
    [PurchaseDate][datetime] NULL,
    [ExpiryDate][varchar](255) NULL,
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
/****** Object:  Table [dbo].[Reviews]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Services]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[SocialMedia]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[SocialMedia](
    [SMId][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NOT NULL,
    [PlateformName][varchar](255) NULL,
    [PlateformLink][varchar](255) NULL,
    [Icons][varchar](255) NULL,
    [Status][int] NULL,
    [EntryOn][varchar](255) NULL,
    [UpdateOn][varchar](255) NULL,
    PRIMARY KEY CLUSTERED
    (
        [SMId] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_PageErrorLog]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[tbl_PageErrorLog](
    [_ID][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
    [_ClsName][varchar](100) NULL,
    [_FnName][varchar](100) NULL,
    [_ProcName][varchar](100) NULL,
    [_UserID][int] NULL,
    [_Error][nvarchar](500) NULL,
    [_EntryDate][datetime] NULL
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[tbl_users]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[tbl_Validate_Email]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[tbl_Validate_Email](
    [vID][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
    [vEmail][varchar](100) NULL,
    [vOTP][int] NULL,
    [vEntry][datetime] NULL,
    PRIMARY KEY CLUSTERED
    (
        [vID] ASC
    )WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[TransactionDetails]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[Treatment]    Script Date: 19-07-2024 17:35:39 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Treatment](
    [TreatmentId][int] IDENTITY(1, 1) NOT NULL,
    [ProjectId][int] NULL,
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
/****** Object:  Table [dbo].[UserLogins]    Script Date: 19-07-2024 17:35:39 ******/
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
/****** Object:  Table [dbo].[WorkingHours]    Script Date: 19-07-2024 17:35:39 ******/
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
INSERT[dbo].[__EFMigrationsHistory]([MigrationId], [ProductVersion]) VALUES(N'20240709105629_InitialCreate', N'8.0.5')
GO
SET IDENTITY_INSERT[dbo].[ApplicationSetting] ON
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(1, 152797, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, CAST(N'2024-07-01T13:14:19.580' AS DateTime), CAST(N'2024-07-05T18:11:21.307' AS DateTime), 1, 0, 1, 1, 0, 0, 1)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(2, 267299, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-04T12:03:19.967' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(3, 293152, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-04T12:03:39.657' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(4, 96560, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-04T12:09:34.253' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(5, 410965, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-04T13:23:57.060' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(6, 438490, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-04T15:46:13.573' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(7, 869023, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-04T16:44:08.620' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(8, 490758, 0, 1, 1, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-05T18:12:51.767' AS DateTime), CAST(N'2024-07-08T13:09:44.220' AS DateTime), 1, 0, 1, 1, 0, 0, 1)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(9, 915990, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-15T15:49:17.657' AS DateTime), CAST(N'2024-07-15T15:52:58.320' AS DateTime), 0, 0, 1, 1, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(10, 228008, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-15T16:03:30.033' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(11, 885617, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-15T16:07:48.867' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
INSERT[dbo].[ApplicationSetting]([AppId], [ProjectID], [IsSocialAlert], [IsEmailVerificationRequired], [IsEmailMarketing], [IsShowPassword], [IsMultipleMobileAllowed], [IsPasswordOnly], [IsReferral], [IsBackUpService], [IsPaymentGateway], [IsMultipleVendorAllowed], [IsTwoFactorAuthenticationEnabled], [MaxLoginAttempts], [IsSmsNotificationEnabled], [IsAppointmentReminderEnabled], [IsDoctorAvailabilityNotificationEnabled], [IsLabResultsNotificationEnabled], [IsMSServiceEnabled], [IsBillingNotificationEnabled], [IsPrescriptionRefillReminderEnabled], [IsPatient], [IsDoctor], [SuperAdmin], [IsAdmin], [EntryOn], [Updatedate], [IsLabManagmentService], [IsLowStorageMedicineNotification], [IsAppointmentContactService], [IsAppointmentFormService], [IsAppointmentStatus], [IsWhatsappMarketing], [IsDarkModeEnabled]) VALUES(12, 253066, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, CAST(N'2024-07-15T16:09:40.220' AS DateTime), NULL, NULL, 0, 0, 0, 0, 0, 0)
GO
SET IDENTITY_INSERT[dbo].[ApplicationSetting] OFF
GO
INSERT[dbo].[AspNetRoles]([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES(N'4b19e8f7-1fd2-4c4a-8d49-9928ef8ea8f2', N'Client', N'CLIENT', NULL)
GO
INSERT[dbo].[AspNetRoles]([Id], [Name], [NormalizedName], [ConcurrencyStamp]) VALUES(N'a0113d10-29c1-454e-aa8a-982933c41b61', N'Merchant', N'MERCHANT', NULL)
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'4d38c350-d3ae-4e67-b07a-9615cf68dffd', N'4b19e8f7-1fd2-4c4a-8d49-9928ef8ea8f2')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'5e847681-40b1-4268-8e74-f990cf9c09c1', N'4b19e8f7-1fd2-4c4a-8d49-9928ef8ea8f2')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'896cd02e-c21a-4e2c-a519-74517937924f', N'4b19e8f7-1fd2-4c4a-8d49-9928ef8ea8f2')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'bb643000-29b1-4c10-9959-4b04646a2120', N'4b19e8f7-1fd2-4c4a-8d49-9928ef8ea8f2')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'd1428fa4-6147-4466-9b28-33f13c9ffb3d', N'4b19e8f7-1fd2-4c4a-8d49-9928ef8ea8f2')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'2cc58fc7-126a-40e5-8b3f-709f9d08a75c', N'a0113d10-29c1-454e-aa8a-982933c41b61')
GO
INSERT[dbo].[AspNetUserRoles]([UserId], [RoleId]) VALUES(N'e7695a7a-a46a-4511-b4c7-4e0dfa479bc0', N'a0113d10-29c1-454e-aa8a-982933c41b61')
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [ProjectId], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'2cc58fc7-126a-40e5-8b3f-709f9d08a75c', N'Naved', 253066, N'989037987984', N'mohammadnaved1517@gmail.com', N'MOHAMMADNAVED1517@GMAIL.COM', N'mohammadnaved1517@gmail.com', N'MOHAMMADNAVED1517@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEABbY+TfWzkIkctUH/w2RhHd5rCv0YoZfN+ly+eZ6eoFexWBo8bue4IrcOtGAuWz9w==', N'SRDLSFTCZANUZBLY7S75QKHAY46N5NK4', N'3743222b-d71a-47a6-a948-2b7526802cfc', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [ProjectId], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'4d38c350-d3ae-4e67-b07a-9615cf68dffd', N'mohd faraz', 0, N'06390535446', N'Farazshhahgikh8960@example.com', N'FARAZSHHAHGIKH8960@EXAMPLE.COM', N'Farazshhahgikh8960@example.com', N'FARAZSHHAHGIKH8960@EXAMPLE.COM', 1, N'AQAAAAIAAYagAAAAECSKuSBxOTMzBM+FSZiJrBGvgXw5mxsu40vSbEiY2AJTZuomP0/Kjr39jxfTLV2R8g==', N'CII7PF6XY35FSGITQLX2LCO3VVFCJ7HT', N'23f75db1-a2de-4c9f-93ff-7dbb85d105ac', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [ProjectId], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'5e847681-40b1-4268-8e74-f990cf9c09c1', N'mohd faraz', 0, N'06390535446', N'Farazshfyfdshhaikh8960@example.com', N'FARAZSHFYFDSHHAIKH8960@EXAMPLE.COM', N'Farazshfyfdshhaikh8960@example.com', N'FARAZSHFYFDSHHAIKH8960@EXAMPLE.COM', 1, N'AQAAAAIAAYagAAAAEJRcowyPq3LDKrvlzyKoKvdm2AVp3NsqDiOdCX5r0q8izMmfhuLJ8bBX7NzjWO2adA==', N'CTVBKGZSLBLO3FX6UJRYZVRPPD4OYHGE', N'8f180db3-bded-4241-8ca2-cbb40ed9af76', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [ProjectId], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'896cd02e-c21a-4e2c-a519-74517937924f', N'mohd faraz', 0, N'06390535446', N'Farazshfyfhhaikh8960@example.com', N'FARAZSHFYFHHAIKH8960@EXAMPLE.COM', N'Farazshfyfhhaikh8960@example.com', N'FARAZSHFYFHHAIKH8960@EXAMPLE.COM', 1, N'AQAAAAIAAYagAAAAEO/0Ncllfpc/o6X5zGcZnQgHMlhqkLOwBtCRhH+bt8jiLC7Y8Ee3XE31F44l8LCDfQ==', N'B3T7AXZH242J44ZA7LFYN6SMI3T75LBT', N'3cdabdc0-0a56-4f7d-9d25-3b56ad98d6c9', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [ProjectId], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'bb643000-29b1-4c10-9959-4b04646a2120', N'string', 253066, N'2645611646', N'Farazshaikh8960@example.com', N'FARAZSHAIKH8960@EXAMPLE.COM', N'Farazshaikh8960@example.com', N'FARAZSHAIKH8960@EXAMPLE.COM', 1, N'AQAAAAIAAYagAAAAEK9+jOV3m+OGJFpGuroJNHx7/86AEZBw5q25Zo4w1NqCni4dPhOd45TXoYrkXaZbpg==', N'I572DN3HSHKBWOZYPTINQLCQ3SCJLRLK', N'6b219df6-5033-4071-bbeb-a677918b3319', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [ProjectId], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'd1428fa4-6147-4466-9b28-33f13c9ffb3d', N'mohd faraz', 0, N'06390535446', N'Farazshhaikh8960@example.com', N'FARAZSHHAIKH8960@EXAMPLE.COM', N'Farazshhaikh8960@example.com', N'FARAZSHHAIKH8960@EXAMPLE.COM', 1, N'AQAAAAIAAYagAAAAEOpiAWz30vxH83qb4yI4d+/gVHEg0a22PVWP9BXPCa34C8AOjQZCGQMVZVRUq5fp4A==', N'HVLNGCGLGI73X7QAY7JTQCBR37MV4MSL', N'fb247ac4-482e-472d-a13b-13c39bc83dc2', NULL, 0, 0, NULL, 1, 0)
GO
INSERT[dbo].[AspNetUsers]([Id], [Name], [ProjectId], [PhoneNo], [UserName], [NormalizedUserName], [Email], [NormalizedEmail], [EmailConfirmed], [PasswordHash], [SecurityStamp], [ConcurrencyStamp], [PhoneNumber], [PhoneNumberConfirmed], [TwoFactorEnabled], [LockoutEnd], [LockoutEnabled], [AccessFailedCount]) VALUES(N'e7695a7a-a46a-4511-b4c7-4e0dfa479bc0', N'faraz', 915990, N'989037987984', N'farazshaikh89960@gmail.com', N'FARAZSHAIKH89960@GMAIL.COM', N'farazshaikh89960@gmail.com', N'FARAZSHAIKH89960@GMAIL.COM', 1, N'AQAAAAIAAYagAAAAEMDImlnHhc9o5wOjG6azRetnvxwcv5icR6YK1nA8ul2uxAjdgFJjItNUG/H3WXHBwg==', N'FDUYAV7B52OMBV56656JCH2SMS662NLL', N'e3653d4f-7b5f-4282-b734-a9a825938cc7', NULL, 0, 0, NULL, 1, 0)
GO
SET IDENTITY_INSERT[dbo].[Doctors] ON
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(101, NULL, N'fdfd', N'ghjgh', N'ghjghj', N'https://localhost:7079//images/Specification/Dictionary/140524061705PM.png', N'ghjgh', N'ghjgh', N'g', N'ghjh', N'ghjghj', 7, N'bnmbm', N'bnmnbm', CAST(9.90 AS Decimal(10, 2)), N'bnmnb', 6, CAST(N'2024-06-14T18:05:21.437' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(102, NULL, N'fdfd', N'ghjgh', N'ghjghj', N'https://localhost:7079//images/Specification/Dictionary/140824061208PM.png', N'ghjgh', N'ghjgh', N'g', N'ghjh', N'ghjghj', 7, N'bnmbm', N'bnmnbm', CAST(9.90 AS Decimal(10, 2)), N'bnmnb', 6, CAST(N'2024-06-14T18:08:17.967' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(103, NULL, N'fdfd', N'ghjghj', N'ghjghj', N'https://localhost:7079//images/142224060422PM.png', N'ghjghj', N'ghjgh', N'g', N'ghjghj', N'ghjghj', 6, N'ghjg', N'ghjgh', CAST(99.90 AS Decimal(10, 2)), N'gfgfh', 5, CAST(N'2024-06-14T18:22:11.527' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(104, NULL, N'fdfd', N'gfg', N'657575676', N'http://localhost:5085//images/143924062539PM.png', N'yuyjh', N'hfgh', N'y', N'56756', N'ythyt', 56, N'ty', N'tyh', CAST(677.00 AS Decimal(10, 2)), N'yt', 97, CAST(N'2024-06-14T18:39:38.637' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(105, NULL, N'fdfd', N'nbvnbnm', N'bnmnbm', N'http://localhost:5085//images/144924062249PM.png', N'bnmnbm', N'bnmnbm', N'b', N'nbmnb', N'nbmnbm', 7, N'nm,mn,', N'nm,mn', CAST(99.00 AS Decimal(10, 2)), N'mn,mn', 8, CAST(N'2024-06-14T18:49:27.193' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(106, NULL, N'fdfd', NULL, NULL, N'/images/76c4213d-64ee-4243-a055-e2202151c180_bmw.PNG', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, CAST(0.00 AS Decimal(10, 2)), NULL, 0, CAST(N'2024-06-26T11:02:14.103' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(107, NULL, N'fdfd', NULL, NULL, N'https://localhost:7079/images/7ece5940-b242-4180-b7f2-967aa2c6f9dd_bmw.PNG', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, CAST(0.00 AS Decimal(10, 2)), NULL, 0, CAST(N'2024-06-26T11:12:22.793' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(108, NULL, N'fdfd', NULL, NULL, N'https://localhost:7079/DoctorImage/77636982-fb62-4daf-9629-fdb050787f71_bmw.PNG', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, CAST(0.00 AS Decimal(10, 2)), NULL, 0, CAST(N'2024-06-27T11:41:34.960' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(109, NULL, NULL, NULL, NULL, N'https://localhost:7079/DoctorImage/d42a96e2-b6f1-46fb-bd01-f2e161320799_bmw.PNG', NULL, NULL, NULL, NULL, NULL, 0, NULL, NULL, CAST(0.00 AS Decimal(10, 2)), NULL, 0, CAST(N'2024-06-27T18:30:43.540' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(110, NULL, N'sfa', N'sfas', N'asfas', N'https://localhost:7079/DoctorImage/8c0e058f-7ff7-4e65-9863-62299328af44_bmw.PNG', NULL, N'asfsa', N'a', N'29/06/2024', N'asfsaf', 0, N'asfas', N'asfsa', CAST(67867.00 AS Decimal(10, 2)), N'asfas', 0, CAST(N'2024-06-29T18:52:34.517' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(111, NULL, N'faraz', N'farazshaikh8960@gmail.com', N'fghfghfg', N'https://localhost:7079/DoctorImage/b9962681-84de-48d1-a45e-2d7ed45b722b_bmw.PNG', NULL, N'dsfsdf', N'f', N'04/07/2024', N'asafas', 0, N'asfsaf', N'asfas', CAST(67867.00 AS Decimal(10, 2)), N'safas', 0, CAST(N'2024-07-04T11:56:08.267' AS DateTime))
GO
INSERT[dbo].[Doctors]([DrId], [ProjectId], [Name], [Email], [Phone], [DrImage], [Address], [Specialization], [Gender], [DateOfBirth], [Qualifications], [ExperienceYears], [Affiliations], [Languages], [ConsultationFee], [Availability], [Status], [EntryOn]) VALUES(112, NULL, N'Faraz shaikh', N'faraz8960@gmail.com', N'06390535446', N'https://localhost:7079/DoctorImage/54189517-5b74-489a-9401-10cdedd7498d_d72kx6mm.png', NULL, N'sdfgg', N'd', N'11/11/2024', N'dfgfhfgh', 0, N'dfhfgfh', N'fdhg', CAST(567.00 AS Decimal(10, 2)), N'fdhfg', 0, CAST(N'2024-07-13T15:36:55.317' AS DateTime))
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
SET IDENTITY_INSERT[dbo].[EmailTemplates] ON
GO
INSERT[dbo].[EmailTemplates]([TemplateID], [ProjectId], [EmailType], [Subject], [TemplateImage], [Content], [CreatedAt], [Status], [UpdateOn]) VALUES(1, 253066, N'sdfsdf', N'sdfsdf', N'https://localhost:7079/DoctorImage/34c06a85-4c9d-4010-8d76-fe8cb053177c_logo.png', N'
    < !DOCTYPE html >
<html lang="en">


    <!-- Mirrored from coderthemes.com/hyper/saas/form-advanced.html by HTTrack Website Copier/3.x [XR&CO''2014], Tue, 05 Dec 2023 10:44:38 GMT -->
    <head>
        <meta charset="utf-8" />
        <title>Form Advanced | Hyper - Responsive Bootstrap 5 Admin Dashboard</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta content="A fully featured admin theme which can be used to build CRM, CMS, etc." name="description" />
            <meta content="Coderthemes" name="author" />

            <!-- App favicon -->
            <link rel="shortcut icon" href="assets/images/favicon.ico">

                <!-- Select2 css -->
                <link href="assets/vendor/select2/css/select2.min.css" rel="stylesheet" type="text/css" />

                <!-- Daterangepicker css -->
                <link href="assets/vendor/daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css" />

                <!-- Bootstrap Touchspin css -->
                <link href="assets/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" type="text/css" />

                <!-- Bootstrap Datepicker css -->
                <link href="assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker.min.css" rel="stylesheet" type="text/css" />

                <!-- Bootstrap Timepicker css -->
                <link href="assets/vendor/bootstrap-timepicker/css/bootstrap-timepicker.min.css" rel="stylesheet" type="text/css" />

                <!-- Flatpickr Timepicker css -->
                <link href="assets/vendor/flatpickr/flatpickr.min.css" rel="stylesheet" type="text/css" />

                <!-- Theme Config Js -->
                <script src="assets/js/hyper-config.js"></script>

                <!-- App css -->
                <link href="assets/css/app-saas.min.css" rel="stylesheet" type="text/css" id="app-style" />

                <!-- Icons css -->
                <link href="assets/css/icons.min.css" rel="stylesheet" type="text/css" />
            </head>

            <body>
                <!-- Begin page -->
                <div class="wrapper">


                    <!-- ========== Topbar Start ========== -->
                    <div class="navbar-custom">
                        <div class="topbar container-fluid">
                            <div class="d-flex align-items-center gap-lg-2 gap-1">

                                <!-- Topbar Brand Logo -->
                                <div class="logo-topbar">
                                    <!-- Logo light -->
                                    <a href="index.html" class="logo-light">
                                        <span class="logo-lg">
                                            <img src="assets/images/logo.png" alt="logo">
                                        </span>
                                        <span class="logo-sm">
                                            <img src="assets/images/logo-sm.png" alt="small logo">
                                        </span>
                                    </a>

                                    <!-- Logo Dark -->
                                    <a href="index.html" class="logo-dark">
                                        <span class="logo-lg">
                                            <img src="assets/images/logo-dark.png" alt="dark logo">
                                        </span>
                                        <span class="logo-sm">
                                            <img src="assets/images/logo-dark-sm.png" alt="small logo">
                                        </span>
                                    </a>
                                </div>

                                <!-- Sidebar Menu Toggle Button -->
                                <button class="button-toggle-menu">
                                    <i class="mdi mdi-menu"></i>
                                </button>

                                <!-- Horizontal Menu Toggle Button -->
                                <button class="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                                    <div class="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </button>

                                <!-- Topbar Search Form -->
                                <div class="app-search dropdown d-none d-lg-block">
                                    <form>
                                        <div class="input-group">
                                            <input type="search" class="form-control dropdown-toggle" placeholder="Search..." id="top-search">
                                                <span class="mdi mdi-magnify search-icon"></span>
                                                <button class="input-group-text btn btn-primary" type="submit">Search</button>
                                        </div>
                                    </form>

                                    <div class="dropdown-menu dropdown-menu-animated dropdown-lg" id="search-dropdown">
                                        <!-- item-->
                                        <div class="dropdown-header noti-title">
                                            <h5 class="text-overflow mb-2">Found <span class="text-danger">17</span> results</h5>
                                        </div>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <i class="uil-notes font-16 me-1"></i>
                                            <span>Analytics Report</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <i class="uil-life-ring font-16 me-1"></i>
                                            <span>How can I help you?</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item notify-item">
                                            <i class="uil-cog font-16 me-1"></i>
                                            <span>User profile settings</span>
                                        </a>

                                        <!-- item-->
                                        <div class="dropdown-header noti-title">
                                            <h6 class="text-overflow mb-2 text-uppercase">Users</h6>
                                        </div>

                                        <div class="notification-list">
                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                                <div class="d-flex">
                                                    <img class="d-flex me-2 rounded-circle" src="assets/images/users/avatar-2.jpg" alt="Generic placeholder image" height="32">
                                                        <div class="w-100">
                                                            <h5 class="m-0 font-14">Erwin Brown</h5>
                                                            <span class="font-12 mb-0">UI Designer</span>
                                                        </div>
                                                </div>
                                            </a>

                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item notify-item">
                                                <div class="d-flex">
                                                    <img class="d-flex me-2 rounded-circle" src="assets/images/users/avatar-5.jpg" alt="Generic placeholder image" height="32">
                                                        <div class="w-100">
                                                            <h5 class="m-0 font-14">Jacob Deo</h5>
                                                            <span class="font-12 mb-0">Developer</span>
                                                        </div>
                                                </div>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <ul class="topbar-menu d-flex align-items-center gap-3">
                                <li class="dropdown d-lg-none">
                                    <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <i class="ri-search-line font-22"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                        <form class="p-3">
                                            <input type="search" class="form-control" placeholder="Search ..." aria-label="Recipient''s username">
                                        </form>
                                    </div>
                                </li>

                                <li class="dropdown">
                                    <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <img src="assets/images/flags/us.jpg" alt="user-image" class="me-0 me-sm-1" height="12">
                                            <span class="align-middle d-none d-lg-inline-block">English</span> <i class="mdi mdi-chevron-down d-none d-sm-inline-block align-middle"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated">

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <img src="assets/images/flags/germany.jpg" alt="user-image" class="me-1" height="12"> <span class="align-middle">German</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <img src="assets/images/flags/italy.jpg" alt="user-image" class="me-1" height="12"> <span class="align-middle">Italian</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <img src="assets/images/flags/spain.jpg" alt="user-image" class="me-1" height="12"> <span class="align-middle">Spanish</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <img src="assets/images/flags/russia.jpg" alt="user-image" class="me-1" height="12"> <span class="align-middle">Russian</span>
                                        </a>

                                    </div>
                                </li>

                                <li class="dropdown notification-list">
                                    <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <i class="ri-notification-3-line font-22"></i>
                                        <span class="noti-icon-badge"></span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg py-0">
                                        <div class="p-2 border-top-0 border-start-0 border-end-0 border-dashed border">
                                            <div class="row align-items-center">
                                                <div class="col">
                                                    <h6 class="m-0 font-16 fw-semibold"> Notification</h6>
                                                </div>
                                                <div class="col-auto">
                                                    <a href="javascript: void(0);" class="text-dark text-decoration-underline">
                                                        <small>Clear All</small>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="px-2" style="max-height: 300px;" data-simplebar>

                                            <h5 class="text-muted font-13 fw-normal mt-2">Today</h5>
                                            <!-- item-->

                                            <a href="javascript:void(0);" class="dropdown-item p-0 notify-item card unread-noti shadow-none mb-2">
                                                <div class="card-body">
                                                    <span class="float-end noti-close-btn text-muted"><i class="mdi mdi-close"></i></span>
                                                    <div class="d-flex align-items-center">
                                                        <div class="flex-shrink-0">
                                                            <div class="notify-icon bg-primary">
                                                                <i class="mdi mdi-comment-account-outline"></i>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 text-truncate ms-2">
                                                            <h5 class="noti-item-title fw-semibold font-14">Datacorp <small class="fw-normal text-muted ms-1">1 min ago</small></h5>
                                                            <small class="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                                                <div class="card-body">
                                                    <span class="float-end noti-close-btn text-muted"><i class="mdi mdi-close"></i></span>
                                                    <div class="d-flex align-items-center">
                                                        <div class="flex-shrink-0">
                                                            <div class="notify-icon bg-info">
                                                                <i class="mdi mdi-account-plus"></i>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 text-truncate ms-2">
                                                            <h5 class="noti-item-title fw-semibold font-14">Admin <small class="fw-normal text-muted ms-1">1 hours ago</small></h5>
                                                            <small class="noti-item-subtitle text-muted">New user registered</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <h5 class="text-muted font-13 fw-normal mt-0">Yesterday</h5>

                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                                                <div class="card-body">
                                                    <span class="float-end noti-close-btn text-muted"><i class="mdi mdi-close"></i></span>
                                                    <div class="d-flex align-items-center">
                                                        <div class="flex-shrink-0">
                                                            <div class="notify-icon">
                                                                <img src="assets/images/users/avatar-2.jpg" class="img-fluid rounded-circle" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 text-truncate ms-2">
                                                            <h5 class="noti-item-title fw-semibold font-14">Cristina Pride <small class="fw-normal text-muted ms-1">1 day ago</small></h5>
                                                            <small class="noti-item-subtitle text-muted">Hi, How are you? What about our next meeting</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <h5 class="text-muted font-13 fw-normal mt-0">30 Dec 2021</h5>

                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                                                <div class="card-body">
                                                    <span class="float-end noti-close-btn text-muted"><i class="mdi mdi-close"></i></span>
                                                    <div class="d-flex align-items-center">
                                                        <div class="flex-shrink-0">
                                                            <div class="notify-icon bg-primary">
                                                                <i class="mdi mdi-comment-account-outline"></i>
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 text-truncate ms-2">
                                                            <h5 class="noti-item-title fw-semibold font-14">Datacorp</h5>
                                                            <small class="noti-item-subtitle text-muted">Caleb Flakelar commented on Admin</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <!-- item-->
                                            <a href="javascript:void(0);" class="dropdown-item p-0 notify-item card read-noti shadow-none mb-2">
                                                <div class="card-body">
                                                    <span class="float-end noti-close-btn text-muted"><i class="mdi mdi-close"></i></span>
                                                    <div class="d-flex align-items-center">
                                                        <div class="flex-shrink-0">
                                                            <div class="notify-icon">
                                                                <img src="assets/images/users/avatar-4.jpg" class="img-fluid rounded-circle" alt="" />
                                                            </div>
                                                        </div>
                                                        <div class="flex-grow-1 text-truncate ms-2">
                                                            <h5 class="noti-item-title fw-semibold font-14">Karen Robinson</h5>
                                                            <small class="noti-item-subtitle text-muted">Wow ! this admin looks good and awesome design</small>
                                                        </div>
                                                    </div>
                                                </div>
                                            </a>

                                            <div class="text-center">
                                                <i class="mdi mdi-dots-circle mdi-spin text-muted h3 mt-0"></i>
                                            </div>
                                        </div>

                                        <!-- All-->
                                        <a href="javascript:void(0);" class="dropdown-item text-center text-primary notify-item border-top py-2">
                                            View All
                                        </a>

                                    </div>
                                </li>

                                <li class="dropdown d-none d-sm-inline-block">
                                    <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <i class="ri-apps-2-line font-22"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated dropdown-lg p-0">

                                        <div class="p-2">
                                            <div class="row g-0">
                                                <div class="col">
                                                    <a class="dropdown-icon-item" href="#">
                                                        <img src="assets/images/brands/slack.png" alt="slack">
                                                            <span>Slack</span>
                                                    </a>
                                                </div>
                                                <div class="col">
                                                    <a class="dropdown-icon-item" href="#">
                                                        <img src="assets/images/brands/github.png" alt="Github">
                                                            <span>GitHub</span>
                                                    </a>
                                                </div>
                                                <div class="col">
                                                    <a class="dropdown-icon-item" href="#">
                                                        <img src="assets/images/brands/dribbble.png" alt="dribbble">
                                                            <span>Dribbble</span>
                                                    </a>
                                                </div>
                                            </div>

                                            <div class="row g-0">
                                                <div class="col">
                                                    <a class="dropdown-icon-item" href="#">
                                                        <img src="assets/images/brands/bitbucket.png" alt="bitbucket">
                                                            <span>Bitbucket</span>
                                                    </a>
                                                </div>
                                                <div class="col">
                                                    <a class="dropdown-icon-item" href="#">
                                                        <img src="assets/images/brands/dropbox.png" alt="dropbox">
                                                            <span>Dropbox</span>
                                                    </a>
                                                </div>
                                                <div class="col">
                                                    <a class="dropdown-icon-item" href="#">
                                                        <img src="assets/images/brands/g-suite.png" alt="G Suite">
                                                            <span>G Suite</span>
                                                    </a>
                                                </div>
                                            </div> <!-- end row-->
                                        </div>

                                    </div>
                                </li>

                                <li class="d-none d-sm-inline-block">
                                    <a class="nav-link" data-bs-toggle="offcanvas" href="#theme-settings-offcanvas">
                                        <i class="ri-settings-3-line font-22"></i>
                                    </a>
                                </li>

                                <li class="d-none d-sm-inline-block">
                                    <div class="nav-link" id="light-dark-mode" data-bs-toggle="tooltip" data-bs-placement="left" title="Theme Mode">
                                        <i class="ri-moon-line font-22"></i>
                                    </div>
                                </li>


                                <li class="d-none d-md-inline-block">
                                    <a class="nav-link" href="#" data-toggle="fullscreen">
                                        <i class="ri-fullscreen-line font-22"></i>
                                    </a>
                                </li>

                                <li class="dropdown">
                                    <a class="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <span class="account-user-avatar">
                                            <img src="assets/images/users/avatar-1.jpg" alt="user-image" width="32" class="rounded-circle">
                                        </span>
                                        <span class="d-lg-flex flex-column gap-1 d-none">
                                            <h5 class="my-0">Dominic Keller</h5>
                                            <h6 class="my-0 fw-normal">Founder</h6>
                                        </span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                                        <!-- item-->
                                        <div class=" dropdown-header noti-title">
                                            <h6 class="text-overflow m-0">Welcome !</h6>
                                        </div>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-account-circle me-1"></i>
                                            <span>My Account</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-account-edit me-1"></i>
                                            <span>Settings</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-lifebuoy me-1"></i>
                                            <span>Support</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-lock-outline me-1"></i>
                                            <span>Lock Screen</span>
                                        </a>

                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-logout me-1"></i>
                                            <span>Logout</span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- ========== Topbar End ========== -->

                    <!-- ========== Left Sidebar Start ========== -->
                    <div class="leftside-menu">

                        <!-- Brand Logo Light -->
                        <a href="index.html" class="logo logo-light">
                            <span class="logo-lg">
                                <img src="assets/images/logo.png" alt="logo">
                            </span>
                            <span class="logo-sm">
                                <img src="assets/images/logo-sm.png" alt="small logo">
                            </span>
                        </a>

                        <!-- Brand Logo Dark -->
                        <a href="index.html" class="logo logo-dark">
                            <span class="logo-lg">
                                <img src="assets/images/logo-dark.png" alt="dark logo">
                            </span>
                            <span class="logo-sm">
                                <img src="assets/images/logo-dark-sm.png" alt="small logo">
                            </span>
                        </a>

                        <!-- Sidebar Hover Menu Toggle Button -->
                        <div class="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
                            <i class="ri-checkbox-blank-circle-line align-middle"></i>
                        </div>

                        <!-- Full Sidebar Menu Close Button -->
                        <div class="button-close-fullsidebar">
                            <i class="ri-close-fill align-middle"></i>
                        </div>

                        <!-- Sidebar -left -->
                        <div class="h-100" id="leftside-menu-container" data-simplebar>
                            <!-- Leftbar User -->
                            <div class="leftbar-user">
                                <a href="pages-profile.html">
                                    <img src="assets/images/users/avatar-1.jpg" alt="user-image" height="42" class="rounded-circle shadow-sm">
                                        <span class="leftbar-user-name mt-2">Dominic Keller</span>
                                </a>
                            </div>

                            <!--- Sidemenu -->
                            <ul class="side-nav">

                                <li class="side-nav-title">Navigation</li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarDashboards" aria-expanded="false" aria-controls="sidebarDashboards" class="side-nav-link">
                                        <i class="uil-home-alt"></i>
                                        <span class="badge bg-success float-end">5</span>
                                        <span> Dashboards </span>
                                    </a>
                                    <div class="collapse" id="sidebarDashboards">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="dashboard-analytics.html">Analytics</a>
                                            </li>
                                            <li>
                                                <a href="index.html">Ecommerce</a>
                                            </li>
                                            <li>
                                                <a href="dashboard-projects.html">Projects</a>
                                            </li>
                                            <li>
                                                <a href="dashboard-crm.html">CRM</a>
                                            </li>
                                            <li>
                                                <a href="dashboard-wallet.html">E-Wallet</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-title">Apps</li>

                                <li class="side-nav-item">
                                    <a href="apps-calendar.html" class="side-nav-link">
                                        <i class="uil-calender"></i>
                                        <span> Calendar </span>
                                    </a>
                                </li>

                                <li class="side-nav-item">
                                    <a href="apps-chat.html" class="side-nav-link">
                                        <i class="uil-comments-alt"></i>
                                        <span> Chat </span>
                                    </a>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarCrm" aria-expanded="false" aria-controls="sidebarCrm" class="side-nav-link">
                                        <i class="uil uil-tachometer-fast"></i>
                                        <span class="badge bg-danger text-white float-end">New</span>
                                        <span> CRM </span>
                                    </a>
                                    <div class="collapse" id="sidebarCrm">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="crm-projects.html">Projects</a>
                                            </li>
                                            <li>
                                                <a href="crm-orders-list.html">Orders List</a>
                                            </li>
                                            <li>
                                                <a href="crm-clients.html">Clients</a>
                                            </li>
                                            <li>
                                                <a href="crm-management.html">Management</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarEcommerce" aria-expanded="false" aria-controls="sidebarEcommerce" class="side-nav-link">
                                        <i class="uil-store"></i>
                                        <span> Ecommerce </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarEcommerce">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="apps-ecommerce-products.html">Products</a>
                                            </li>
                                            <li>
                                                <a href="apps-ecommerce-products-details.html">Products Details</a>
                                            </li>
                                            <li>
                                                <a href="apps-ecommerce-orders.html">Orders</a>
                                            </li>
                                            <li>
                                                <a href="apps-ecommerce-orders-details.html">Order Details</a>
                                            </li>
                                            <li>
                                                <a href="apps-ecommerce-customers.html">Customers</a>
                                            </li>
                                            <li>
                                                <a href="apps-ecommerce-shopping-cart.html">Shopping Cart</a>
                                            </li>
                                            <li>
                                                <a href="apps-ecommerce-checkout.html">Checkout</a>
                                            </li>
                                            <li>
                                                <a href="apps-ecommerce-sellers.html">Sellers</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarEmail" aria-expanded="false" aria-controls="sidebarEmail" class="side-nav-link">
                                        <i class="uil-envelope"></i>
                                        <span> Email </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarEmail">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="apps-email-inbox.html">Inbox</a>
                                            </li>
                                            <li>
                                                <a href="apps-email-read.html">Read Email</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarProjects" aria-expanded="false" aria-controls="sidebarProjects" class="side-nav-link">
                                        <i class="uil-briefcase"></i>
                                        <span> Projects </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarProjects">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="apps-projects-list.html">List</a>
                                            </li>
                                            <li>
                                                <a href="apps-projects-details.html">Details</a>
                                            </li>
                                            <li>
                                                <a href="apps-projects-gantt.html">Gantt <span class="badge rounded-pill bg-light text-dark font-10 float-end">New</span></a>
                                            </li>
                                            <li>
                                                <a href="apps-projects-add.html">Create Project</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a href="apps-social-feed.html" class="side-nav-link">
                                        <i class="uil-rss"></i>
                                        <span> Social Feed </span>
                                    </a>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarTasks" aria-expanded="false" aria-controls="sidebarTasks" class="side-nav-link">
                                        <i class="uil-clipboard-alt"></i>
                                        <span> Tasks </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarTasks">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="apps-tasks.html">List</a>
                                            </li>
                                            <li>
                                                <a href="apps-tasks-details.html">Details</a>
                                            </li>
                                            <li>
                                                <a href="apps-kanban.html">Kanban Board</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a href="apps-file-manager.html" class="side-nav-link">
                                        <i class="uil-folder-plus"></i>
                                        <span> File Manager </span>
                                    </a>
                                </li>

                                <li class="side-nav-title">Custom</li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarPages" aria-expanded="false" aria-controls="sidebarPages" class="side-nav-link">
                                        <i class="uil-copy-alt"></i>
                                        <span> Pages </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarPages">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="pages-profile.html">Profile</a>
                                            </li>
                                            <li>
                                                <a href="pages-profile-2.html">Profile 2</a>
                                            </li>
                                            <li>
                                                <a href="pages-invoice.html">Invoice</a>
                                            </li>
                                            <li>
                                                <a href="pages-faq.html">FAQ</a>
                                            </li>
                                            <li>
                                                <a href="pages-pricing.html">Pricing</a>
                                            </li>
                                            <li>
                                                <a href="pages-maintenance.html">Maintenance</a>
                                            </li>
                                            <li class="side-nav-item">
                                                <a data-bs-toggle="collapse" href="#sidebarPagesAuth" aria-expanded="false" aria-controls="sidebarPagesAuth">
                                                    <span> Authentication </span>
                                                    <span class="menu-arrow"></span>
                                                </a>
                                                <div class="collapse" id="sidebarPagesAuth">
                                                    <ul class="side-nav-third-level">
                                                        <li>
                                                            <a href="pages-login.html">Login</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-login-2.html">Login 2</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-register.html">Register</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-register-2.html">Register 2</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-logout.html">Logout</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-logout-2.html">Logout 2</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-recoverpw.html">Recover Password</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-recoverpw-2.html">Recover Password 2</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-lock-screen.html">Lock Screen</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-lock-screen-2.html">Lock Screen 2</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-confirm-mail.html">Confirm Mail</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-confirm-mail-2.html">Confirm Mail 2</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li class="side-nav-item">
                                                <a data-bs-toggle="collapse" href="#sidebarPagesError" aria-expanded="false" aria-controls="sidebarPagesError">
                                                    <span> Error </span>
                                                    <span class="menu-arrow"></span>
                                                </a>
                                                <div class="collapse" id="sidebarPagesError">
                                                    <ul class="side-nav-third-level">
                                                        <li>
                                                            <a href="pages-404.html">Error 404</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-404-alt.html">Error 404-alt</a>
                                                        </li>
                                                        <li>
                                                            <a href="pages-500.html">Error 500</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="pages-starter.html">Starter Page</a>
                                            </li>
                                            <li>
                                                <a href="pages-preloader.html">With Preloader</a>
                                            </li>
                                            <li>
                                                <a href="pages-timeline.html">Timeline</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a href="landing.html" target="_blank" class="side-nav-link">
                                        <i class="uil-globe"></i>
                                        <span class="badge text-bg-secondary float-end">New</span>
                                        <span> Landing </span>
                                    </a>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarLayouts" aria-expanded="false" aria-controls="sidebarLayouts" class="side-nav-link">
                                        <i class="uil-window"></i>
                                        <span> Layouts </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarLayouts">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="layouts-horizontal.html" target="_blank">Horizontal</a>
                                            </li>
                                            <li>
                                                <a href="layouts-detached.html" target="_blank">Detached</a>
                                            </li>
                                            <li>
                                                <a href="layouts-full.html" target="_blank">Full View</a>
                                            </li>
                                            <li>
                                                <a href="layouts-fullscreen.html" target="_blank">Fullscreen View</a>
                                            </li>
                                            <li>
                                                <a href="layouts-hover.html" target="_blank">Hover Menu</a>
                                            </li>
                                            <li>
                                                <a href="layouts-compact.html" target="_blank">Compact</a>
                                            </li>
                                            <li>
                                                <a href="layouts-icon-view.html" target="_blank">Icon View</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-title">Components</li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarBaseUI" aria-expanded="false" aria-controls="sidebarBaseUI" class="side-nav-link">
                                        <i class="uil-box"></i>
                                        <span> Base UI </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarBaseUI">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="ui-accordions.html">Accordions & Collapse</a>
                                            </li>
                                            <li>
                                                <a href="ui-alerts.html">Alerts</a>
                                            </li>
                                            <li>
                                                <a href="ui-avatars.html">Avatars</a>
                                            </li>
                                            <li>
                                                <a href="ui-badges.html">Badges</a>
                                            </li>
                                            <li>
                                                <a href="ui-breadcrumb.html">Breadcrumb</a>
                                            </li>
                                            <li>
                                                <a href="ui-buttons.html">Buttons</a>
                                            </li>
                                            <li>
                                                <a href="ui-cards.html">Cards</a>
                                            </li>
                                            <li>
                                                <a href="ui-carousel.html">Carousel</a>
                                            </li>
                                            <li>
                                                <a href="ui-dropdowns.html">Dropdowns</a>
                                            </li>
                                            <li>
                                                <a href="ui-embed-video.html">Embed Video</a>
                                            </li>
                                            <li>
                                                <a href="ui-grid.html">Grid</a>
                                            </li>
                                            <li>
                                                <a href="ui-list-group.html">List Group</a>
                                            </li>
                                            <li>
                                                <a href="ui-modals.html">Modals</a>
                                            </li>
                                            <li>
                                                <a href="ui-notifications.html">Notifications</a>
                                            </li>
                                            <li>
                                                <a href="ui-offcanvas.html">Offcanvas</a>
                                            </li>
                                            <li>
                                                <a href="ui-placeholders.html">Placeholders</a>
                                            </li>
                                            <li>
                                                <a href="ui-pagination.html">Pagination</a>
                                            </li>
                                            <li>
                                                <a href="ui-popovers.html">Popovers</a>
                                            </li>
                                            <li>
                                                <a href="ui-progress.html">Progress</a>
                                            </li>
                                            <li>
                                                <a href="ui-ribbons.html">Ribbons</a>
                                            </li>
                                            <li>
                                                <a href="ui-spinners.html">Spinners</a>
                                            </li>
                                            <li>
                                                <a href="ui-tabs.html">Tabs</a>
                                            </li>
                                            <li>
                                                <a href="ui-tooltips.html">Tooltips</a>
                                            </li>
                                            <li>
                                                <a href="ui-links.html">Links</a>
                                            </li>
                                            <li>
                                                <a href="ui-typography.html">Typography</a>
                                            </li>
                                            <li>
                                                <a href="ui-utilities.html">Utilities</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarExtendedUI" aria-expanded="false" aria-controls="sidebarExtendedUI" class="side-nav-link">
                                        <i class="uil-package"></i>
                                        <span> Extended UI </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarExtendedUI">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="extended-dragula.html">Dragula</a>
                                            </li>
                                            <li>
                                                <a href="extended-range-slider.html">Range Slider</a>
                                            </li>
                                            <li>
                                                <a href="extended-ratings.html">Ratings</a>
                                            </li>
                                            <li>
                                                <a href="extended-scrollbar.html">Scrollbar</a>
                                            </li>
                                            <li>
                                                <a href="extended-scrollspy.html">Scrollspy</a>
                                            </li>
                                            <li>
                                                <a href="extended-treeview.html">Treeview</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a href="widgets.html" class="side-nav-link">
                                        <i class="uil-layer-group"></i>
                                        <span> Widgets </span>
                                    </a>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarIcons" aria-expanded="false" aria-controls="sidebarIcons" class="side-nav-link">
                                        <i class="uil-streering"></i>
                                        <span> Icons </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarIcons">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="icons-remixicons.html">Remix Icons</a>
                                            </li>
                                            <li>
                                                <a href="icons-mdi.html">Material Design</a>
                                            </li>
                                            <li>
                                                <a href="icons-unicons.html">Unicons</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarCharts" aria-expanded="false" aria-controls="sidebarCharts" class="side-nav-link">
                                        <i class="uil-chart"></i>
                                        <span> Charts </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarCharts">
                                        <ul class="side-nav-second-level">
                                            <li class="side-nav-item">
                                                <a data-bs-toggle="collapse" href="#sidebarApexCharts" aria-expanded="false" aria-controls="sidebarApexCharts">
                                                    <span> Apex Charts </span>
                                                    <span class="menu-arrow"></span>
                                                </a>
                                                <div class="collapse" id="sidebarApexCharts">
                                                    <ul class="side-nav-third-level">
                                                        <li>
                                                            <a href="charts-apex-area.html">Area</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-bar.html">Bar</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-bubble.html">Bubble</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-candlestick.html">Candlestick</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-column.html">Column</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-heatmap.html">Heatmap</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-line.html">Line</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-mixed.html">Mixed</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-timeline.html">Timeline</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-boxplot.html">Boxplot</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-treemap.html">Treemap</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-pie.html">Pie</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-radar.html">Radar</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-radialbar.html">RadialBar</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-scatter.html">Scatter</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-polar-area.html">Polar Area</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-apex-sparklines.html">Sparklines</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li class="side-nav-item">
                                                <a data-bs-toggle="collapse" href="#sidebarChartJSCharts" aria-expanded="false" aria-controls="sidebarChartJSCharts">
                                                    <span> ChartJS </span>
                                                    <span class="menu-arrow"></span>
                                                </a>
                                                <div class="collapse" id="sidebarChartJSCharts">
                                                    <ul class="side-nav-third-level">
                                                        <li>
                                                            <a href="charts-chartjs-area.html">Area</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-chartjs-bar.html">Bar</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-chartjs-line.html">Line</a>
                                                        </li>
                                                        <li>
                                                            <a href="charts-chartjs-other.html">Other</a>
                                                        </li>

                                                    </ul>
                                                </div>
                                            </li>
                                            <li>
                                                <a href="charts-brite.html">Britecharts</a>
                                            </li>
                                            <li>
                                                <a href="charts-sparkline.html">Sparklines</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarForms" aria-expanded="false" aria-controls="sidebarForms" class="side-nav-link">
                                        <i class="uil-document-layout-center"></i>
                                        <span> Forms </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarForms">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="form-elements.html">Basic Elements</a>
                                            </li>
                                            <li>
                                                <a href="form-advanced.html">Form Advanced</a>
                                            </li>
                                            <li>
                                                <a href="form-validation.html">Validation</a>
                                            </li>
                                            <li>
                                                <a href="form-wizard.html">Wizard</a>
                                            </li>
                                            <li>
                                                <a href="form-fileuploads.html">File Uploads</a>
                                            </li>
                                            <li>
                                                <a href="form-editors.html">Editors</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarTables" aria-expanded="false" aria-controls="sidebarTables" class="side-nav-link">
                                        <i class="uil-table"></i>
                                        <span> Tables </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarTables">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="tables-basic.html">Basic Tables</a>
                                            </li>
                                            <li>
                                                <a href="tables-datatable.html">Data Tables</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarMaps" aria-expanded="false" aria-controls="sidebarMaps" class="side-nav-link">
                                        <i class="uil-location-point"></i>
                                        <span> Maps </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarMaps">
                                        <ul class="side-nav-second-level">
                                            <li>
                                                <a href="maps-google.html">Google Maps</a>
                                            </li>
                                            <li>
                                                <a href="maps-vector.html">Vector Maps</a>
                                            </li>
                                        </ul>
                                    </div>
                                </li>

                                <li class="side-nav-item">
                                    <a data-bs-toggle="collapse" href="#sidebarMultiLevel" aria-expanded="false" aria-controls="sidebarMultiLevel" class="side-nav-link">
                                        <i class="uil-folder-plus"></i>
                                        <span> Multi Level </span>
                                        <span class="menu-arrow"></span>
                                    </a>
                                    <div class="collapse" id="sidebarMultiLevel">
                                        <ul class="side-nav-second-level">
                                            <li class="side-nav-item">
                                                <a data-bs-toggle="collapse" href="#sidebarSecondLevel" aria-expanded="false" aria-controls="sidebarSecondLevel">
                                                    <span> Second Level </span>
                                                    <span class="menu-arrow"></span>
                                                </a>
                                                <div class="collapse" id="sidebarSecondLevel">
                                                    <ul class="side-nav-third-level">
                                                        <li>
                                                            <a href="javascript: void(0);">Item 1</a>
                                                        </li>
                                                        <li>
                                                            <a href="javascript: void(0);">Item 2</a>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                            <li class="side-nav-item">
                                                <a data-bs-toggle="collapse" href="#sidebarThirdLevel" aria-expanded="false" aria-controls="sidebarThirdLevel">
                                                    <span> Third Level </span>
                                                    <span class="menu-arrow"></span>
                                                </a>
                                                <div class="collapse" id="sidebarThirdLevel">
                                                    <ul class="side-nav-third-level">
                                                        <li>
                                                            <a href="javascript: void(0);">Item 1</a>
                                                        </li>
                                                        <li class="side-nav-item">
                                                            <a data-bs-toggle="collapse" href="#sidebarFourthLevel" aria-expanded="false" aria-controls="sidebarFourthLevel">
                                                                <span> Item 2 </span>
                                                                <span class="menu-arrow"></span>
                                                            </a>
                                                            <div class="collapse" id="sidebarFourthLevel">
                                                                <ul class="side-nav-forth-level">
                                                                    <li>
                                                                        <a href="javascript: void(0);">Item 2.1</a>
                                                                    </li>
                                                                    <li>
                                                                        <a href="javascript: void(0);">Item 2.2</a>
                                                                    </li>
                                                                </ul>
                                                            </div>
                                                        </li>
                                                    </ul>
                                                </div>
                                            </li>
                                        </ul>
                                    </div>
                                </li>


                                <!-- Help Box -->
                                <div class="help-box text-white text-center">
                                    <a href="javascript: void(0);" class="float-end close-btn text-white">
                                        <i class="mdi mdi-close"></i>
                                    </a>
                                    <img src="assets/images/svg/help-icon.svg" height="90" alt="Helper Icon Image" />
                                    <h5 class="mt-3">Unlimited Access</h5>
                                    <p class="mb-3">Upgrade to plan to get access to unlimited reports</p>
                                    <a href="javascript: void(0);" class="btn btn-secondary btn-sm">Upgrade</a>
                                </div>
                                <!-- end Help Box -->


                            </ul>
                            <!--- End Sidemenu -->

                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <!-- ========== Left Sidebar End ========== -->

                    <!-- ============================================================== -->
                    <!-- Start Page Content here -->
                    <!-- ============================================================== -->

                    <div class="content-page">
                        <div class="content">

                            <!-- Start Content-->
                            <div class="container-fluid">

                                <!-- start page title -->
                                <div class="row">
                                    <div class="col-12">
                                        <div class="page-title-box">
                                            <div class="page-title-right">
                                                <ol class="breadcrumb m-0">
                                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Hyper</a></li>
                                                    <li class="breadcrumb-item"><a href="javascript: void(0);">Forms</a></li>
                                                    <li class="breadcrumb-item active">Form Advanced</li>
                                                </ol>
                                            </div>
                                            <h4 class="page-title">Form Advanced</h4>
                                        </div>
                                    </div>
                                </div>
                                <!-- end page title -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Select2</h4>
                                                <p class="text-muted font-14">Select2 gives you a customizable select box with support for searching, tagging, remote data sets, infinite scrolling, and many other highly used options.</p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#select2-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#select2-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="select2-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <p class="mb-1 fw-bold text-muted">Single Select</p>
                                                                <p class="text-muted font-14">
                                                                    Select2 can take a regular select box like this...
                                                                </p>

                                                                <select class="form-control select2" data-toggle="select2">
                                                                    <option>Select</option>
                                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                                        <option value="AK">Alaska</option>
                                                                        <option value="HI">Hawaii</option>
                                                                    </optgroup>
                                                                    <optgroup label="Pacific Time Zone">
                                                                        <option value="CA">California</option>
                                                                        <option value="NV">Nevada</option>
                                                                        <option value="OR">Oregon</option>
                                                                        <option value="WA">Washington</option>
                                                                    </optgroup>
                                                                    <optgroup label="Mountain Time Zone">
                                                                        <option value="AZ">Arizona</option>
                                                                        <option value="CO">Colorado</option>
                                                                        <option value="ID">Idaho</option>
                                                                        <option value="MT">Montana</option>
                                                                        <option value="NE">Nebraska</option>
                                                                        <option value="NM">New Mexico</option>
                                                                        <option value="ND">North Dakota</option>
                                                                        <option value="UT">Utah</option>
                                                                        <option value="WY">Wyoming</option>
                                                                    </optgroup>
                                                                    <optgroup label="Central Time Zone">
                                                                        <option value="AL">Alabama</option>
                                                                        <option value="AR">Arkansas</option>
                                                                        <option value="IL">Illinois</option>
                                                                        <option value="IA">Iowa</option>
                                                                        <option value="KS">Kansas</option>
                                                                        <option value="KY">Kentucky</option>
                                                                        <option value="LA">Louisiana</option>
                                                                        <option value="MN">Minnesota</option>
                                                                        <option value="MS">Mississippi</option>
                                                                        <option value="MO">Missouri</option>
                                                                        <option value="OK">Oklahoma</option>
                                                                        <option value="SD">South Dakota</option>
                                                                        <option value="TX">Texas</option>
                                                                        <option value="TN">Tennessee</option>
                                                                        <option value="WI">Wisconsin</option>
                                                                    </optgroup>
                                                                    <optgroup label="Eastern Time Zone">
                                                                        <option value="CT">Connecticut</option>
                                                                        <option value="DE">Delaware</option>
                                                                        <option value="FL">Florida</option>
                                                                        <option value="GA">Georgia</option>
                                                                        <option value="IN">Indiana</option>
                                                                        <option value="ME">Maine</option>
                                                                        <option value="MD">Maryland</option>
                                                                        <option value="MA">Massachusetts</option>
                                                                        <option value="MI">Michigan</option>
                                                                        <option value="NH">New Hampshire</option>
                                                                        <option value="NJ">New Jersey</option>
                                                                        <option value="NY">New York</option>
                                                                        <option value="NC">North Carolina</option>
                                                                        <option value="OH">Ohio</option>
                                                                        <option value="PA">Pennsylvania</option>
                                                                        <option value="RI">Rhode Island</option>
                                                                        <option value="SC">South Carolina</option>
                                                                        <option value="VT">Vermont</option>
                                                                        <option value="VA">Virginia</option>
                                                                        <option value="WV">West Virginia</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6">
                                                                <p class="mb-1 fw-bold text-muted">Multiple Select</p>
                                                                <p class="text-muted font-14">
                                                                    Select2 can take a regular select box like this...
                                                                </p>

                                                                <select class="select2 form-control select2-multiple" data-toggle="select2" multiple="multiple" data-placeholder="Choose ...">
                                                                    <optgroup label="Alaskan/Hawaiian Time Zone">
                                                                        <option value="AK">Alaska</option>
                                                                        <option value="HI">Hawaii</option>
                                                                    </optgroup>
                                                                    <optgroup label="Pacific Time Zone">
                                                                        <option value="CA">California</option>
                                                                        <option value="NV">Nevada</option>
                                                                        <option value="OR">Oregon</option>
                                                                        <option value="WA">Washington</option>
                                                                    </optgroup>
                                                                    <optgroup label="Mountain Time Zone">
                                                                        <option value="AZ">Arizona</option>
                                                                        <option value="CO">Colorado</option>
                                                                        <option value="ID">Idaho</option>
                                                                        <option value="MT">Montana</option>
                                                                        <option value="NE">Nebraska</option>
                                                                        <option value="NM">New Mexico</option>
                                                                        <option value="ND">North Dakota</option>
                                                                        <option value="UT">Utah</option>
                                                                        <option value="WY">Wyoming</option>
                                                                    </optgroup>
                                                                    <optgroup label="Central Time Zone">
                                                                        <option value="AL">Alabama</option>
                                                                        <option value="AR">Arkansas</option>
                                                                        <option value="IL">Illinois</option>
                                                                        <option value="IA">Iowa</option>
                                                                        <option value="KS">Kansas</option>
                                                                        <option value="KY">Kentucky</option>
                                                                        <option value="LA">Louisiana</option>
                                                                        <option value="MN">Minnesota</option>
                                                                        <option value="MS">Mississippi</option>
                                                                        <option value="MO">Missouri</option>
                                                                        <option value="OK">Oklahoma</option>
                                                                        <option value="SD">South Dakota</option>
                                                                        <option value="TX">Texas</option>
                                                                        <option value="TN">Tennessee</option>
                                                                        <option value="WI">Wisconsin</option>
                                                                    </optgroup>
                                                                    <optgroup label="Eastern Time Zone">
                                                                        <option value="CT">Connecticut</option>
                                                                        <option value="DE">Delaware</option>
                                                                        <option value="FL">Florida</option>
                                                                        <option value="GA">Georgia</option>
                                                                        <option value="IN">Indiana</option>
                                                                        <option value="ME">Maine</option>
                                                                        <option value="MD">Maryland</option>
                                                                        <option value="MA">Massachusetts</option>
                                                                        <option value="MI">Michigan</option>
                                                                        <option value="NH">New Hampshire</option>
                                                                        <option value="NJ">New Jersey</option>
                                                                        <option value="NY">New York</option>
                                                                        <option value="NC">North Carolina</option>
                                                                        <option value="OH">Ohio</option>
                                                                        <option value="PA">Pennsylvania</option>
                                                                        <option value="RI">Rhode Island</option>
                                                                        <option value="SC">South Carolina</option>
                                                                        <option value="VT">Vermont</option>
                                                                        <option value="VA">Virginia</option>
                                                                        <option value="WV">West Virginia</option>
                                                                    </optgroup>
                                                                </select>
                                                            </div> <!-- end col -->
                                                        </div> <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="select2-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Select2 css --&gt;
                                                                &lt;link href=&quot;assets/vendor/select2/css/select2.min.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; /&gt;

                                                                &lt;!--  Select2 Js --&gt;
                                                                &lt;script src=&quot;assets/vendor/select2/js/select2.min.js&quot;&gt;&lt;/script&gt;

                                                                &lt;!-- Single Select --&gt;
                                                                &lt;select class=&quot;form-control select2&quot; data-toggle=&quot;select2&quot;&gt;
                                                                &lt;option&gt;Select&lt;/option&gt;
                                                                &lt;optgroup label=&quot;Alaskan/Hawaiian Time Zone&quot;&gt;
                                                                &lt;option value=&quot;AK&quot;&gt;Alaska&lt;/option&gt;
                                                                &lt;option value=&quot;HI&quot;&gt;Hawaii&lt;/option&gt;
                                                                &lt;/optgroup&gt;
                                                                &lt;optgroup label=&quot;Pacific Time Zone&quot;&gt;
                                                                &lt;option value=&quot;CA&quot;&gt;California&lt;/option&gt;
                                                                &lt;option value=&quot;NV&quot;&gt;Nevada&lt;/option&gt;
                                                                &lt;option value=&quot;OR&quot;&gt;Oregon&lt;/option&gt;
                                                                &lt;option value=&quot;WA&quot;&gt;Washington&lt;/option&gt;
                                                                &lt;/optgroup&gt;
                                                                &lt;/select&gt;

                                                                &lt;!-- Multiple Select --&gt;
                                                                &lt;select class=&quot;select2 form-control select2-multiple&quot; data-toggle=&quot;select2&quot; multiple=&quot;multiple&quot; data-placeholder=&quot;Choose ...&quot;&gt;
                                                                &lt;optgroup label=&quot;Alaskan/Hawaiian Time Zone&quot;&gt;
                                                                &lt;option value=&quot;AK&quot;&gt;Alaska&lt;/option&gt;
                                                                &lt;option value=&quot;HI&quot;&gt;Hawaii&lt;/option&gt;
                                                                &lt;/optgroup&gt;
                                                                &lt;optgroup label=&quot;Pacific Time Zone&quot;&gt;
                                                                &lt;option value=&quot;CA&quot;&gt;California&lt;/option&gt;
                                                                &lt;option value=&quot;NV&quot;&gt;Nevada&lt;/option&gt;
                                                                &lt;option value=&quot;OR&quot;&gt;Oregon&lt;/option&gt;
                                                                &lt;option value=&quot;WA&quot;&gt;Washington&lt;/option&gt;
                                                                &lt;/optgroup&gt;
                                                                &lt;optgroup label=&quot;Mountain Time Zone&quot;&gt;
                                                                &lt;option value=&quot;AZ&quot;&gt;Arizona&lt;/option&gt;
                                                                &lt;option value=&quot;CO&quot;&gt;Colorado&lt;/option&gt;
                                                                &lt;option value=&quot;ID&quot;&gt;Idaho&lt;/option&gt;
                                                                &lt;option value=&quot;MT&quot;&gt;Montana&lt;/option&gt;
                                                                &lt;option value=&quot;NE&quot;&gt;Nebraska&lt;/option&gt;
                                                                &lt;option value=&quot;NM&quot;&gt;New Mexico&lt;/option&gt;
                                                                &lt;option value=&quot;ND&quot;&gt;North Dakota&lt;/option&gt;
                                                                &lt;option value=&quot;UT&quot;&gt;Utah&lt;/option&gt;
                                                                &lt;option value=&quot;WY&quot;&gt;Wyoming&lt;/option&gt;
                                                                &lt;/optgroup&gt;
                                                                &lt;/select&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body-->
                                        </div> <!-- end card-->
                                    </div> <!-- end col-->
                                </div>
                                <!-- end row-->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Date Range Picker</h4>
                                                <p class="text-muted font-14">
                                                    A JavaScript component for choosing date ranges, dates and times.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#daterange-picker-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#daterange-picker-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="daterange-picker-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <!-- Date Range -->
                                                                <div class="mb-3">
                                                                    <label class="form-label">Date Range</label>
                                                                    <input type="text" class="form-control date" id="singledaterange" data-toggle="date-picker" data-cancel-class="btn-warning">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6">
                                                                <!-- Date Range Picker With Times -->
                                                                <div class="mb-3">
                                                                    <label class="form-label">Date Range Picker With Times</label>
                                                                    <input type="text" class="form-control date" id="daterangetime" data-toggle="date-picker" data-time-picker="true" data-locale="{''format'': ''DD/MM hh:mm A''}">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <!-- Single Date Picker -->
                                                                <div>
                                                                    <label class="form-label">Single Date Picker</label>
                                                                    <input type="text" class="form-control date" id="birthdatepicker" data-toggle="date-picker" data-single-date-picker="true">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6">
                                                                <!-- Predefined Date Ranges -->
                                                                <div>
                                                                    <label class="form-label">Predefined Date Ranges</label>
                                                                    <div id="reportrange" class="form-control" data-toggle="date-picker-range" data-target-display="#selectedValue" data-cancel-class="btn-light">
                                                                        <i class="mdi mdi-calendar"></i>&nbsp;
                                                                        <span id="selectedValue"></span> <i class="mdi mdi-menu-down"></i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="daterange-picker-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Daterangepicker css --&gt;
                                                                &lt;link rel=&quot;stylesheet&quot; href=&quot;assets/vendor/daterangepicker/daterangepicker.css&quot; type=&quot;text/css&quot; /&gt;

                                                                &lt;!-- Daterangepicker js --&gt;
                                                                &lt;script src=&quot;assets/vendor/daterangepicker/moment.min.js&quot;&gt;&lt;/script&gt;
                                                                &lt;script src=&quot;assets/vendor/daterangepicker/daterangepicker.js&quot;&gt;&lt;/script&gt;

                                                                &lt;!-- Date Range --&gt;
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Date Range&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control date&quot; id=&quot;singledaterange&quot; data-toggle=&quot;date-picker&quot; data-cancel-class=&quot;btn-warning&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Date Range Picker With Times --&gt;
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Date Range Picker With Times&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control date&quot; id=&quot;daterangetime&quot; data-toggle=&quot;date-picker&quot; data-time-picker=&quot;true&quot; data-locale=&quot;{''format'': ''DD/MM hh:mm A''}&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Single Date Picker --&gt;
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Single Date Picker&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control date&quot; id=&quot;birthdatepicker&quot; data-toggle=&quot;date-picker&quot; data-single-date-picker=&quot;true&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Predefined Date Ranges --&gt;
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Predefined Date Ranges&lt;/label&gt;
                                                                &lt;div id=&quot;reportrange&quot; class=&quot;form-control&quot; data-toggle=&quot;date-picker-range&quot; data-target-display=&quot;#selectedValue&quot;  data-cancel-class=&quot;btn-light&quot;&gt;
                                                                &lt;i class=&quot;mdi mdi-calendar&quot;&gt;&lt;/i&gt;&amp;nbsp;
                                                                &lt;span id=&quot;selectedValue&quot;&gt;&lt;/span&gt; &lt;i class=&quot;mdi mdi-menu-down&quot;&gt;&lt;/i&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Switch</h4>
                                                <p class="text-muted font-14">
                                                    Here are a few types of switches.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-4">
                                                    <li class="nav-item">
                                                        <a href="#switches-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#switches-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="switches-preview">
                                                        <!-- without label-->
                                                        <input type="checkbox" id="switch0" data-switch="none" />
                                                        <label for="switch0" data-on-label="" data-off-label=""></label>

                                                        <!-- Bool Switch-->
                                                        <input type="checkbox" id="switch1" checked data-switch="bool" />
                                                        <label for="switch1" data-on-label="On" data-off-label="Off"></label>

                                                        <!-- Primary Switch-->
                                                        <input type="checkbox" id="switch2" checked data-switch="primary" />
                                                        <label for="switch2" data-on-label="On" data-off-label="Off"></label>

                                                        <!-- Success Switch-->
                                                        <input type="checkbox" id="switch3" checked data-switch="success" />
                                                        <label for="switch3" data-on-label="Yes" data-off-label="No"></label>

                                                        <!-- Info Switch-->
                                                        <input type="checkbox" id="switch4" checked data-switch="info" />
                                                        <label for="switch4" data-on-label="On" data-off-label="Off"></label>

                                                        <!-- Warning Switch-->
                                                        <input type="checkbox" id="switch5" checked data-switch="warning" />
                                                        <label for="switch5" data-on-label="Yes" data-off-label="No"></label>

                                                        <!-- Danger Switch-->
                                                        <input type="checkbox" id="switch6" checked data-switch="danger" />
                                                        <label for="switch6" data-on-label="On" data-off-label="Off"></label>

                                                        <!-- Dark Switch-->
                                                        <input type="checkbox" id="switch7" checked data-switch="secondary" />
                                                        <label for="switch7" data-on-label="Yes" data-off-label="No"></label>

                                                        <!-- Disbled Switch-->
                                                        <input type="checkbox" id="switchdis" data-switch="primary" checked disabled />
                                                        <label for="switchdis" data-on-label="On" data-off-label="Off"></label>

                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="switches-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Without label--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch0&quot; data-switch=&quot;none&quot;/&gt;
                                                                &lt;label for=&quot;switch0&quot; data-on-label=&quot;&quot; data-off-label=&quot;&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Bool Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch1&quot; checked data-switch=&quot;bool&quot;/&gt;
                                                                &lt;label for=&quot;switch1&quot; data-on-label=&quot;On&quot; data-off-label=&quot;Off&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Primary Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch2&quot; checked data-switch=&quot;primary&quot;/&gt;
                                                                &lt;label for=&quot;switch2&quot; data-on-label=&quot;On&quot; data-off-label=&quot;Off&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Success Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch3&quot; checked data-switch=&quot;success&quot;/&gt;
                                                                &lt;label for=&quot;switch3&quot; data-on-label=&quot;Yes&quot; data-off-label=&quot;No&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Info Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch4&quot; checked data-switch=&quot;info&quot;/&gt;
                                                                &lt;label for=&quot;switch4&quot; data-on-label=&quot;On&quot; data-off-label=&quot;Off&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Warning Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch5&quot; checked data-switch=&quot;warning&quot;/&gt;
                                                                &lt;label for=&quot;switch5&quot; data-on-label=&quot;Yes&quot; data-off-label=&quot;No&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Danger Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch6&quot; checked data-switch=&quot;danger&quot;/&gt;
                                                                &lt;label for=&quot;switch6&quot; data-on-label=&quot;On&quot; data-off-label=&quot;Off&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Dark Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switch7&quot; checked data-switch=&quot;secondary&quot;/&gt;
                                                                &lt;label for=&quot;switch7&quot; data-on-label=&quot;Yes&quot; data-off-label=&quot;No&quot;&gt;&lt;/label&gt;

                                                                &lt;!-- Disbled Switch--&gt;
                                                                &lt;input type=&quot;checkbox&quot; id=&quot;switchdis&quot; data-switch=&quot;primary&quot; checked disabled/&gt;
                                                                &lt;label for=&quot;switchdis&quot; data-on-label=&quot;On&quot; data-off-label=&quot;Off&quot;&gt;&lt;/label&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Bootstrap Datepicker</h4>
                                                <p class="text-muted font-14">
                                                    Bootstrap-datepicker provides a flexible datepicker widget in the Bootstrap style.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#datepicker-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#datepicker-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="datepicker-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3 position-relative" id="datepicker1">
                                                                    <label class="form-label">Date Picker</label>
                                                                    <input type="text" class="form-control" data-provide="datepicker" data-date-today-highlight="true" data-date-container="#datepicker1">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6">
                                                                <div class="mb-3 position-relative" id="datepicker2">
                                                                    <label class="form-label">Date View</label>
                                                                    <input type="text" class="form-control" data-provide="datepicker" data-date-format="d-M-yyyy" data-date-container="#datepicker2">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3 position-relative" id="datepicker3">
                                                                    <label class="form-label">Multi Datepicker</label>
                                                                    <input type="text" class="form-control" data-provide="datepicker" data-date-multidate="true" data-date-container="#datepicker3">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6">
                                                                <div class="mb-3 position-relative" id="datepicker4">
                                                                    <label class="form-label">Autoclose</label>
                                                                    <input type="text" class="form-control" data-provide="datepicker" data-date-autoclose="true" data-date-container="#datepicker4">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3 position-relative" id="datepicker5">
                                                                    <label class="form-label">Month View</label>
                                                                    <input type="text" class="form-control" data-provide="datepicker" data-date-format="MM yyyy" data-date-min-view-mode="1" data-date-container="#datepicker5">
                                                                </div>
                                                            </div>

                                                            <div class="col-lg-6">
                                                                <div class="mb-3 position-relative" id="datepicker6">
                                                                    <label class="form-label">Year View</label>
                                                                    <input type="text" class="form-control" data-provide="datepicker" data-date-min-view-mode="2" data-date-container="#datepicker6">
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div>
                                                                    <label class="form-label">Inline Datepicker</label>
                                                                    <div data-provide="datepicker-inline"></div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="datepicker-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Bootstrap Datepicker css --&gt;
                                                                &lt;link href=&quot;assets/vendor/bootstrap-datepicker/css/bootstrap-datepicker.min.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; /&gt;

                                                                &lt;!-- Bootstrap Datepicker js --&gt;
                                                                &lt;script src=&quot;assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js&quot;&gt;&lt;/script&gt;

                                                                &lt;!-- Date Picker --&gt;
                                                                &lt;div class=&quot;mb-3 position-relative&quot; id=&quot;datepicker1&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Date Picker&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;datepicker&quot; data-date-container=&quot;#datepicker1&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Date View --&gt;
                                                                &lt;div class=&quot;mb-3 position-relative&quot; id=&quot;datepicker2&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Date View&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;datepicker&quot; data-date-format=&quot;d-M-yyyy&quot; data-date-container=&quot;#datepicker2&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Multi Datepicker --&gt;
                                                                &lt;div class=&quot;mb-3 position-relative&quot; id=&quot;datepicker3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Multi Datepicker&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;datepicker&quot; data-date-multidate=&quot;true&quot; data-date-container=&quot;#datepicker3&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Autoclose --&gt;
                                                                &lt;div class=&quot;mb-3 position-relative&quot; id=&quot;datepicker4&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Autoclose&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;datepicker&quot; data-date-autoclose=&quot;true&quot; data-date-container=&quot;#datepicker4&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Month View --&gt;
                                                                &lt;div class=&quot;mb-3 position-relative&quot; id=&quot;datepicker5&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Month View&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;datepicker&quot; data-date-format=&quot;MM yyyy&quot; data-date-min-view-mode=&quot;1&quot; data-date-container=&quot;#datepicker5&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Year View --&gt;
                                                                &lt;div class=&quot;mb-3 position-relative&quot; id=&quot;datepicker6&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Year View&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;datepicker&quot; data-date-min-view-mode=&quot;2&quot; data-date-container=&quot;#datepicker6&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;!-- Inline Datepicker --&gt;
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Inline Datepicker&lt;/label&gt;
                                                                &lt;div data-provide=&quot;datepicker-inline&quot;&gt;&lt;/div&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Flatpickr - Date picker</h4>
                                                <p class="text-muted font-14">A lightweight and powerful datetimepicker</p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#flatpickr-datepicker-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#flatpickr-datepicker-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="flatpickr-datepicker-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Basic</label>
                                                                    <input type="text" id="basic-datepicker" class="form-control" placeholder="Basic datepicker">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Date & Time</label>
                                                                    <input type="text" id="datetime-datepicker" class="form-control" placeholder="Date and Time">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Human-friendly Dates</label>
                                                                    <input type="text" id="humanfd-datepicker" class="form-control" placeholder="October 9, 2018">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">MinDate and MaxDate</label>
                                                                    <input type="text" id="minmax-datepicker" class="form-control" placeholder="mindate - maxdate">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Disabling dates</label>
                                                                    <input type="text" id="disable-datepicker" class="form-control" placeholder="Disabling dates">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Selecting multiple dates</label>
                                                                    <input type="text" id="multiple-datepicker" class="form-control" placeholder="Multiple dates">
                                                                </div>

                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Selecting multiple dates - Conjunction</label>
                                                                    <input type="text" id="conjunction-datepicker" class="form-control" placeholder="2018-10-10 :: 2018-10-11">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Range Calendar</label>
                                                                    <input type="text" id="range-datepicker" class="form-control" placeholder="2018-10-03 to 2018-10-10">
                                                                </div>

                                                                <div>
                                                                    <label class="form-label">Inline Calendar</label>
                                                                    <input type="text" id="inline-datepicker" class="form-control" placeholder="Inline calendar">
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="flatpickr-datepicker-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Basic&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;basic-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;Basic datepicker&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Date &amp; Time&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;datetime-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;Date and Time&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Human-friendly Dates&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;humanfd-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;October 9, 2018&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;MinDate and MaxDate&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;minmax-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;mindate - maxdate&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Disabling dates&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;disable-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;Disabling dates&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Selecting multiple dates&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;multiple-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;Multiple dates&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Selecting multiple dates - Conjunction&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;conjunction-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;2018-10-10 :: 2018-10-11&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Range Calendar&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;range-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;2018-10-03 to 2018-10-10&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Inline Calendar&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; id=&quot;inline-datepicker&quot; class=&quot;form-control&quot; placeholder=&quot;Inline calendar&quot;&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->
                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->


                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Flatpickr - Time Picker </h4>
                                                <p class="text-muted font-14">A lightweight and powerful datetimepicker</p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#timepicker-flatpickr-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#timepicker-flatpickr-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="timepicker-flatpickr-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Default Time Picker</label>
                                                                    <div class="input-group">
                                                                        <input id="basic-timepicker" type="text" class="form-control" placeholder="Basic timepicker">
                                                                            <span class="input-group-text"><i class="ri-time-line"></i></span>
                                                                    </div>
                                                                </div>

                                                                <div class="mb-0">
                                                                    <label class="form-label">24-hour Time Picker</label>
                                                                    <div class="input-group">
                                                                        <input id="24hours-timepicker" type="text" class="form-control" placeholder="16:21">
                                                                            <span class="input-group-text"><i class="ri-time-line"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Time Picker w/ Limits</label>
                                                                    <div class="input-group">
                                                                        <input id="minmax-timepicker" type="text" class="form-control" placeholder="Limits">
                                                                            <span class="input-group-text"><i class="ri-time-line"></i></span>
                                                                    </div>
                                                                </div>

                                                                <div class="mb-0">
                                                                    <label class="form-label">Preloading Time</label>
                                                                    <div class="input-group">
                                                                        <input id="preloading-timepicker" type="text" class="form-control" placeholder="Pick a time">
                                                                            <span class="input-group-text"><i class="ri-time-line"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="timepicker-flatpickr-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Default Time Picker&lt;/label&gt;
                                                                &lt;div class=&quot;input-group&quot;&gt;
                                                                &lt;input id=&quot;basic-timepicker&quot; type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Basic timepicker&quot;&gt;
                                                                &lt;span class=&quot;input-group-text&quot;&gt;&lt;i class=&quot;ri-time-line&quot;&gt;&lt;/i&gt;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-0&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;24-hour Time Picker&lt;/label&gt;
                                                                &lt;div class=&quot;input-group&quot;&gt;
                                                                &lt;input id=&quot;24hours-timepicker&quot; type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;16:21&quot;&gt;
                                                                &lt;span class=&quot;input-group-text&quot;&gt;&lt;i class=&quot;ri-time-line&quot;&gt;&lt;/i&gt;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Time Picker w/ Limits&lt;/label&gt;
                                                                &lt;div class=&quot;input-group&quot;&gt;
                                                                &lt;input id=&quot;minmax-timepicker&quot; type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Limits&quot;&gt;
                                                                &lt;span class=&quot;input-group-text&quot;&gt;&lt;i class=&quot;ri-time-line&quot;&gt;&lt;/i&gt;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-0&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Preloading Time&lt;/label&gt;
                                                                &lt;div class=&quot;input-group&quot;&gt;
                                                                &lt;input id=&quot;preloading-timepicker&quot; type=&quot;text&quot; class=&quot;form-control&quot; placeholder=&quot;Pick a time&quot;&gt;
                                                                &lt;span class=&quot;input-group-text&quot;&gt;&lt;i class=&quot;ri-time-line&quot;&gt;&lt;/i&gt;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Input Masks</h4>
                                                <p class="text-muted font-14">
                                                    A jQuery Plugin to make masks on form fields and HTML elements.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#input-masks-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#input-masks-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="input-masks-preview">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <form action="#">
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Date</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="00/00/0000">
                                                                            <span class="font-13 text-muted">e.g "DD/MM/YYYY"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Hour</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="00:00:00">
                                                                            <span class="font-13 text-muted">e.g "HH:MM:SS"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Date & Hour</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="00/00/0000 00:00:00">
                                                                            <span class="font-13 text-muted">e.g "DD/MM/YYYY HH:MM:SS"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">ZIP Code</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="00000-000">
                                                                            <span class="font-13 text-muted">e.g "xxxxx-xxx"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Crazy Zip Code</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="0-00-00-00">
                                                                            <span class="font-13 text-muted">e.g "x-xx-xx-xx"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Money</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="000.000.000.000.000,00" data-reverse="true">
                                                                            <span class="font-13 text-muted">e.g "Your money"</span>
                                                                    </div>
                                                                    <div>
                                                                        <label class="form-label">Money 2</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="#.##0,00" data-reverse="true">
                                                                            <span class="font-13 text-muted">e.g "#.##0,00"</span>
                                                                    </div>

                                                                </form>
                                                            </div> <!-- end col -->

                                                            <div class="col-md-6">
                                                                <form action="#">
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Telephone</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="0000-0000">
                                                                            <span class="font-13 text-muted">e.g "xxxx-xxxx"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">Telephone with Code Area</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="(00) 0000-0000">
                                                                            <span class="font-13 text-muted">e.g "(xx) xxxx-xxxx"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">US Telephone</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="(000) 000-0000">
                                                                            <span class="font-13 text-muted">e.g "(xxx) xxx-xxxx"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">São Paulo Celphones</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="(00) 00000-0000">
                                                                            <span class="font-13 text-muted">e.g "(xx) xxxxx-xxxx"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">CPF</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="000.000.000-00" data-reverse="true">
                                                                            <span class="font-13 text-muted">e.g "xxx.xxx.xxxx-xx"</span>
                                                                    </div>
                                                                    <div class="mb-3">
                                                                        <label class="form-label">CNPJ</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="00.000.000/0000-00" data-reverse="true">
                                                                            <span class="font-13 text-muted">e.g "xx.xxx.xxx/xxxx-xx"</span>
                                                                    </div>
                                                                    <div>
                                                                        <label class="form-label">IP Address</label>
                                                                        <input type="text" class="form-control" data-toggle="input-mask" data-mask-format="099.099.099.099" data-reverse="true">
                                                                            <span class="font-13 text-muted">e.g "xxx.xxx.xxx.xxx"</span>
                                                                    </div>
                                                                </form>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="input-masks-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Input Mask js --&gt;
                                                                &lt;script src=&quot;assets/vendor/jquery-mask-plugin/jquery.mask.min.js&quot;&gt;&lt;/script&gt;
                                                            </span>

                                                            <span class="html escape">
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Date&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00/00/0000&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;DD/MM/YYYY&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Hour&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00:00:00&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;HH:MM:SS&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Date &amp; Hour&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00/00/0000 00:00:00&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;DD/MM/YYYY HH:MM:SS&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;ZIP Code&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00000-000&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;xxxxx-xxx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Crazy Zip Code&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;0-00-00-00&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;x-xx-xx-xx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Money&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;000.000.000.000.000,00&quot; data-reverse=&quot;true&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;Your money&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Money 2&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;#.##0,00&quot; data-reverse=&quot;true&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;#.##0,00&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Telephone&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;0000-0000&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;xxxx-xxxx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Telephone with Code Area&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;(00) 0000-0000&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;(xx) xxxx-xxxx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;US Telephone&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;(000) 000-0000&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;(xxx) xxx-xxxx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;S&atilde;o Paulo Celphones&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;(00) 00000-0000&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;(xx) xxxxx-xxxx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;CPF&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;000.000.000-00&quot; data-reverse=&quot;true&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;xxx.xxx.xxxx-xx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;CNPJ&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;00.000.000/0000-00&quot; data-reverse=&quot;true&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;xx.xxx.xxx/xxxx-xx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;IP Address&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-toggle=&quot;input-mask&quot; data-mask-format=&quot;099.099.099.099&quot; data-reverse=&quot;true&quot;&gt;
                                                                &lt;span class=&quot;font-13 text-muted&quot;&gt;e.g &quot;xxx.xxx.xxx.xxx&quot;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card -->
                                    </div> <!-- end col -->
                                </div> <!-- end row -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Bootstrap Touchspin</h4>
                                                <p class="text-muted font-14">
                                                    A mobile and touch friendly input spinner component for Bootstrap.
                                                    Specify attribute <code>data-toggle="touchspin"</code> and your input would be conveterted into touch friendly spinner.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#touchspin-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#touchspin-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="touchspin-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Using data attributes</label>
                                                                    <input data-toggle="touchspin" type="text" value="55">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Example with postfix (large)</label>
                                                                    <input data-toggle="touchspin" value="18.20" type="text" data-step="0.1" data-decimals="2" data-bts-postfix="%">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">With prefix</label>
                                                                    <input data-toggle="touchspin" type="text" data-bts-prefix="$">
                                                                </div>

                                                                <div class="mb-0">
                                                                    <label class="form-label">Change button class</label>
                                                                    <input data-toggle="touchspin" value="77" type="text" data-bts-button-down-class="btn btn-danger" data-bts-button-up-class="btn btn-info">
                                                                </div>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Init with empty value:</label>
                                                                    <input data-toggle="touchspin" type="text">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Max value - (Default value 100)</label>
                                                                    <input data-toggle="touchspin" data-bts-max="500" value="128" data-btn-vertical="true" type="text">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">With prefix and postfix button</label>
                                                                    <input data-toggle="touchspin" data-bts-prefix="A Button" data-bts-prefix-extra-class="btn btn-light" data-bts-postfix="A Button" data-bts-postfix-extra-class="btn btn-light" type="text">
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="touchspin-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Bootstrap Touchspin css --&gt;
                                                                &lt;link href=&quot;assets/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; /&gt;

                                                                &lt;!-- Bootstrap Touchspin js --&gt;
                                                                &lt;script src=&quot;assets/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js&quot;&gt;&lt;/script&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Using data attributes&lt;/label&gt;
                                                                &lt;input data-toggle=&quot;touchspin&quot; type=&quot;text&quot; value=&quot;55&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Example with postfix (large)&lt;/label&gt;
                                                                &lt;input data-toggle=&quot;touchspin&quot; value=&quot;18.20&quot; type=&quot;text&quot; data-step=&quot;0.1&quot; data-decimals=&quot;2&quot; data-bts-postfix=&quot;%&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;With prefix&lt;/label&gt;
                                                                &lt;input data-toggle=&quot;touchspin&quot; type=&quot;text&quot; data-bts-prefix=&quot;$&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Change button class&lt;/label&gt;
                                                                &lt;input data-toggle=&quot;touchspin&quot; value=&quot;77&quot; type=&quot;text&quot; data-bts-button-down-class=&quot;btn btn-danger&quot; data-bts-button-up-class=&quot;btn btn-info&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Init with empty value:&lt;/label&gt;
                                                                &lt;input data-toggle=&quot;touchspin&quot; type=&quot;text&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Max value - (Default value 100)&lt;/label&gt;
                                                                &lt;input data-toggle=&quot;touchspin&quot; data-bts-max=&quot;500&quot; value=&quot;128&quot; data-btn-vertical=&quot;true&quot; type=&quot;text&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;With prefix and postfix button&lt;/label&gt;
                                                                &lt;input data-toggle=&quot;touchspin&quot; data-bts-prefix=&quot;A Button&quot; data-bts-prefix-extra-class=&quot;btn btn-light&quot;  data-bts-postfix=&quot;A Button&quot; data-bts-postfix-extra-class=&quot;btn btn-light&quot; type=&quot;text&quot;&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Bootstrap Maxlength</h4>
                                                <p class="text-muted font-14">
                                                    Uses the HTML5 attribute "maxlength" to work. Just specify <code>data-toggle="maxlength"</code> attribute
                                                    to have maxlength indication on any input.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#maxlength-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#maxlength-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="maxlength-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Default usage</label>
                                                                    <p class="text-muted font-13">
                                                                        The badge will show up by default when the remaining chars are 10 or less:
                                                                    </p>
                                                                    <input type="text" class="form-control" maxlength="25" data-toggle="maxlength">
                                                                </div>

                                                                <div class="mb-3">
                                                                    <label class="form-label">Threshold value</label>
                                                                    <p class="text-muted font-13">
                                                                        Satrt displaying the indication when reached to some threshhold. Specift the data attribute <code>threshold</code>. E.g.
                                                                        <code>data-threshold="12"</code>
                                                                    </p>
                                                                    <input type="text" class="form-control" maxlength="25" data-toggle="maxlength" data-threshold="12">
                                                                </div>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Position</label>
                                                                    <p class="text-muted font-13">
                                                                        All you need to do is specify the data attribute <code>placement</code>. The possible positions are left, top, right, bottom-right, top-right, top-left,
                                                                        bottom, bottom-left and centered-right. If none is specified, the positioning will be defauted to ''bottom''.
                                                                        E.g. <code>data-placement="top"</code>
                                                                    </p>
                                                                    <input type="text" class="form-control" maxlength="25" data-toggle="maxlength" data-placement="top">
                                                                </div>

                                                                <div>
                                                                    <label class="form-label">Textareas</label>
                                                                    <p class="text-muted font-13">
                                                                        Bootstrap maxlength supports textarea as well as inputs. Even on old IE.
                                                                    </p>
                                                                    <textarea data-toggle="maxlength" class="form-control" maxlength="225" rows="3"
                                                                        placeholder="This textarea has a limit of 225 chars."></textarea>
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="maxlength-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Bootstrap Maxlength js --&gt;
                                                                &lt;script src=&quot;assets/vendor/bootstrap-maxlength/bootstrap-maxlength.min.js&quot;&gt;&lt;/script&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Default usage&lt;/label&gt;
                                                                &lt;p class=&quot;text-muted font-13&quot;&gt;
                                                                The badge will show up by default when the remaining chars are 10 or less:
                                                                &lt;/p&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; maxlength=&quot;25&quot; data-toggle=&quot;maxlength&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Threshold value&lt;/label&gt;
                                                                &lt;p class=&quot;text-muted font-13&quot;&gt;
                                                                Satrt displaying the indication when reached to some threshhold. Specift the data attribute &lt;code&gt;threshold&lt;/code&gt;. E.g.
                                                                &lt;code&gt;data-threshold=&quot;12&quot;&lt;/code&gt;
                                                                &lt;/p&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; maxlength=&quot;25&quot; data-toggle=&quot;maxlength&quot; data-threshold=&quot;12&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Position&lt;/label&gt;
                                                                &lt;p class=&quot;text-muted font-13&quot;&gt;
                                                                All you need to do is specify the data attribute &lt;code&gt;placement&lt;/code&gt;. The possible positions are left, top, right, bottom-right, top-right, top-left,
                                                                bottom, bottom-left and centered-right. If none is specified, the positioning will be defauted to ''bottom''.
                                                                E.g. &lt;code&gt;data-placement=&quot;top&quot;&lt;/code&gt;
                                                                &lt;/p&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; maxlength=&quot;25&quot; data-toggle=&quot;maxlength&quot; data-placement=&quot;top&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Textareas&lt;/label&gt;
                                                                &lt;p class=&quot;text-muted font-13&quot;&gt;
                                                                Bootstrap maxlength supports textarea as well as inputs. Even on old IE.
                                                                &lt;/p&gt;
                                                                &lt;textarea data-toggle=&quot;maxlength&quot; class=&quot;form-control&quot; maxlength=&quot;225&quot; rows=&quot;3&quot;
                                                                placeholder=&quot;This textarea has a limit of 225 chars.&quot;&gt;&lt;/textarea&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->


                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Timepicker</h4>
                                                <p class="text-muted font-14">
                                                    Easily select a time for a text input using your mouse or keyboards arrow keys. Specify attribute <code>data-toggle="timepicker"</code>
                                                    and you would have nice timepicker input element.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#timepicker-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#timepicker-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="timepicker-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Default Time Picker</label>
                                                                    <div class="input-group" id="timepicker-input-group1">
                                                                        <input id="timepicker" type="text" class="form-control" data-provide="timepicker">
                                                                            <span class="input-group-text"><i class="ri-time-line"></i></span>
                                                                    </div>
                                                                </div>

                                                                <div class="mb-0">
                                                                    <label class="form-label">24 Hour Mode Time Picker E.g. <code>data-show-meridian="false"</code></label>
                                                                    <div class="input-group" id="timepicker-input-group2">
                                                                        <input id="timepicker2" type="text" class="form-control" data-provide='' timepicker'' data-show-meridian="false" >
                                                                        <span class="input-group-text"><i class="ri-time-line"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-0">
                                                                    <label class="form-label">Specify a step for the minute field E.g. <code>data-minute-step="5"</code></label>
                                                                    <div class="input-group" id="timepicker-input-group3">
                                                                        <input id="timepicker3" type="text" class="form-control" data-provide='' timepicker'' data-minute-step="5">
                                                                        <span class="input-group-text"><i class="ri-time-line"></i></span>
                                                                    </div>
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="timepicker-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Bootstrap Timepicker css --&gt;
                                                                &lt;link href=&quot;assets/vendor/bootstrap-timepicker/css/bootstrap-timepicker.min.css&quot; rel=&quot;stylesheet&quot; type=&quot;text/css&quot; /&gt;

                                                                &lt;!-- Bootstrap Timepicker js --&gt;
                                                                &lt;script src=&quot;assets/vendor/bootstrap-timepicker/js/bootstrap-timepicker.min.js&quot;&gt;&lt;/script&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Default Time Picker&lt;/label&gt;
                                                                &lt;div class=&quot;input-group&quot; id=&quot;timepicker-input-group1&quot;&gt;
                                                                &lt;input id=&quot;timepicker&quot; type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;timepicker&quot;&gt;
                                                                &lt;span class=&quot;input-group-text&quot;&gt;&lt;i class=&quot;ri-time-line&quot;&gt;&lt;/i&gt;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-0&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;24 Hour Mode Time Picker E.g. &lt;code&gt;data-show-meridian=&quot;false&quot;&lt;/code&gt;&lt;/label&gt;
                                                                &lt;div class=&quot;input-group&quot; id=&quot;timepicker-input-group2&quot;&gt;
                                                                &lt;input id=&quot;timepicker2&quot; type=&quot;text&quot; class=&quot;form-control&quot; data-provide=''timepicker'' data-show-meridian=&quot;false&quot; &gt;
                                                                &lt;span class=&quot;input-group-text&quot;&gt;&lt;i class=&quot;ri-time-line&quot;&gt;&lt;/i&gt;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-0&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Specify a step for the minute field E.g. &lt;code&gt;data-minute-step=&quot;5&quot;&lt;/code&gt;&lt;/label&gt;
                                                                &lt;div class=&quot;input-group&quot; id=&quot;timepicker-input-group3&quot;&gt;
                                                                &lt;input id=&quot;timepicker3&quot; type=&quot;text&quot; class=&quot;form-control&quot; data-provide=''timepicker'' data-minute-step=&quot;5&quot;&gt;
                                                                &lt;span class=&quot;input-group-text&quot;&gt;&lt;i class=&quot;ri-time-line&quot;&gt;&lt;/i&gt;&lt;/span&gt;
                                                                &lt;/div&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->

                                <div class="row">
                                    <div class="col-12">
                                        <div class="card">
                                            <div class="card-body">
                                                <h4 class="header-title">Typeahead</h4>
                                                <p class="text-muted font-14">
                                                    Typeahead.js is a fast and fully-featured autocomplete library.
                                                </p>

                                                <ul class="nav nav-tabs nav-bordered mb-3">
                                                    <li class="nav-item">
                                                        <a href="#typeahead-preview" data-bs-toggle="tab" aria-expanded="false" class="nav-link active">
                                                            Preview
                                                        </a>
                                                    </li>
                                                    <li class="nav-item">
                                                        <a href="#typeahead-code" data-bs-toggle="tab" aria-expanded="true" class="nav-link">
                                                            Code
                                                        </a>
                                                    </li>
                                                </ul> <!-- end nav-->
                                                <div class="tab-content">
                                                    <div class="tab-pane show active" id="typeahead-preview">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">The Basics</label>
                                                                    <input type="text" class="form-control" data-provide="typeahead" id="the-basics" placeholder="Basic Example">
                                                                </div>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Bloodhound (Suggestion Engine)</label>
                                                                    <input id="bloodhound" class="form-control" type="text" placeholder="States of USA">
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Prefetch</label>
                                                                    <input type="text" class="form-control" data-provide="typeahead" id="prefetch" placeholder="States of USA">
                                                                </div>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Remote</label>
                                                                    <input type="text" class="form-control" data-provide="typeahead" id="remote" placeholder="States of USA">
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Custom Templates</label>
                                                                    <input id="custom-templates" class="form-control" type="text" placeholder="States of USA">
                                                                </div>
                                                            </div> <!-- end col -->

                                                            <div class="col-lg-6 mt-3 mt-lg-0">
                                                                <div class="mb-3">
                                                                    <label class="form-label">Default Suggestions</label>
                                                                    <input type="text" class="form-control" data-provide="typeahead" id="default-suggestions">
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->

                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="mb-0">
                                                                    <label class="form-label">Multiple Datasets</label>
                                                                    <input type="text" class="form-control" data-provide="typeahead" id="multiple-datasets">
                                                                </div>
                                                            </div> <!-- end col -->
                                                        </div>
                                                        <!-- end row -->
                                                    </div> <!-- end preview-->

                                                    <div class="tab-pane code" id="typeahead-code">
                                                        <button class="btn-copy-clipboard" data-clipboard-action="copy">Copy</button>
                                                        <pre class="mb-0">
                                                            <span class="html escape">
                                                                &lt;!-- Typehead --&gt;
                                                                &lt;script src=&quot;assets/vendor/handlebars/handlebars.min.js&quot;&gt;&lt;/script&gt;
                                                                &lt;script src=&quot;assets/vendor/typeahead.js/typeahead.bundle.min.js&quot;&gt;&lt;/script&gt;

                                                                &lt;!-- Typehead Demo js --&gt;
                                                                &lt;script src=&quot;assets/js/pages/demo.typehead.js&quot;&gt;&lt;/script&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;The Basics&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;typeahead&quot; id=&quot;the-basics&quot; placeholder=&quot;Basic Example&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Bloodhound (Suggestion Engine)&lt;/label&gt;
                                                                &lt;input id=&quot;bloodhound&quot; class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;States of USA&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Prefetch&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;typeahead&quot; id=&quot;prefetch&quot; placeholder=&quot;States of USA&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Remote&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;typeahead&quot; id=&quot;remote&quot; placeholder=&quot;States of USA&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Custom Templates&lt;/label&gt;
                                                                &lt;input id=&quot;custom-templates&quot; class=&quot;form-control&quot; type=&quot;text&quot; placeholder=&quot;States of USA&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Default Suggestions&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;typeahead&quot; id=&quot;default-suggestions&quot;&gt;
                                                                &lt;/div&gt;

                                                                &lt;div class=&quot;mb-3&quot;&gt;
                                                                &lt;label class=&quot;form-label&quot;&gt;Multiple Datasets&lt;/label&gt;
                                                                &lt;input type=&quot;text&quot; class=&quot;form-control&quot; data-provide=&quot;typeahead&quot; id=&quot;multiple-datasets&quot;&gt;
                                                                &lt;/div&gt;
                                                            </span>
                                                        </pre> <!-- end highlight-->
                                                    </div> <!-- end preview code-->
                                                </div> <!-- end tab-content-->

                                            </div> <!-- end card-body -->
                                        </div> <!-- end card-->
                                    </div> <!-- end col -->
                                </div>
                                <!-- end row -->


                            </div> <!-- container -->

                        </div> <!-- content -->

                        <!-- Footer Start -->
                        <footer class="footer">
                            <div class="container-fluid">
                                <div class="row">
                                    <div class="col-md-6">
                                        <script>document.write(new Date().getFullYear())</script> © Hyper - Coderthemes.com
                                    </div>
                                    <div class="col-md-6">
                                        <div class="text-md-end footer-links d-none d-md-block">
                                            <a href="javascript: void(0);">About</a>
                                            <a href="javascript: void(0);">Support</a>
                                            <a href="javascript: void(0);">Contact Us</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </footer>
                        <!-- end Footer -->

                    </div>

                    <!-- ============================================================== -->
                    <!-- End Page content -->
                    <!-- ============================================================== -->

                </div>
                <!-- END wrapper -->

                <!-- Theme Settings -->
                <div class="offcanvas offcanvas-end" tabindex="-1" id="theme-settings-offcanvas">
                    <div class="d-flex align-items-center bg-primary p-3 offcanvas-header">
                        <h5 class="text-white m-0">Theme Settings</h5>
                        <button type="button" class="btn-close btn-close-white ms-auto" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>

                    <div class="offcanvas-body p-0">
                        <div data-simplebar class="h-100">
                            <div class="card mb-0 p-3">
                                <h5 class="mt-0 font-16 fw-bold mb-3">Choose Layout</h5>
                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-check card-radio">
                                            <input id="customizer-layout01" name="data-layout" type="radio" value="vertical" class="form-check-input">
                                                <label class="form-check-label p-0 avatar-md w-100" for="customizer-layout01">
                                                    <span class="d-flex h-100">
                                                        <span class="flex-shrink-0">
                                                            <span class="bg-light d-flex h-100 border-end flex-column p-1 px-2">
                                                                <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                            </span>
                                                        </span>
                                                        <span class="flex-grow-1">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light d-block p-1"></span>
                                                            </span>
                                                        </span>
                                                    </span>
                                                </label>
                                        </div>
                                        <h5 class="font-14 text-center text-muted mt-2">Vertical</h5>
                                    </div>
                                    <div class="col-4">
                                        <div class="form-check card-radio">
                                            <input id="customizer-layout02" name="data-layout" type="radio" value="horizontal" class="form-check-input">
                                                <label class="form-check-label p-0 avatar-md w-100" for="customizer-layout02">
                                                    <span class="d-flex h-100 flex-column">
                                                        <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                            <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                            <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                            <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                            <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                            <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                        </span>
                                                        <span class="bg-light d-block p-1"></span>
                                                    </span>
                                                </label>
                                        </div>
                                        <h5 class="font-14 text-center text-muted mt-2">Horizontal</h5>
                                    </div>
                                </div>

                                <h5 class="my-3 font-16 fw-bold">Color Scheme</h5>

                                <div class="colorscheme-cardradio">
                                    <div class="row">
                                        <div class="col-4">
                                            <div class="form-check card-radio">
                                                <input class="form-check-input" type="radio" name="data-bs-theme" id="layout-color-light" value="light">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="layout-color-light">
                                                        <div id="sidebar-size">
                                                            <span class="d-flex h-100">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-light d-flex h-100 border-end flex-column p-1 px-2">
                                                                        <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    </span>
                                                                </span>
                                                                <span class="flex-grow-1">
                                                                    <span class="d-flex h-100 flex-column bg-white rounded-2">
                                                                        <span class="bg-light d-block p-1"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div id="topnav-color" class="bg-white rounded-2 h-100">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                </span>
                                                                <span class="d-flex h-100 flex-column bg-white rounded-2">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </div>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Light</h5>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-check card-radio">
                                                <input class="form-check-input" type="radio" name="data-bs-theme" id="layout-color-dark" value="dark">
                                                    <label class="form-check-label p-0 avatar-md w-100 bg-black" for="layout-color-dark">
                                                        <div id="sidebar-size">
                                                            <span class="d-flex h-100">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-light d-flex h-100 flex-column p-1 px-2">
                                                                        <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                        <span class="d-block border border-secondary border-opacity-25 border-3 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-secondary border-opacity-25 border-3 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-secondary border-opacity-25 border-3 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-secondary border-opacity-25 border-3 rounded w-100 mb-1"></span>
                                                                    </span>
                                                                </span>
                                                                <span class="flex-grow-1">
                                                                    <span class="d-flex h-100 flex-column">
                                                                        <span class="bg-light d-block p-1"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div id="topnav-color">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light-lighten d-flex p-1 align-items-center border-bottom border-opacity-25 border-primary border-opacity-25">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                    <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-auto"></span>
                                                                    <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-1"></span>
                                                                    <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-1"></span>
                                                                    <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-1"></span>
                                                                </span>
                                                                <span class="bg-light-lighten d-block p-1"></span>
                                                            </span>
                                                        </div>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Dark</h5>
                                        </div>
                                    </div>
                                </div>

                                <div id="layout-width">
                                    <h5 class="my-3 font-16 fw-bold">Layout Mode</h5>

                                    <div class="row">
                                        <div class="col-4">
                                            <div class="form-check card-radio">
                                                <input class="form-check-input" type="radio" name="data-layout-mode" id="layout-mode-fluid" value="fluid">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="layout-mode-fluid">
                                                        <div id="sidebar-size">
                                                            <span class="d-flex h-100">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-light d-flex h-100 border-end flex-column p-1 px-2">
                                                                        <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    </span>
                                                                </span>
                                                                <span class="flex-grow-1">
                                                                    <span class="d-flex h-100 flex-column rounded-2">
                                                                        <span class="bg-light d-block p-1"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div id="topnav-color">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                </span>
                                                                <span class="bg-light d-block p-1"></span>
                                                            </span>
                                                        </div>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Fluid</h5>
                                        </div>
                                        <div class="col-4" id="layout-boxed">
                                            <div class="form-check card-radio">
                                                <input class="form-check-input" type="radio" name="data-layout-mode" id="layout-mode-boxed" value="boxed">
                                                    <label class="form-check-label p-0 avatar-md w-100 px-2" for="layout-mode-boxed">
                                                        <div id="sidebar-size" class="border-start border-end">
                                                            <span class="d-flex h-100">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-light d-flex h-100 border-end flex-column p-1 px-2">
                                                                        <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    </span>
                                                                </span>
                                                                <span class="flex-grow-1">
                                                                    <span class="d-flex h-100 flex-column rounded-2">
                                                                        <span class="bg-light d-block p-1"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div id="topnav-color" class="border-start border-end h-100">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                </span>
                                                                <span class="bg-light d-block p-1"></span>
                                                            </span>
                                                        </div>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Boxed</h5>
                                        </div>

                                        <div class="col-4" id="layout-detached">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-layout-mode" id="data-layout-detached" value="detached">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="data-layout-detached">
                                                        <span class="d-flex h-100 flex-column">
                                                            <span class="bg-light d-flex p-1 align-items-center border-bottom ">
                                                                <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                            </span>
                                                            <span class="d-flex h-100 p-1 px-2">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-light d-flex h-100 flex-column p-1 px-2">
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                            <span class="bg-light d-block p-1 mt-auto px-2"></span>
                                                        </span>

                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Detached</h5>
                                        </div>
                                    </div>
                                </div>

                                <h5 class="my-3 font-16 fw-bold">Topbar Color</h5>

                                <div class="row">
                                    <div class="col-4">
                                        <div class="form-check card-radio">
                                            <input class="form-check-input" type="radio" name="data-topbar-color" id="topbar-color-light" value="light">
                                                <label class="form-check-label p-0 avatar-md w-100" for="topbar-color-light">
                                                    <div id="sidebar-size">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="bg-light d-flex h-100 border-end  flex-column p-1 px-2">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <div id="topnav-color">
                                                        <span class="d-flex h-100 flex-column">
                                                            <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                                <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                            </span>
                                                            <span class="bg-light d-block p-1"></span>
                                                        </span>
                                                    </div>
                                                </label>
                                        </div>
                                        <h5 class="font-14 text-center text-muted mt-2">Light</h5>
                                    </div>

                                    <div class="col-4" style="--ct-dark-rgb: 64,73,84;">
                                        <div class="form-check card-radio">
                                            <input class="form-check-input" type="radio" name="data-topbar-color" id="topbar-color-dark" value="dark">
                                                <label class="form-check-label p-0 avatar-md w-100" for="topbar-color-dark">
                                                    <div id="sidebar-size">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="bg-light d-flex h-100 border-end  flex-column p-1 px-2">
                                                                    <span class="d-block p-1 bg-primary-lighten rounded mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-dark d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <div id="topnav-color">
                                                        <span class="d-flex h-100 flex-column">
                                                            <span class="bg-dark d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                                <span class="d-block p-1 bg-primary-lighten rounded me-1"></span>
                                                                <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-auto"></span>
                                                                <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-1"></span>
                                                                <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-1"></span>
                                                                <span class="d-block border border-primary border-opacity-25 border-3 rounded ms-1"></span>
                                                            </span>
                                                            <span class="bg-light d-block p-1"></span>
                                                        </span>
                                                    </div>
                                                </label>
                                        </div>
                                        <h5 class="font-14 text-center text-muted mt-2">Dark</h5>
                                    </div>

                                    <div class="col-4">
                                        <div class="form-check card-radio">
                                            <input class="form-check-input" type="radio" name="data-topbar-color" id="topbar-color-brand" value="brand">
                                                <label class="form-check-label p-0 avatar-md w-100" for="topbar-color-brand">
                                                    <div id="sidebar-size">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="bg-light d-flex h-100 border-end  flex-column p-1 px-2">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-primary bg-gradient d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </div>

                                                    <div id="topnav-color">
                                                        <span class="d-flex h-100 flex-column">
                                                            <span class="bg-primary bg-gradient d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                                <span class="d-block p-1 bg-light opacity-25 rounded me-1"></span>
                                                                <span class="d-block border border-3 border opacity-25 rounded ms-auto"></span>
                                                                <span class="d-block border border-3 border opacity-25 rounded ms-1"></span>
                                                                <span class="d-block border border-3 border opacity-25 rounded ms-1"></span>
                                                                <span class="d-block border border-3 border opacity-25 rounded ms-1"></span>
                                                            </span>
                                                            <span class="bg-light d-block p-1"></span>
                                                        </span>
                                                    </div>
                                                </label>
                                        </div>
                                        <h5 class="font-14 text-center text-muted mt-2">Brand</h5>
                                    </div>
                                </div>

                                <div>
                                    <h5 class="my-3 font-16 fw-bold">Menu Color</h5>

                                    <div class="row">
                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-menu-color" id="leftbar-color-light" value="light">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-color-light">
                                                        <div id="sidebar-size">
                                                            <span class="d-flex h-100">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-light d-flex h-100 border-end  flex-column p-1 px-2">
                                                                        <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                        <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    </span>
                                                                </span>
                                                                <span class="flex-grow-1">
                                                                    <span class="d-flex h-100 flex-column">
                                                                        <span class="bg-light d-block p-1"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div id="topnav-color">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary border-opacity-25">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                </span>
                                                                <span class="bg-light d-block p-1"></span>
                                                            </span>
                                                        </div>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Light</h5>
                                        </div>

                                        <div class="col-4" style="--ct-dark-rgb: 64,73,84;">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-menu-color" id="leftbar-color-dark" value="dark">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-color-dark">
                                                        <div id="sidebar-size">
                                                            <span class="d-flex h-100">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-dark d-flex h-100 flex-column p-1 px-2">
                                                                        <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                        <span class="d-block border border-secondary rounded border-opacity-25 border-3 w-100 mb-1"></span>
                                                                        <span class="d-block border border-secondary rounded border-opacity-25 border-3 w-100 mb-1"></span>
                                                                        <span class="d-block border border-secondary rounded border-opacity-25 border-3 w-100 mb-1"></span>
                                                                        <span class="d-block border border-secondary rounded border-opacity-25 border-3 w-100 mb-1"></span>
                                                                    </span>
                                                                </span>
                                                                <span class="flex-grow-1">
                                                                    <span class="d-flex h-100 flex-column">
                                                                        <span class="bg-light d-block p-1"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div id="topnav-color">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary border-primary border-opacity-25">
                                                                    <span class="d-block p-1 bg-primary-lighten rounded me-1"></span>
                                                                    <span class="d-block border border-secondary rounded border-opacity-25 border-3 ms-auto"></span>
                                                                    <span class="d-block border border-secondary rounded border-opacity-25 border-3 ms-1"></span>
                                                                    <span class="d-block border border-secondary rounded border-opacity-25 border-3 ms-1"></span>
                                                                    <span class="d-block border border-secondary rounded border-opacity-25 border-3 ms-1"></span>
                                                                </span>
                                                                <span class="bg-dark d-block p-1"></span>
                                                            </span>
                                                        </div>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Dark</h5>
                                        </div>
                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-menu-color" id="leftbar-color-brand" value="brand">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-color-brand">
                                                        <div id="sidebar-size">
                                                            <span class="d-flex h-100">
                                                                <span class="flex-shrink-0">
                                                                    <span class="bg-primary bg-gradient d-flex h-100 flex-column p-1 px-2">
                                                                        <span class="d-block p-1 bg-light-lighten rounded mb-1"></span>
                                                                        <span class="d-block border opacity-25 rounded border-3 w-100 mb-1"></span>
                                                                        <span class="d-block border opacity-25 rounded border-3 w-100 mb-1"></span>
                                                                        <span class="d-block border opacity-25 rounded border-3 w-100 mb-1"></span>
                                                                        <span class="d-block border opacity-25 rounded border-3 w-100 mb-1"></span>
                                                                    </span>
                                                                </span>
                                                                <span class="flex-grow-1">
                                                                    <span class="d-flex h-100 flex-column">
                                                                        <span class="bg-light d-block p-1"></span>
                                                                    </span>
                                                                </span>
                                                            </span>
                                                        </div>

                                                        <div id="topnav-color">
                                                            <span class="d-flex h-100 flex-column">
                                                                <span class="bg-light d-flex p-1 align-items-center border-bottom border-secondary">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded me-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-auto"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded ms-1"></span>
                                                                </span>
                                                                <span class="bg-primary bg-gradient d-block p-1"></span>
                                                            </span>
                                                        </div>

                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Brand</h5>
                                        </div>
                                    </div>
                                </div>

                                <div id="sidebar-size">
                                    <h5 class="my-3 font-16 fw-bold">Sidebar Size</h5>

                                    <div class="row">
                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-sidenav-size" id="leftbar-size-default" value="default">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-size-default">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="bg-light d-flex h-100 border-end  flex-column p-1 px-2">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Default</h5>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-sidenav-size" id="leftbar-size-compact" value="compact">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-size-compact">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="bg-light d-flex h-100 border-end  flex-column p-1">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Compact</h5>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-sidenav-size" id="leftbar-size-small" value="condensed">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-size-small">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="bg-light d-flex h-100 border-end flex-column" style="padding: 2px;">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Condensed</h5>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-sidenav-size" id="leftbar-size-small-hover" value="sm-hover">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-size-small-hover">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="bg-light d-flex h-100 border-end flex-column" style="padding: 2px;">
                                                                    <span class="d-block p-1 bg-dark-lighten rounded mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                    <span class="d-block border border-3 border-secondary border-opacity-25 rounded w-100 mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Hover View</h5>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-sidenav-size" id="leftbar-size-full" value="full">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-size-full">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-shrink-0">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="d-block p-1 bg-dark-lighten mb-1"></span>
                                                                </span>
                                                            </span>
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Full Layout</h5>
                                        </div>

                                        <div class="col-4">
                                            <div class="form-check sidebar-setting card-radio">
                                                <input class="form-check-input" type="radio" name="data-sidenav-size" id="leftbar-size-fullscreen" value="fullscreen">
                                                    <label class="form-check-label p-0 avatar-md w-100" for="leftbar-size-fullscreen">
                                                        <span class="d-flex h-100">
                                                            <span class="flex-grow-1">
                                                                <span class="d-flex h-100 flex-column">
                                                                    <span class="bg-light d-block p-1"></span>
                                                                </span>
                                                            </span>
                                                        </span>
                                                    </label>
                                            </div>
                                            <h5 class="font-14 text-center text-muted mt-2">Fullscreen Layout</h5>
                                        </div>
                                    </div>
                                </div>

                                <div id="layout-position">
                                    <h5 class="my-3 font-16 fw-bold">Layout Position</h5>

                                    <div class="btn-group radio" role="group">
                                        <input type="radio" class="btn-check" name="data-layout-position" id="layout-position-fixed" value="fixed">
                                            <label class="btn btn-soft-primary w-sm" for="layout-position-fixed">Fixed</label>

                                            <input type="radio" class="btn-check" name="data-layout-position" id="layout-position-scrollable" value="scrollable">
                                                <label class="btn btn-soft-primary w-sm ms-0" for="layout-position-scrollable">Scrollable</label>
                                            </div>
                                    </div>

                                    <div id="sidebar-user">
                                        <div class="d-flex justify-content-between align-items-center mt-3">
                                            <label class="font-16 fw-bold m-0" for="sidebaruser-check">Sidebar User Info</label>
                                            <div class="form-check form-switch">
                                                <input type="checkbox" class="form-check-input" name="sidebar-user" id="sidebaruser-check">
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                        </div>
                        <div class="offcanvas-footer border-top p-3 text-center">
                            <div class="row">
                                <div class="col-6">
                                    <button type="button" class="btn btn-light w-100" id="reset-layout">Reset</button>
                                </div>
                                <div class="col-6">
                                    <a href="https://themes.getbootstrap.com/product/hyper-responsive-admin-dashboard-template/" target="_blank" role="button" class="btn btn-primary w-100">Buy Now</a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Vendor js -->
                    <script src="assets/js/vendor.min.js"></script>

                    <!-- Code Highlight js -->
                    <script src="assets/vendor/highlightjs/highlight.pack.min.js"></script>
                    <script src="assets/vendor/clipboard/clipboard.min.js"></script>
                    <script src="assets/js/hyper-syntax.js"></script>

                    <!--  Select2 Plugin Js -->
                    <script src="assets/vendor/select2/js/select2.min.js"></script>

                    <!-- Daterangepicker Plugin js -->
                    <script src="assets/vendor/daterangepicker/moment.min.js"></script>
                    <script src="assets/vendor/daterangepicker/daterangepicker.js"></script>

                    <!-- Bootstrap Datepicker Plugin js -->
                    <script src="assets/vendor/bootstrap-datepicker/js/bootstrap-datepicker.min.js"></script>

                    <!-- Bootstrap Timepicker Plugin js -->
                    <script src="assets/vendor/bootstrap-timepicker/js/bootstrap-timepicker.min.js"></script>

                    <!-- Input Mask Plugin js -->
                    <script src="assets/vendor/jquery-mask-plugin/jquery.mask.min.js"></script>

                    <!-- Bootstrap Touchspin Plugin js -->
                    <script src="assets/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>

                    <!-- Bootstrap Maxlength Plugin js -->
                    <script src="assets/vendor/bootstrap-maxlength/bootstrap-maxlength.min.js"></script>

                    <!-- Typehead Plugin js -->
                    <script src="assets/vendor/handlebars/handlebars.min.js"></script>
                    <script src="assets/vendor/typeahead.js/typeahead.bundle.min.js"></script>

                    <!-- Flatpickr Timepicker Plugin js -->
                    <script src="assets/vendor/flatpickr/flatpickr.min.js"></script>

                    <!-- Typehead Demo js -->
                    <script src="assets/js/pages/demo.typehead.js"></script>

                    <!-- Timepicker Demo js -->
                    <script src="assets/js/pages/demo.timepicker.js"></script>

                    <!-- App js -->
                    <script src="assets/js/app.min.js"></script>

            </body>

            <!-- Mirrored from coderthemes.com/hyper/saas/form-advanced.html by HTTrack Website Copier/3.x [XR&CO''2014], Tue, 05 Dec 2023 10:44:42 GMT -->
        </html>
        ', N'Jul 19 2024  2:03PM', 1, N'Jul 19 2024  3:12PM')
        GO
        SET IDENTITY_INSERT [dbo].[EmailTemplates] OFF
        GO
        SET IDENTITY_INSERT [dbo].[ErrorLog] ON
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (1, NULL, N'Sendmail', N'RegisterAsync', N'', N'Object reference not set to an instance of an object.', CAST(N'2024-07-13T14:49:36.440' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (2, NULL, N'Proc_Invoice', N'InsertInvoiceData', N'InsertInvoiceData', N'Trying to pass a table-valued parameter with 4 column(s) where the corresponding user-defined table type requires 5 column(s).', CAST(N'2024-06-05T13:03:19.670' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (3, NULL, N'Proc_Invoice', N'InsertInvoiceData', N'InsertInvoiceData', N'Trying to pass a table-valued parameter with 4 column(s) where the corresponding user-defined table type requires 5 column(s).', CAST(N'2024-06-05T13:06:25.267' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (4, NULL, N'UserService', N'LoginAsync', N'', N'Session has not been configured for this application or request.', CAST(N'2024-06-06T11:24:04.110' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (5, NULL, N'UserService', N'LoginAsync', N'', N'Procedure or function ''Proc_IncrementInvalidLoginAttempts'' expects parameter ''@Username'', which was not supplied.', CAST(N'2024-06-06T11:42:44.500' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (6, NULL, N'Proc_Appointment', N'call', N'Proc_InsertPatientAndAppointment', N'Cannot access a disposed object.
        Object name: ''Microsoft.AspNetCore.Identity.UserManager`1[[API.DBContext.ApplicationUser, API, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]''.', CAST(N'2024-06-07T18:41:35.773' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (7, NULL, N'UserService', N'RegisterAsync', N'', N'Cannot access a disposed object.
        Object name: ''Microsoft.AspNetCore.Identity.UserManager`1[[API.DBContext.ApplicationUser, API, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null]]''.', CAST(N'2024-06-07T18:56:17.430' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (8, NULL, N'Proc_AddOrUpdateMedicines', N'call', N'Proc_UpsertMedicineAndStock', N'Procedure or function Proc_UpsertMedicineAndStock has too many arguments specified.', CAST(N'2024-06-10T13:55:18.497' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (9, NULL, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Error converting data type nvarchar to date.', CAST(N'2024-06-11T18:08:09.493' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (10, NULL, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Error converting data type nvarchar to date.', CAST(N'2024-06-11T18:10:46.387' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (11, NULL, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Procedure or function Prc_InsertOrUpdateProject has too many arguments specified.', CAST(N'2024-06-11T18:11:12.740' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (12, NULL, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Procedure or function ''Prc_InsertOrUpdateProject'' expects parameter ''@UserEmail'', which was not supplied.', CAST(N'2024-06-11T18:32:12.130' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (13, NULL, N'Proc_AddDoctor', N'call', N'proc_InsertOrUpdateDoctor', N'Error converting data type nvarchar to date.', CAST(N'2024-06-14T17:57:37.300' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (14, NULL, N'Proc_AddDoctor', N'call', N'proc_InsertOrUpdateDoctor', N'Error converting data type nvarchar to date.', CAST(N'2024-06-14T18:02:44.447' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (15, NULL, N'Proc_GetPatientById', N'call', N'Proc_GetPatientsById', N'Procedure or function ''Proc_GetPatientsById'' expects parameter ''@PId'', which was not supplied.', CAST(N'2024-06-27T15:11:46.560' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (16, NULL, N'Proc_GetPatientById', N'call', N'Proc_GetPatientsById', N'Procedure or function ''Proc_GetPatientsById'' expects parameter ''@PId'', which was not supplied.', CAST(N'2024-06-27T15:12:32.477' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (17, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-27T17:31:58.497' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (18, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-27T17:40:45.720' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (19, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-27T17:49:03.520' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (20, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-27T17:50:11.377' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (21, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-27T17:57:14.853' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (22, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-27T18:14:53.797' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (23, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-27T18:15:53.370' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (24, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'Procedure or function ''proc_InsertOrUpdatePatient'' expects parameter ''@Status'', which was not supplied.', CAST(N'2024-06-27T18:17:44.260' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (25, NULL, N'Proc_AddPatient', N'call', N'proc_InsertOrUpdatePatient', N'SqlDateTime overflow. Must be between 1/1/1753 12:00:00 AM and 12/31/9999 11:59:59 PM.', CAST(N'2024-06-29T11:13:12.237' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (26, NULL, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Procedure or function ''Prc_InsertOrUpdateProject'' expects parameter ''@ProjectId'', which was not supplied.', CAST(N'2024-07-01T12:34:20.763' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (27, NULL, N'Sendmail', N'RegisterAsync', N'', N'Value cannot be null. (Parameter ''addresses'')', CAST(N'2024-07-01T12:59:50.313' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (28, NULL, N'Sendmail', N'RegisterAsync', N'', N'Value cannot be null. (Parameter ''addresses'')', CAST(N'2024-07-01T13:03:36.100' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (29, NULL, N'Proc_AddPurchaseService', N'call', N'Proc_ManagePurchase', N'Procedure or function Proc_ManagePurchase has too many arguments specified.', CAST(N'2024-07-01T13:15:27.663' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (30, NULL, N'Proc_AddPremiumServices', N'call', N'Proc_InsertOrUpdatePremiumService', N'Procedure or function ''Proc_InsertOrUpdatePremiumService'' expects parameter ''@EmergencyAlertService'', which was not supplied.', CAST(N'2024-07-01T13:47:57.917' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (31, NULL, N'Proc_AddPremiumServices', N'call', N'Proc_InsertOrUpdatePremiumService', N'Procedure or function ''Proc_InsertOrUpdatePremiumService'' expects parameter ''@EmergencyAlertService'', which was not supplied.', CAST(N'2024-07-01T13:49:52.843' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (32, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T17:12:06.607' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (33, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T17:53:24.890' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (34, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T17:57:54.143' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (35, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T18:02:39.690' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (36, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T18:03:18.080' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (37, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T18:03:56.500' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (38, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T18:04:31.333' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (39, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T18:11:15.473' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (40, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T18:13:27.743' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (41, NULL, N'Proc_UpdateApplicationSetting', N'call', N'UpdateApplicationSetting', N'Procedure or function ''UpdateApplicationSetting'' expects parameter ''@IsMultipleVendorAllowed'', which was not supplied.', CAST(N'2024-07-01T18:15:58.300' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (42, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T11:29:12.840' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (43, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T11:37:56.277' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (44, NULL, N'Proc_AddProjectDetails', N'call', N'Prc_InsertOrUpdateProject', N'Procedure or function ''Prc_InsertOrUpdateProject'' expects parameter ''@Validity'', which was not supplied.', CAST(N'2024-07-04T12:03:15.380' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (45, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:47:36.543' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (46, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:47:41.660' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (47, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:47:45.603' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (48, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:47:45.797' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (49, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:47:58.347' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (50, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:48:56.577' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (51, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:48:57.677' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (52, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:48:58.263' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (53, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:48:58.600' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (54, NULL, N'UserService', N'RegisterAsync', N'', N'An error occurred while saving the entity changes. See the inner exception for details.', CAST(N'2024-07-04T16:49:03.897' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (55, NULL, N'UserValidation', N'ValidateEmail', N'', N'Invalid operation. The connection is closed.', CAST(N'2024-07-04T16:51:09.953' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (56, NULL, N'Proc_Appointment', N'call', N'Proc_UpsertAppointment', N'Error converting data type nvarchar to date.', CAST(N'2024-07-05T14:35:52.447' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (57, NULL, N'HashPassword', N'DecodeFrom64', N'', N'Padding is invalid and cannot be removed.', CAST(N'2024-07-05T14:36:17.013' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (58, NULL, N'HashPassword', N'DecodeFrom64', N'', N'Padding is invalid and cannot be removed.', CAST(N'2024-07-05T14:36:22.993' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (59, NULL, N'HashPassword', N'DecodeFrom64', N'', N'Padding is invalid and cannot be removed.', CAST(N'2024-07-05T16:04:33.110' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (60, NULL, N'UserValidation', N'ValidateEmail', N'', N'Cannot access a disposed context instance. A common cause of this error is disposing a context instance that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application. This may occur if you are calling ''Dispose'' on the context instance, or wrapping it in a using statement. If you are using dependency injection, you should let the dependency injection container take care of disposing context instances.
        Object name: ''ApplicationDbContext''.', CAST(N'2024-07-05T18:12:51.727' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (61, NULL, N'Proc_GetApplicationSettingByIdOnload', N'call', N'Proc_GetApplicationSettingById', N'The member ProjectId of type Entities.Response.Response cannot be used as a parameter value', CAST(N'2024-07-05T18:49:28.513' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (62, NULL, N'Proc_GetPremiumServices', N'call', N'Proc_GetPremiumService', N'Invalid object name ''PremiumServices''.', CAST(N'2024-07-08T10:33:46.593' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (63, NULL, N'Proc_GetPremiumServices', N'call', N'Proc_GetPremiumService', N'Invalid object name ''PremiumServices''.', CAST(N'2024-07-08T10:48:26.950' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (64, NULL, N'Proc_GetPremiumServices', N'call', N'Proc_GetPremiumService', N'Invalid object name ''PremiumServices''.', CAST(N'2024-07-08T10:48:45.037' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (65, NULL, N'Proc_GetPremiumServices', N'call', N'Proc_GetPremiumService', N'Invalid object name ''PremiumServices''.', CAST(N'2024-07-08T10:49:30.467' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (66, NULL, N'Proc_GetPurchaseService', N'call', N'Proc_GetPurchasesService', N'Error converting data type nvarchar to int.', CAST(N'2024-07-08T10:58:32.120' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (67, NULL, N'Proc_GetPremiumServicesById', N'call', N'Proc_GetPremiumServiceById', N'Invalid object name ''PremiumServices''.', CAST(N'2024-07-08T15:52:08.597' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (68, NULL, N'Proc_GetPremiumServicesById', N'call', N'Proc_GetPremiumServiceById', N'Invalid object name ''PremiumServices''.', CAST(N'2024-07-08T15:54:14.920' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (69, NULL, N'Proc_AddPremiumServices', N'call', N'Proc_InsertOrUpdatePremiumService', N'@ExpiryDate is not a parameter for procedure Proc_InsertOrUpdatePremiumService.', CAST(N'2024-07-13T21:08:00.227' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (70, NULL, N'Proc_AddPremiumServices', N'call', N'Proc_InsertOrUpdatePremiumService', N'@ExpiryDate is not a parameter for procedure Proc_InsertOrUpdatePremiumService.', CAST(N'2024-07-13T21:08:02.833' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (71, NULL, N'UserValidation', N'ValidateEmail', N'', N'Cannot access a disposed context instance. A common cause of this error is disposing a context instance that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application. This may occur if you are calling ''Dispose'' on the context instance, or wrapping it in a using statement. If you are using dependency injection, you should let the dependency injection container take care of disposing context instances.
        Object name: ''ApplicationDbContext''.', CAST(N'2024-07-14T17:35:58.820' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (72, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-14T17:40:51.340' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (73, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-14T17:45:09.447' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (74, NULL, N'UserValidation', N'ValidateEmail', N'', N'Invalid operation. The connection is closed.', CAST(N'2024-07-14T17:55:11.310' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (75, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T15:49:15.023' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (76, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T15:55:51.807' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (77, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T15:56:11.650' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (78, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T15:56:55.830' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (79, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T15:58:37.473' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (80, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T15:59:41.860' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (81, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T16:00:49.320' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (82, NULL, N'UserValidation', N'ValidateEmail', N'', N'Cannot access a disposed context instance. A common cause of this error is disposing a context instance that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application. This may occur if you are calling ''Dispose'' on the context instance, or wrapping it in a using statement. If you are using dependency injection, you should let the dependency injection container take care of disposing context instances.
        Object name: ''ApplicationDbContext''.', CAST(N'2024-07-15T16:03:30.003' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (83, NULL, N'UserValidation', N'ValidateEmail', N'', N'Invalid operation. The connection is closed.', CAST(N'2024-07-15T16:07:48.857' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (84, NULL, N'UserValidation', N'ValidateEmail', N'', N'Cannot access a disposed context instance. A common cause of this error is disposing a context instance that was resolved from dependency injection and then later trying to use the same context instance elsewhere in your application. This may occur if you are calling ''Dispose'' on the context instance, or wrapping it in a using statement. If you are using dependency injection, you should let the dependency injection container take care of disposing context instances.
        Object name: ''ApplicationDbContext''.', CAST(N'2024-07-15T16:09:40.190' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (85, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T16:09:57.347' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (86, NULL, N'Sendmail', N'RegisterAsync', N'', N'Invalid object name ''EmailTemplates''.', CAST(N'2024-07-15T16:15:29.477' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (87, NULL, N'Proc_AddOrUpdateEmailTemplate', N'call', N'usp_UpsertEmailTemplate', N'Invalid column name ''UpdateOn''.', CAST(N'2024-07-19T13:58:09.257' AS DateTime))
        GO
        INSERT [dbo].[ErrorLog] ([Id], [ProjectId], [ClassName], [FuncName], [ProcName], [Error], [EntryOn]) VALUES (88, NULL, N'Proc_AddOrUpdateEmailTemplate', N'call', N'usp_UpsertEmailTemplate', N'Invalid column name ''UpdateOn''.', CAST(N'2024-07-19T14:03:05.967' AS DateTime))
        GO
        SET IDENTITY_INSERT [dbo].[ErrorLog] OFF
        GO
        SET IDENTITY_INSERT [dbo].[Invoice] ON
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (1, NULL, N'string', N'string', N'string', N'string', 0, 0, 0, 0, CAST(N'2024-06-05T13:06:32.930' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (2, NULL, N'string', N'string', N'string', N'string', 0, 0, 0, 0, CAST(N'2024-06-05T13:08:42.173' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (3, NULL, N'fdg', N'dfgdf', N'9988773737', N'dfgfdg', 336, 16.799999237060547, 188.16000366210938, 507.3599853515625, CAST(N'2024-06-05T16:52:30.000' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (4, NULL, N'fdg', N'dfgdf', N'9988773737', N'dfgfdg', 649362, 156184.5625, 29554.560546875, 522732, CAST(N'2024-06-05T16:57:01.050' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (5, NULL, N'dfsdf', N'faraz@gmail.com', N'9988773737', N'yuyjh', 132, 1.3200000524520874, 3.9600000381469727, 134.63999938964844, CAST(N'2024-06-26T16:30:43.570' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (6, NULL, N'dsfsdf', N'faraz@gmail.com', N'9988773737', N'yuyjh', 36, 1.7999999523162842, 0.72000002861022949, 34.919998168945312, CAST(N'2024-06-26T16:50:58.690' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (7, NULL, N'dsfsdf', N'sdfsd', N'9988773737', N'yuyjh', 275, 0, 11, 286, CAST(N'2024-06-26T17:06:53.590' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (8, NULL, N'dsfsdf', N'faraz@gmail.com', N'9988773737', N'yuyjh', 264, 7.9200000762939453, 5.28000020980835, 261.3599853515625, CAST(N'2024-06-26T17:08:20.843' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (9, NULL, N'dsfsdf', N'faraz@gmail.com', N'9988773737', N'yuyjh', 385, 15.399999618530273, 15.399999618530273, 385, CAST(N'2024-06-26T17:31:27.073' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (10, NULL, N'dsfsdf', N'faraz@gmail.com', N'9988773737', N'yuyjh', 3735, 149.39999389648438, 149.39999389648438, 3735, CAST(N'2024-06-26T17:32:18.230' AS DateTime))
        GO
        INSERT [dbo].[Invoice] ([InvoiceID], [ProjectId], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (11, NULL, N'mohd faraz', N'faraz8960@gmail.com', N'06390535446', N'Fairbanks', 55, 2.75, 30.25, 82.5, CAST(N'2024-07-13T15:44:52.990' AS DateTime))
        GO
        SET IDENTITY_INSERT [dbo].[Invoice] OFF
        GO
        SET IDENTITY_INSERT [dbo].[InvoiceItem] ON
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (1, 1, N'string', N'string', 0, N'string', 0, 0, 0, 0, 0, 0, 0, 0)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (2, 2, N'string', N'string', 0, N'string', 0, 0, 0, 0, 0, 0, 0, 0)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (3, 3, N'Mobiles', N'dsf', 6, N'tablet', 56, 56, 5, 16.799999237060547, 336, 0, 0, 507.3599853515625)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (4, 4, N'Mobiles', N'dsf', 6, N'tablet', 56, 56, 5, 16.799999237060547, 336, 0, 0, 507.3599853515625)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (5, 4, N'Books', N'dfsdf', 546, N'tablet', 565, 4, 44, 135735.59375, 308490, 0, 0, 185094)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (6, 4, N'Mobiles', N'fddfgfd', 56756, N'Select Unit', 6, 5, 6, 20432.16015625, 340536, 0, 0, 337130.625)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (7, 5, N'Medicine3', N'Medicine1', 66, N'tablet', 2, 3, 1, 1.3200000524520874, 132, 0, 0, 134.63999938964844)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (8, 6, N'Medicine2', N'Medicine3', 6, N'Books', 6, 2, 5, 1.7999999523162842, 36, 0, 0, 34.919998168945312)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (9, 7, N'Medicine2', N'Medicine4', 55, N'tablet', 5, 4, 0, 0, 275, 0, 0, 286)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (10, 8, N'Medicine2', N'Medicine3', 66, N'Books', 4, 2, 3, 7.9200000762939453, 264, 0, 0, 261.3599853515625)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (11, 9, N'Medicine1', N'Medicine3', 77, N'Books', 5, 4, 4, 15.399999618530273, 385, 0, 0, 385)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (12, 10, N'Medicine1', N'Medicine3', 747, N'Books', 5, 4, 4, 149.39999389648438, 3735, 0, 0, 3735)
        GO
        INSERT [dbo].[InvoiceItem] ([ID], [InvoiceID], [Service], [Product], [Quantity], [Unit], [Price], [VAT], [Discount], [SingleDiscountAmount], [SubAmount], [NetAmount], [VATAmount], [TotalAmount]) VALUES (13, 11, N'Medicine4', N'Medicine4', 1, N'tablet', 55, 55, 5, 2.75, 55, 0, 0, 82.5)
        GO
        SET IDENTITY_INSERT [dbo].[InvoiceItem] OFF
        GO
        SET IDENTITY_INSERT [dbo].[Medicines] ON
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (1, NULL, N'Medicine1', N'Description1', N'Manufacturer1', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 10.5, 0)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (2, NULL, N'Medicine2', N'Description2', N'Manufacturer2', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 12.75, 0)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (3, NULL, N'Medicine3', N'Description3', N'Manufacturer3', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 8.1999998092651367, 1)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (4, NULL, N'Medicine4', N'Description4', N'Manufacturer4', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 15, 4)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (5, NULL, N'Medicine5', N'Description5', N'Manufacturer5', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 9.99, 5)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (6, NULL, N'Medicine6', N'Description6', N'Manufacturer6', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 20.5, 6)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (7, NULL, N'Medicine7', N'Description7', N'Manufacturer7', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 5.75, 7)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (8, NULL, N'Medicine8', N'Description8', N'Manufacturer8', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 18.3, 8)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (9, NULL, N'Medicine9', N'Description9', N'Manufacturer9', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 14.2, 9)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (10, NULL, N'Medicine10', N'Description10', N'Manufacturer10', N'2024-12-31', CAST(N'2024-06-10T12:35:02.180' AS DateTime), 11.5, 10)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (11, NULL, N'string', N'string', N'string', N'string', CAST(N'2024-06-10T13:58:31.260' AS DateTime), 0, 0)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (12, NULL, N'string', N'string', N'string', N'string', CAST(N'2024-06-10T18:20:26.623' AS DateTime), 0, 0)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (13, NULL, N'string', N'string', N'string', N'string', CAST(N'2024-06-26T12:19:46.160' AS DateTime), 0, 0)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (14, NULL, N'dfgf', N'fghfgh', N'fghf', N'2024-07-02', CAST(N'2024-07-01T12:19:44.053' AS DateTime), 66, 0)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (15, NULL, N'sdfsdg', N'dfgfg', N'dgddfg', N'2024-07-12', CAST(N'2024-07-01T12:20:28.173' AS DateTime), 55, 1)
        GO
        INSERT [dbo].[Medicines] ([MedicineID], [ProjectId], [Name], [Description], [Manufacturer], [ExpiryDate], [CreatedAt], [Price], [MedTypeID]) VALUES (16, NULL, N'Medicine1', N'Description1', N'Manufacturer1', N'2024-12-31', CAST(N'2024-07-01T14:37:03.340' AS DateTime), 10.5, 0)
        GO
        SET IDENTITY_INSERT [dbo].[Medicines] OFF
        GO
        SET IDENTITY_INSERT [dbo].[MedicineStocks] ON
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (1, 1, 1, CAST(N'2024-07-01T14:40:10.400' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (2, 2, 1, CAST(N'2024-07-01T14:41:11.987' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (3, 3, 1, CAST(N'2024-07-01T14:47:50.010' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (4, 4, 80, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (5, 5, 9, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (6, 6, 90, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (7, 7, 300, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (8, 8, 70, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (9, 9, 180, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (10, 10, 250, CAST(N'2024-06-10T12:57:25.647' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (11, 11, 0, CAST(N'2024-06-10T13:58:31.260' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (12, 12, 0, CAST(N'2024-06-10T18:20:26.623' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (13, 13, 0, CAST(N'2024-06-26T12:19:46.160' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (14, 14, 123, CAST(N'2024-07-01T12:19:44.053' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (15, 15, 55, CAST(N'2024-07-01T12:20:28.173' AS DateTime))
        GO
        INSERT [dbo].[MedicineStocks] ([StockID], [MedicineID], [Quantity], [UpdatedAt]) VALUES (16, 16, 2, CAST(N'2024-07-01T14:37:03.340' AS DateTime))
        GO
        SET IDENTITY_INSERT [dbo].[MedicineStocks] OFF
        GO
        SET IDENTITY_INSERT [dbo].[MedicinesType] ON
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (1, N'Type A')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (2, N'Type B')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (3, N'Type C')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (4, N'Type D')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (5, N'Type E')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (6, N'Type F')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (7, N'Type G')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (8, N'Type H')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (9, N'Type I')
        GO
        INSERT [dbo].[MedicinesType] ([MedTypeID], [MedTypeName]) VALUES (10, N'Type J')
        GO
        SET IDENTITY_INSERT [dbo].[MedicinesType] OFF
        GO
        SET IDENTITY_INSERT [dbo].[Patients] ON
        GO
        INSERT [dbo].[Patients] ([PId], [ProjectId], [Name], [DateOfBirth], [Gender], [Email], [Phone], [PImage], [Address], [MedicalHistory], [InsuranceInformation], [EmergencyContactName], [EmergencyContactPhone], [PrimaryCarePhysicianName], [PrimaryCarePhysicianPhone], [Allergies], [Medications], [BloodType], [Height], [Weight], [PreferredLanguage], [Occupation], [Status], [EntryOn]) VALUES (101, NULL, N'fghfgh', N'Jun 14 2024  6:05PM', N'fghfgh', N'fghfgh', N'fgh', NULL, N'fghfgh', N'fghgfh', N'fghfgh', N'gfhfgh', N'fghfg', N'fghgf', N'fghfgh', N'fghfg', N'fghfgh', N'[object Ob', 77, 77, N'ghjghj', N'ghjgh', 1, CAST(N'2024-06-27T18:24:12.147' AS DateTime))
        GO
        INSERT [dbo].[Patients] ([PId], [ProjectId], [Name], [DateOfBirth], [Gender], [Email], [Phone], [PImage], [Address], [MedicalHistory], [InsuranceInformation], [EmergencyContactName], [EmergencyContactPhone], [PrimaryCarePhysicianName], [PrimaryCarePhysicianPhone], [Allergies], [Medications], [BloodType], [Height], [Weight], [PreferredLanguage], [Occupation], [Status], [EntryOn]) VALUES (102, NULL, N'faraz', N'Jun 14 2024  6:05PM', N'sdfsdf', N'farazshaikh8960@gmail.com', N'sdfsd', N'https://localhost:7079/PatientImage/f1bad3cd-2429-41ab-908d-20f3379d3f77_bmw.PNG', N'dfsdf', N'sdfsdf', N'sdfsd', N'sdfsd', N'sdfsdf', N'sdfsd', N'sdfsd', N'sdfsd', N'dsfsd', N'A+', 77, 77, N'ghjghj', N'ghjgh', 1, CAST(N'2024-06-29T11:57:14.483' AS DateTime))
        GO
        INSERT [dbo].[Patients] ([PId], [ProjectId], [Name], [DateOfBirth], [Gender], [Email], [Phone], [PImage], [Address], [MedicalHistory], [InsuranceInformation], [EmergencyContactName], [EmergencyContactPhone], [PrimaryCarePhysicianName], [PrimaryCarePhysicianPhone], [Allergies], [Medications], [BloodType], [Height], [Weight], [PreferredLanguage], [Occupation], [Status], [EntryOn]) VALUES (103, NULL, N'faraz', N'Jun 14 2024  6:05PM', N'sdfsdf', N'farazshaikh8960@gmail.com', N'sdfsd', N'https://localhost:7079/PatientImage/f93a7599-584f-4633-9ad0-1589ba6c4773_bmw.PNG', N'dfsdf', N'sdfsdf', N'sdfsd', N'sdfsd', N'sdfsdf', N'sdfsd', N'sdfsd', N'sdfsd', N'dsfsd', N'A+', 77, 77, N'ghjghj', N'ghjgh', 1, CAST(N'2024-06-29T11:59:17.913' AS DateTime))
        GO
        SET IDENTITY_INSERT [dbo].[Patients] OFF
        GO
        SET IDENTITY_INSERT [dbo].[Projects] ON
        GO
        INSERT [dbo].[Projects] ([Id], [ProjectId], [Email], [ProjectName], [UpdatedProjectName], [Logo], [UpdatedLogo], [DomainName], [UpdatedDomainName], [Status], [Purchase_Date], [Update_Date]) VALUES (1, 410965, N'faraz4334@gmail.com', N'fghfgh', N'faraz', N'https://localhost:7079/ProjectLogo/a35da66b-4c25-462e-b838-595794b93a89_bmw.PNG', N'https://localhost:7079/ProjectLogo/a35da66b-4c25-462e-b838-595794b93a89_bmw.PNG', N'fghfg.in', N'faraz', 1, CAST(N'2024-07-04T13:23:57.060' AS DateTime), CAST(N'2024-07-04T13:25:59.750' AS DateTime))
        GO
        INSERT [dbo].[Projects] ([Id], [ProjectId], [Email], [ProjectName], [UpdatedProjectName], [Logo], [UpdatedLogo], [DomainName], [UpdatedDomainName], [Status], [Purchase_Date], [Update_Date]) VALUES (2, 438490, N'farazdfg@gmail.com', N'Naved Dental Clinic', NULL, N'https://localhost:7079/ProjectLogo/0696e00a-dcd1-48b2-898f-5f027b75343b_bmw.PNG', NULL, N'NavedDentalClinic.Com', NULL, 1, CAST(N'2024-07-04T15:46:13.573' AS DateTime), NULL)
        GO
        INSERT [dbo].[Projects] ([Id], [ProjectId], [Email], [ProjectName], [UpdatedProjectName], [Logo], [UpdatedLogo], [DomainName], [UpdatedDomainName], [Status], [Purchase_Date], [Update_Date]) VALUES (3, 869023, N'farazshaikh8960@gmail.com', N'Naved Dental Clinic', NULL, N'https://localhost:7079/ProjectLogo/cbacb9af-ed01-4a69-8155-72b646910907_bmw.PNG', NULL, N'NavedDentalClinic.Com', NULL, 1, CAST(N'2024-07-04T16:44:08.617' AS DateTime), NULL)
        GO
        INSERT [dbo].[Projects] ([Id], [ProjectId], [Email], [ProjectName], [UpdatedProjectName], [Logo], [UpdatedLogo], [DomainName], [UpdatedDomainName], [Status], [Purchase_Date], [Update_Date]) VALUES (4, 490758, N'farazshaikh08538@gmail.com', N'Roundpay', NULL, N'https://localhost:7079/ProjectLogo/506f3ce4-b1e5-4bb5-be53-bb21bf454c8a_bmw.PNG', NULL, N'Roundpay.com', NULL, 1, CAST(N'2024-07-05T18:12:51.763' AS DateTime), NULL)
        GO
        INSERT [dbo].[Projects] ([Id], [ProjectId], [Email], [ProjectName], [UpdatedProjectName], [Logo], [UpdatedLogo], [DomainName], [UpdatedDomainName], [Status], [Purchase_Date], [Update_Date]) VALUES (5, 915990, N'farazshaikh89960@gmail.com', N'Roundpay', NULL, N'https://localhost:7079/ProjectLogo/a0ac4257-ac07-4c82-ab0a-25feb760bd6e_logo.png', NULL, N'Roundpay.com', NULL, NULL, CAST(N'2024-07-15T15:49:17.653' AS DateTime), NULL)
        GO
        INSERT [dbo].[Projects] ([Id], [ProjectId], [Email], [ProjectName], [UpdatedProjectName], [Logo], [UpdatedLogo], [DomainName], [UpdatedDomainName], [Status], [Purchase_Date], [Update_Date]) VALUES (8, 253066, N'Farazshaikh8960@example.com', N'Roundpay', NULL, N'https://localhost:7079/ProjectLogo/167b35ba-7ec0-465b-8e8c-6dd232ef860b_favicon.ico', NULL, N'Roundpay.com', NULL, NULL, CAST(N'2024-07-15T16:09:40.220' AS DateTime), NULL)
        GO
        SET IDENTITY_INSERT [dbo].[Projects] OFF
        GO
        SET IDENTITY_INSERT [dbo].[Purchases] ON
        GO
        INSERT [dbo].[Purchases] ([PurchaseID], [UserEmail], [ProjectId], [ServiceID], [PurchaseDate], [ExpiryDate], [Price], [Discount], [FinalPrice], [RenewalOption]) VALUES (1101, N'farazshaikh08538@gmail.com', 1, 101, CAST(N'2024-07-08T12:51:43.527' AS DateTime), N'Jul  8 2026 12:51PM', CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), NULL, 0)
        GO
        INSERT [dbo].[Purchases] ([PurchaseID], [UserEmail], [ProjectId], [ServiceID], [PurchaseDate], [ExpiryDate], [Price], [Discount], [FinalPrice], [RenewalOption]) VALUES (1102, N'farazshaikh08538@gmail.com', 490758, 101, CAST(N'2024-07-08T13:08:18.803' AS DateTime), N'Jul  8 2029  1:08PM', CAST(0.00 AS Decimal(10, 2)), CAST(0.00 AS Decimal(10, 2)), NULL, 0)
        GO
        SET IDENTITY_INSERT [dbo].[Purchases] OFF
        GO
        SET IDENTITY_INSERT [dbo].[SocialMedia] ON
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (1, 490758, N'Facebook', N'https://www.facebook.com', N'facebook-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (2, 490758, N'Twitter', N'https://www.twitter.com', N'twitter-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (3, 490758, N'Instagram', N'https://www.instagram.com', N'instagram-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (4, 490758, N'LinkedIn', N'https://www.linkedin.com', N'linkedin-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (5, 490758, N'Pinterest', N'https://www.pinterest.com', N'pinterest-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (6, 490758, N'Snapchat', N'https://www.snapchat.com', N'snapchat-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (7, 490758, N'TikTok', N'https://www.tiktok.com', N'tiktok-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (8, 490758, N'YouTube', N'https://www.youtube.com', N'youtube-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (9, 490758, N'Reddit', N'https://www.reddit.com', N'reddit-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        INSERT [dbo].[SocialMedia] ([SMId], [ProjectId], [PlateformName], [PlateformLink], [Icons], [Status], [EntryOn], [UpdateOn]) VALUES (10, 490758, N'WhatsApp', N'https://www.whatsapp.com', N'whatsapp-icon.png', 1, N'Jul 12 2024 12:23PM', NULL)
        GO
        SET IDENTITY_INSERT [dbo].[SocialMedia] OFF
        GO
        SET IDENTITY_INSERT [dbo].[tbl_users] ON
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (1, N'Farazshaikh8960@example.com', N'tFEdzqJcYBvgJnUCVlzxDc2sy80SrnJxjdrJ0uSaZy8=', CAST(N'2024-07-13T14:48:33.743' AS DateTime), 1, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (3, N'naved123@gmail.com', N'5MiRNuOj862PcB0uKCQLYg==', CAST(N'2024-07-04T11:34:45.040' AS DateTime), 0, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (4, N'naved323@gmail.com', N'hCfQ0FLjEPuJh/H1IP/mLw==', CAST(N'2024-07-04T11:36:51.263' AS DateTime), 0, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (5, N'Naved433@gmail.com', N'31vdr6Rb/ngfUOLcVURctg==', CAST(N'2024-07-04T11:40:57.653' AS DateTime), 0, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (6, N'Naved12333@gmail.com', N'+TUwKP8ME68Ltw7oeYpoiw==', CAST(N'2024-07-04T12:09:06.777' AS DateTime), 0, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (7, N'faraz4334@gmail.com', N'cmw+h4L09yFMpGb2cj1LMA==', CAST(N'2024-07-04T13:23:55.490' AS DateTime), 0, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (8, N'farazdfg@gmail.com', N'GFIwt1k5g9vW5+hCO7g3PQ==', CAST(N'2024-07-04T15:46:11.850' AS DateTime), 0, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (10, N'farazshaikh8960@gmail.com', N'tFEdzqJcYBvgJnUCVlzxDc2sy80SrnJxjdrJ0uSaZy8=', CAST(N'2024-07-04T16:51:09.900' AS DateTime), 0, 0, 1, 5)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (11, N'farazshaikh08538@gmail.com', N'O6rcGg7uSseUjIOKyeqIKA==', CAST(N'2024-07-05T18:12:51.643' AS DateTime), 1, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (12, N'Farazshhaikh8960@example.com', N'tFEdzqJcYBvgJnUCVlzxDc2sy80SrnJxjdrJ0uSaZy8=', CAST(N'2024-07-14T17:35:58.417' AS DateTime), NULL, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (13, N'Farazshhahgikh8960@example.com', N'tFEdzqJcYBvgJnUCVlzxDc2sy80SrnJxjdrJ0uSaZy8=', CAST(N'2024-07-14T17:40:44.050' AS DateTime), NULL, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (14, N'Farazshfyfhhaikh8960@example.com', N'tFEdzqJcYBvgJnUCVlzxDc2sy80SrnJxjdrJ0uSaZy8=', CAST(N'2024-07-14T17:45:09.270' AS DateTime), NULL, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (15, N'Farazshfyfdshhaikh8960@example.com', N'tFEdzqJcYBvgJnUCVlzxDc2sy80SrnJxjdrJ0uSaZy8=', CAST(N'2024-07-14T17:55:10.400' AS DateTime), NULL, NULL, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (16, N'farazshaikh89960@gmail.com', N'uYLGqs2cWjjVldEbHqWyAA==', CAST(N'2024-07-15T15:49:12.803' AS DateTime), 0, 0, 1, 0)
        GO
        INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (19, N'mohammadnaved1517@gmail.com', N'LVGNZs7QzbxxQoQavgF8mw==', CAST(N'2024-07-15T16:09:40.150' AS DateTime), NULL, NULL, 1, 1)
        GO
        SET IDENTITY_INSERT [dbo].[tbl_users] OFF
        GO
        SET IDENTITY_INSERT [dbo].[tbl_Validate_Email] ON
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1, NULL, N'Farazshaikh8960@example.com', 193600, CAST(N'2024-07-13T14:49:37.317' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (2, NULL, N'farazshaikh8960@gmail.com', 414045, CAST(N'2024-05-17T18:24:57.467' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (3, NULL, N'farazshaikh8960@gmail.com', 51054, CAST(N'2024-05-17T18:25:37.993' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (4, NULL, N'farazshaikh8960@gmail.com', 30228, CAST(N'2024-05-17T18:29:17.660' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (5, NULL, N'farazshaikh8960@gmail.com', 557898, CAST(N'2024-05-17T18:35:54.743' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (6, NULL, N'farazshaikh8960@gmail.com', 619465, CAST(N'2024-05-17T18:41:02.450' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (7, NULL, N'farazshaikh8960@gmail.com ', 482146, CAST(N'2024-05-29T17:49:37.020' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (8, NULL, N'Farazshaikh8960@gmail.com ', 86805, CAST(N'2024-05-29T17:57:23.537' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (9, NULL, N'farazshaikh8960@gmail.com ', 561152, CAST(N'2024-05-29T18:02:43.780' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (13, NULL, N'farazshaikh8960@gmail.com ', 811711, CAST(N'2024-05-30T12:27:44.450' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (14, NULL, N'farazshaikh8960@gmail.com ', 272417, CAST(N'2024-05-30T12:32:00.153' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (15, NULL, N'farazshaikh8960@gmail.com', 885314, CAST(N'2024-06-01T10:43:13.403' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (16, NULL, N'farazshaikh8960@gmail.com', 781682, CAST(N'2024-06-01T10:46:38.520' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (17, NULL, N'farazshaikh8960@gmail.com', 911570, CAST(N'2024-06-01T10:52:20.763' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (18, NULL, N'farazshaikh8960@gmail.com', 420577, CAST(N'2024-06-01T10:53:17.143' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (19, NULL, N'farazshaikh8960@gmail.com', 349892, CAST(N'2024-06-01T10:57:17.010' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (20, NULL, N'farazshaikh8960@gmail.com', 197330, CAST(N'2024-06-01T10:58:50.763' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (21, NULL, N'farazshaikh8960@gmail.com', 49812, CAST(N'2024-06-01T11:05:35.693' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (22, NULL, N'farazshaikh8960@gmail.com', 471181, CAST(N'2024-06-01T11:08:32.357' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (24, NULL, N'farazshaikh8960@gmail.com', 985664, CAST(N'2024-06-01T11:16:43.630' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (25, NULL, N'farazshaikh8960@gmail.com', 86074, CAST(N'2024-06-01T11:21:12.697' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (26, NULL, N'farazshaikh8960@gmail.com', 737575, CAST(N'2024-06-01T11:22:39.833' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (27, NULL, N'farazshaikh8960@gmail.com', 573082, CAST(N'2024-06-01T11:24:07.427' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (29, NULL, N'farazshaikh8960@gmail.com', 30396, CAST(N'2024-06-01T11:27:26.680' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (30, NULL, N'farazshaikh8960@gmail.com', 195918, CAST(N'2024-06-01T11:45:33.330' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (31, NULL, N'farazshaikh8960@gmail.com', 852617, CAST(N'2024-06-01T11:49:04.397' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (32, NULL, N'farazshaikh8960@gmail.com', 966045, CAST(N'2024-06-01T11:50:14.473' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (33, NULL, N'farazshaikh8960@gmail.com', 231240, CAST(N'2024-06-01T11:51:27.627' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (34, NULL, N'farazshaikh8960@gmail.com', 447915, CAST(N'2024-06-01T11:52:36.527' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (35, NULL, N'farazshaikh8960@gmail.com', 199830, CAST(N'2024-06-01T11:53:54.133' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (36, NULL, N'farazshaikh8960@gmail.com', 894994, CAST(N'2024-06-01T11:57:18.807' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (39, NULL, N'farazshaikh8960@gmail.com', 691884, CAST(N'2024-06-01T12:12:36.790' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (40, NULL, N'farazshaikh8960@gmail.com', 905228, CAST(N'2024-06-01T12:15:20.003' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (41, NULL, N'farazshaikh8960@gmail.com', 749557, CAST(N'2024-06-01T12:16:40.653' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1007, NULL, N'Farazshaikh08538@gmail.com', 17988, CAST(N'2024-06-06T11:40:25.127' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1008, NULL, N'farazshaikh8960@gmail.com ', 199684, CAST(N'2024-06-29T12:38:29.907' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1009, NULL, N'farazshaikh8960@gmail.com ', 940095, CAST(N'2024-06-29T12:47:51.273' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1010, NULL, N'farazshaikh8960@gmail.com ', 705049, CAST(N'2024-06-29T13:02:06.890' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1011, NULL, N'farazshaikh8960@gmail.com ', 741021, CAST(N'2024-06-29T13:08:46.630' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1012, NULL, N'farazshaikh8960@gmail.com ', 298950, CAST(N'2024-06-29T13:12:49.633' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1013, NULL, N'farazshaikh8960@gmail.com ', 384934, CAST(N'2024-06-29T13:20:06.917' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1014, NULL, N'farazshaikh8960@gmail.com ', 636753, CAST(N'2024-06-29T13:22:46.590' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1015, NULL, N'farazshaikh8960@gmail.com ', 352787, CAST(N'2024-06-29T15:12:04.663' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1016, NULL, N'farazshaikh8960@gmail.com ', 395024, CAST(N'2024-06-29T16:42:23.133' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1017, NULL, N'naved123@gmail.com', 796309, CAST(N'2024-07-04T11:36:02.150' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1018, NULL, N'naved323@gmail.com', 210712, CAST(N'2024-07-04T11:37:07.403' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1019, NULL, N'Naved433@gmail.com', 391891, CAST(N'2024-07-04T11:41:47.240' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1020, NULL, N'Naved12333@gmail.com', 847611, CAST(N'2024-07-04T12:09:35.140' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1021, NULL, N'faraz4334@gmail.com', 410965, CAST(N'2024-07-04T13:24:00.780' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1022, NULL, N'farazdfg@gmail.com', 438490, CAST(N'2024-07-04T15:46:17.020' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1023, NULL, N'farazshaikh8960@gmail.com', 869023, CAST(N'2024-07-04T16:44:14.587' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1030, NULL, N'farazshaikh08538@gmail.com', 505835, CAST(N'2024-07-05T18:38:00.407' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1031, NULL, N'Farazshhahgikh8960@example.com', 542107, CAST(N'2024-07-14T17:40:51.387' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1032, NULL, N'Farazshfyfhhaikh8960@example.com', 722455, CAST(N'2024-07-14T17:45:09.470' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1033, NULL, N'farazshaikh89960@gmail.com', 915990, CAST(N'2024-07-15T15:49:16.333' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1034, NULL, N'farazshaikh89960@gmail.com', 629675, CAST(N'2024-07-15T15:55:51.810' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1035, NULL, N'farazshaikh89960@gmail.com', 213211, CAST(N'2024-07-15T15:56:11.650' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1036, NULL, N'farazshaikh89960@gmail.com', 193950, CAST(N'2024-07-15T15:56:55.833' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1037, NULL, N'farazshaikh89960@gmail.com', 248485, CAST(N'2024-07-15T15:58:37.473' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1038, NULL, N'farazshaikh89960@gmail.com', 221174, CAST(N'2024-07-15T15:59:41.860' AS DateTime))
        GO
        INSERT [dbo].[tbl_Validate_Email] ([vID], [ProjectId], [vEmail], [vOTP], [vEntry]) VALUES (1039, NULL, N'farazshaikh89960@gmail.com', 485311, CAST(N'2024-07-15T16:00:49.327' AS DateTime))
        GO
        SET IDENTITY_INSERT [dbo].[tbl_Validate_Email] OFF
        GO
        SET IDENTITY_INSERT [dbo].[TransactionDetails] ON
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (1, 1, N'string', N'string', 1, N'string', NULL, CAST(N'2024-06-05T13:06:32.930' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (2, 2, N'string', N'string', 1, N'string', NULL, CAST(N'2024-06-05T13:08:42.173' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (3, 3, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-05T16:52:30.107' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (4, 4, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-05T16:57:01.050' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (5, 5, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-26T16:30:43.570' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (6, 6, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-26T16:50:58.690' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (7, 7, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-26T17:06:53.590' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (8, 8, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-26T17:08:20.843' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (9, 9, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-26T17:31:27.077' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (10, 10, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-06-26T17:32:18.230' AS DateTime))
        GO
        INSERT [dbo].[TransactionDetails] ([Id], [InvoiceID], [Mode], [TransactionId], [IsPaid], [DueDate], [DueAmountPayDate], [EntryOn]) VALUES (11, 11, N'fgfg', N'ertre44', 1, N'', NULL, CAST(N'2024-07-13T15:44:53.000' AS DateTime))
        GO
        SET IDENTITY_INSERT [dbo].[TransactionDetails] OFF
        GO
        SET ANSI_PADDING ON
        GO
        /****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 19-07-2024 17:35:39 ******/
        CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
        (
        [RoleId] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        SET ANSI_PADDING ON
        GO
        /****** Object:  Index [RoleNameIndex]    Script Date: 19-07-2024 17:35:39 ******/
        CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
        (
        [NormalizedName] ASC
        )
        WHERE ([NormalizedName] IS NOT NULL)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        SET ANSI_PADDING ON
        GO
        /****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 19-07-2024 17:35:39 ******/
        CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
        (
        [UserId] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        SET ANSI_PADDING ON
        GO
        /****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 19-07-2024 17:35:39 ******/
        CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
        (
        [UserId] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        SET ANSI_PADDING ON
        GO
        /****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 19-07-2024 17:35:39 ******/
        CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
        (
        [RoleId] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        SET ANSI_PADDING ON
        GO
        /****** Object:  Index [EmailIndex]    Script Date: 19-07-2024 17:35:39 ******/
        CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
        (
        [NormalizedEmail] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        SET ANSI_PADDING ON
        GO
        /****** Object:  Index [UserNameIndex]    Script Date: 19-07-2024 17:35:39 ******/
        CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
        (
        [NormalizedUserName] ASC
        )
        WHERE ([NormalizedUserName] IS NOT NULL)
        WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        /****** Object:  Index [UK_vOTP]    Script Date: 19-07-2024 17:35:39 ******/
        ALTER TABLE [dbo].[tbl_Validate_Email] ADD  CONSTRAINT [UK_vOTP] UNIQUE NONCLUSTERED
        (
        [vOTP] ASC
        )WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsSocialAlert]  DEFAULT ((0)) FOR [IsSocialAlert]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsEmailVerificationRequired]  DEFAULT ((0)) FOR [IsEmailVerificationRequired]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsEmailMarketing]  DEFAULT ((0)) FOR [IsEmailMarketing]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsShowPassword]  DEFAULT ((0)) FOR [IsShowPassword]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsMultipleMobileAllowed]  DEFAULT ((0)) FOR [IsMultipleMobileAllowed]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsPasswordOnly]  DEFAULT ((0)) FOR [IsPasswordOnly]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsReferral]  DEFAULT ((0)) FOR [IsReferral]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsBackUpService]  DEFAULT ((0)) FOR [IsBackUpService]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsPaymentGateway]  DEFAULT ((0)) FOR [IsPaymentGateway]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsMultipleVendorAllowed]  DEFAULT ((0)) FOR [IsMultipleVendorAllowed]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsTwoFactorAuthenticationEnabled]  DEFAULT ((0)) FOR [IsTwoFactorAuthenticationEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsSmsNotificationEnabled]  DEFAULT ((0)) FOR [IsSmsNotificationEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsAppointmentReminderEnabled]  DEFAULT ((0)) FOR [IsAppointmentReminderEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsDoctorAvailabilityNotificationEnabled]  DEFAULT ((0)) FOR [IsDoctorAvailabilityNotificationEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsLabResultsNotificationEnabled]  DEFAULT ((0)) FOR [IsLabResultsNotificationEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsMSServiceEnabled]  DEFAULT ((0)) FOR [IsMSServiceEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsBillingNotificationEnabled]  DEFAULT ((0)) FOR [IsBillingNotificationEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsPrescriptionRefillReminderEnabled]  DEFAULT ((0)) FOR [IsPrescriptionRefillReminderEnabled]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsPatient]  DEFAULT ((0)) FOR [IsPatient]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsDoctor]  DEFAULT ((0)) FOR [IsDoctor]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_SuperAdmin]  DEFAULT ((0)) FOR [SuperAdmin]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  CONSTRAINT [DF_ApplicationSetting_IsAdmin]  DEFAULT ((0)) FOR [IsAdmin]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  DEFAULT ((0)) FOR [IsLowStorageMedicineNotification]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  DEFAULT ((0)) FOR [IsAppointmentContactService]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  DEFAULT ((0)) FOR [IsAppointmentFormService]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  DEFAULT ((0)) FOR [IsAppointmentStatus]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  DEFAULT ((0)) FOR [IsWhatsappMarketing]
        GO
        ALTER TABLE [dbo].[ApplicationSetting] ADD  DEFAULT ((0)) FOR [IsDarkModeEnabled]
        GO
        ALTER TABLE [dbo].[Appointments] ADD  DEFAULT (getdate()) FOR [CreatedOn]
        GO
        ALTER TABLE [dbo].[Doctors] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[EmailLogs] ADD  DEFAULT (getdate()) FOR [Entryon]
        GO
        ALTER TABLE [dbo].[ErrorLog] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[FAQs] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[Invoice] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[MedicalHistory] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[Medicines] ADD  DEFAULT (getdate()) FOR [CreatedAt]
        GO
        ALTER TABLE [dbo].[MedicineStocks] ADD  DEFAULT (getdate()) FOR [UpdatedAt]
        GO
        ALTER TABLE [dbo].[Patient_Services] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[Patients] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[Payments] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [RenewalOption]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [EmailMarketing]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [EmailVerificationService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [ShowYourUserPassword]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [ReferralService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [BackUpService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [SmsNotificationService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [EmergencyAlertService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [UserAppointmentReminderService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [DoctorAvailabilityNotificationService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [MedicineStoreManagementService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [TwoFactorAuthenticationService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsMultipleMobileAllowed]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsDarkModeEnabled]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsBillingNotificationEnabled]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsPrescriptionRefillReminderEnabled]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [MaxLoginAttempts]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsShowPassword]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsSocialAlert]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsPasswordOnly]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsPatient]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsDoctor]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [SuperAdmin]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsAdmin]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [CreatedAt]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsLabManagmentService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsLowStorageMedicineNotification]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsAppointmentContactService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsAppointmentFormService]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsAppointmentStatus]
        GO
        ALTER TABLE [dbo].[PremiumService] ADD  DEFAULT ((0)) FOR [IsWhatsappMarketing]
        GO
        ALTER TABLE [dbo].[Projects] ADD  DEFAULT (getdate()) FOR [Purchase_Date]
        GO
        ALTER TABLE [dbo].[Purchases] ADD  DEFAULT (getdate()) FOR [PurchaseDate]
        GO
        ALTER TABLE [dbo].[Reviews] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[Services] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[tbl_PageErrorLog] ADD  DEFAULT (getdate()) FOR [_EntryDate]
        GO
        ALTER TABLE [dbo].[tbl_users] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[tbl_users] ADD  DEFAULT ((0)) FOR [InvalidLoginAttempts]
        GO
        ALTER TABLE [dbo].[tbl_Validate_Email] ADD  DEFAULT (getdate()) FOR [vEntry]
        GO
        ALTER TABLE [dbo].[TransactionDetails] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[Treatment] ADD  DEFAULT (getdate()) FOR [CreatedDate]
        GO
        ALTER TABLE [dbo].[UserLogins] ADD  DEFAULT (getdate()) FOR [LoginTime]
        GO
        ALTER TABLE [dbo].[WorkingHours] ADD  DEFAULT (getdate()) FOR [EntryOn]
        GO
        ALTER TABLE [dbo].[AspNetRoleClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
        REFERENCES [dbo].[AspNetRoles] ([Id])
        ON DELETE CASCADE
        GO
        ALTER TABLE [dbo].[AspNetRoleClaims] CHECK CONSTRAINT [FK_AspNetRoleClaims_AspNetRoles_RoleId]
        GO
        ALTER TABLE [dbo].[AspNetUserClaims]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId] FOREIGN KEY([UserId])
        REFERENCES [dbo].[AspNetUsers] ([Id])
        ON DELETE CASCADE
        GO
        ALTER TABLE [dbo].[AspNetUserClaims] CHECK CONSTRAINT [FK_AspNetUserClaims_AspNetUsers_UserId]
        GO
        ALTER TABLE [dbo].[AspNetUserLogins]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId] FOREIGN KEY([UserId])
        REFERENCES [dbo].[AspNetUsers] ([Id])
        ON DELETE CASCADE
        GO
        ALTER TABLE [dbo].[AspNetUserLogins] CHECK CONSTRAINT [FK_AspNetUserLogins_AspNetUsers_UserId]
        GO
        ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId] FOREIGN KEY([RoleId])
        REFERENCES [dbo].[AspNetRoles] ([Id])
        ON DELETE CASCADE
        GO
        ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetRoles_RoleId]
        GO
        ALTER TABLE [dbo].[AspNetUserRoles]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId] FOREIGN KEY([UserId])
        REFERENCES [dbo].[AspNetUsers] ([Id])
        ON DELETE CASCADE
        GO
        ALTER TABLE [dbo].[AspNetUserRoles] CHECK CONSTRAINT [FK_AspNetUserRoles_AspNetUsers_UserId]
        GO
        ALTER TABLE [dbo].[AspNetUserTokens]  WITH CHECK ADD  CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId] FOREIGN KEY([UserId])
        REFERENCES [dbo].[AspNetUsers] ([Id])
        ON DELETE CASCADE
        GO
        ALTER TABLE [dbo].[AspNetUserTokens] CHECK CONSTRAINT [FK_AspNetUserTokens_AspNetUsers_UserId]
        GO
        /****** Object:  StoredProcedure [dbo].[InsertEmailLog]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[InsertEmailLog]
        @ToEmail NVARCHAR(255),
        @Subject NVARCHAR(255),
        @Body NVARCHAR(MAX),
        @ErrorMessage NVARCHAR(MAX) = NULL, -- Optional parameter with default value NULL
        @SentStatus BIT
        AS
        BEGIN
        -- Insert a new record into the EmailLogs table
        INSERT INTO EmailLogs (ToEmail, Subject, Body, ErrorMessage, SentStatus)
        VALUES (@ToEmail, @Subject, @Body, @ErrorMessage, @SentStatus);
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[InsertInvoiceData]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[InsertInvoiceData]
        @PatientName NVARCHAR(100),
        @Email NVARCHAR(100),
        @Phone NVARCHAR(20),
        @Address NVARCHAR(255),
        @Subtotal FLOAT,
        @DiscountAmount FLOAT,
        @TotalVAT FLOAT,
        @TotalAmount FLOAT,
        @InvoiceItems InvoiceItemType READONLY, -- Table-valued parameter for InvoiceItem
        @Transaction TransactionType READONLY
        AS
        BEGIN
        BEGIN TRY
        BEGIN TRANSACTION;

        DECLARE @InvoiceID INT;

        -- Insert into Invoice table
        INSERT INTO Invoice (PatientName, Email, Phone, Address, Subtotal, DiscountAmount, TotalVAT, TotalAmount)
        VALUES (@PatientName, @Email, @Phone, @Address, @Subtotal, @DiscountAmount, @TotalVAT, @TotalAmount);

        SET @InvoiceID = SCOPE_IDENTITY();

        -- Insert into InvoiceItem table
        INSERT INTO InvoiceItem (InvoiceID, Service, Product, Quantity, Unit, Price, VAT, Discount, SingleDiscountAmount, SubAmount, NetAmount, VATAmount, TotalAmount)
        SELECT @InvoiceID, Service, Product, Quantity, Unit, Price, VAT, Discount, SingleDiscountAmount, SubAmount, NetAmount, VATAmount, TotalAmount
        FROM @InvoiceItems;

        -- Insert into TransactionDetails table
        INSERT INTO TransactionDetails (InvoiceID, Mode, TransactionId, IsPaid, DueDate)
        SELECT @InvoiceID,Mode,TransactionId,IsPaid,DueDate FROM @Transaction;
        SELECT 1 AS StatusCode, 'Create Invoice Successful' AS ResponseText;
        COMMIT TRANSACTION;
        END TRY
        BEGIN CATCH
        SELECT -1 AS StatusCode, 'Invoice Saved Field!' AS ResponseText;
        ROLLBACK TRANSACTION;
        THROW;
        END CATCH
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Prc_InsertOrUpdateProject]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO

        Create   PROCEDURE [dbo].[Prc_InsertOrUpdateProject]
        @ProjectId INT,
        @UserEmail VARCHAR(255),
        @ProjectName VARCHAR(255),
        @DomainName VARCHAR(255),
        @Logo nVARCHAR(255),
        @Status BIT
        AS
        BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
        IF EXISTS (SELECT 1 FROM Projects WHERE ProjectId = @ProjectId)
        BEGIN
        UPDATE Projects
        SET UpdatedProjectName = @ProjectName,
        UpdatedLogo = IIF(ISNULL(@Logo, '') = '', [Logo],@Logo),
        UpdatedDomainName = @DomainName,
        Status = @Status ,
        Update_Date=GETDATE()
        WHERE ProjectId = @ProjectId;
        SELECT 1 AS StatusCode, 'Project updated successfully' AS ResponseText;
        END
        ELSE
        BEGIN
        INSERT INTO Projects (ProjectId,Email, ProjectName, DomainName, Logo, Status)
        VALUES (@ProjectId,@UserEmail, @ProjectName, @DomainName,   @Logo, @Status);
        INSERT INTO ApplicationSetting (ProjectId)
        Values(@ProjectId);
        SELECT @ProjectId as ProjectId, 1 AS StatusCode, 'Project inserted successfully' AS ResponseText;
        END
        END TRY
        BEGIN CATCH
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_AddOrUpdateSocialMedia]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_AddOrUpdateSocialMedia]
        @SMId INT,
        @ProjectId INT,
        @PlateformName VARCHAR(255) NULL,
        @PlateformLink VARCHAR(255) NULL,
        @Icons VARCHAR(255) NULL,
        @Status INT NULL
        AS
        BEGIN
        BEGIN TRY
        IF EXISTS (SELECT 1 FROM SocialMedia WHERE SMId = @SMId)
        BEGIN
        UPDATE SocialMedia
        SET PlateformName = @PlateformName,
        PlateformLink = @PlateformLink,
        Icons = @Icons,
        Status = @Status,
        UpdateOn = GETDATE()
        WHERE SMId = @SMId;

        SELECT 1 AS StatusCode, 'Social media details update successful' AS ResponseText;
        END
        ELSE
        BEGIN
        INSERT INTO SocialMedia (ProjectId,PlateformName, PlateformLink, Icons, Status, EntryOn)
        VALUES (@ProjectId,@PlateformName, @PlateformLink, @Icons, 1, GETDATE());

        SELECT 1 AS StatusCode, 'Social media details add successful' AS ResponseText;
        END
        END TRY
        BEGIN CATCH
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_ConfirmEmail]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   proc [dbo].[Proc_ConfirmEmail]
        @IsVerfied int,
        @Email Varchar(100)
        As
        Begin
        Update tbl_users set IsVerified = @IsVerfied where username = @Email;
        End
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_FindUser]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_FindUser]
        @Email VARCHAR(100)
        AS
        BEGIN
        BEGIN TRY
        IF EXISTS (SELECT 1 FROM AspNetUsers WHERE Email = @Email)
        BEGIN
        SELECT -1 AS StatusCode, 'User Already Exists!' AS ResponseText;
        END
        ELSE
        BEGIN
        SELECT 1 AS StatusCode, 'User Does Not Exist!' AS ResponseText;
        END
        END TRY
        BEGIN CATCH
        -- You can handle errors here, for example:
        SELECT -1 AS StatusCode, 'Something went wrong!' AS ResponseText;
        END CATCH
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetAllSocialMedia]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   proc [dbo].[Proc_GetAllSocialMedia]
        @Id int =0,
        @PlateformName varchar(100) ='All',
        @ProjectId int,
        @PageLength int=10
        As
        Begin
        IF(@PlateformName='All' And @Id=0)
        Begin
        Select TOP (@PageLength) * from SocialMedia where ProjectId=@ProjectId;
        End  
Else IF(@Id > 0)
        Begin
        Select * from SocialMedia where ProjectId=@ProjectId and SMId = @Id or @Id = 0;
        End
        Else
        Begin
        SELECT TOP (@PageLength) *
        FROM SocialMedia
        WHERE PlateformName LIKE '%' + @PlateformName + '%'
        AND ProjectId = @ProjectId;

        End
        End
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetApplicationSetting]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetApplicationSetting]
        @Projectid INT = NULL
        AS
        BEGIN
        IF (@Projectid=0)
        BEGIN
        SELECT *
        FROM ApplicationSetting;
        END
        ELSE
        BEGIN
        SELECT *
        FROM ApplicationSetting
        WHERE Projectid = @Projectid;
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetApplicationSettingById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetApplicationSettingById]
        @Projectid INT = NULL
        AS
        BEGIN
        SELECT *
        FROM ApplicationSetting
        WHERE Projectid = @Projectid;
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetApplicationSettingByIdOnload]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetApplicationSettingByIdOnload]
        @Email VARCHAR(100)
        AS
        BEGIN
        DECLARE @ProjectId INT;
        SELECT @ProjectId = ProjectId
        FROM Projects
        WHERE Email = @Email;

        IF @ProjectId IS NULL
        SET @ProjectId = 0;

        SELECT @ProjectId AS ProjectId;
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetAppointmentIdById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetAppointmentIdById]
        @AppointmentId int
        AS
        BEGIN

        SELECT * FROM Appointments WHERE AppointmentId =@AppointmentId;

        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetAppointments]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetAppointments]
        @Date date  = NULL,
        @PId int = NULL
        AS
        BEGIN
        IF (@Date IS NOT NULL AND @PId IS NULL)
        BEGIN
        SELECT * FROM Appointments WHERE Date = @Date ORDER BY 1 DESC;
        END
        ELSE IF (@Date IS NOT NULL AND @PId IS NOT NULL)
        BEGIN
        SELECT * FROM Appointments WHERE Date = @Date AND PId = @PId ORDER BY 1 DESC;
        END
        ELSE IF (@Date IS NULL AND @PId IS NOT NULL)
        BEGIN
        SELECT * FROM Appointments WHERE PId = @PId ORDER BY 1 DESC;
        END
        ELSE IF (@Date IS NULL AND @PId IS NULL)
        BEGIN
        SELECT * FROM Appointments ORDER BY 1 DESC;
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetAppointmentStatus]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetAppointmentStatus]

        AS
        BEGIN
        SELECT * FROM Appointments;
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetAppointmentStatusByPId]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetAppointmentStatusByPId]
        @PId int
        AS
        BEGIN
        SELECT * FROM Appointments WHERE PId = @PId ORDER BY 1 DESC;
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetDoctors]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetDoctors]
        @Name varchar(255) = Null
        AS
        BEGIN
        IF (@Name IS NULL OR @Name = 'All')
        BEGIN
        SELECT * FROM Doctors ORDER BY 1 DESC;
        END
        ELSE
        BEGIN
        SELECT * FROM Doctors  WHERE Name LIKE '%' + @Name + '%' ORDER BY 1 DESC;

        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetDoctorsById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetDoctorsById]
        @DrId int
        AS
        BEGIN

        SELECT * FROM Doctors WHERE DrId =@DrId;

        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetEmailTemplate]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE PROCEDURE [dbo].[Proc_GetEmailTemplate]
        @Id INT = 0,
        @Subject VARCHAR(100) = 'All',
        @ProjectId INT,
        @PageLength INT = 10
        AS
        BEGIN
        IF (@Subject = 'All' AND @Id = 0)
        BEGIN
        SELECT TOP (@PageLength) *
        FROM EmailTemplates
        WHERE ProjectId = @ProjectId;
        END             
    ELSE IF (@Id > 0)
        BEGIN
        SELECT *
        FROM EmailTemplates
        WHERE ProjectId = @ProjectId AND (TemplateID = @Id OR @Id = 0);
        END
        ELSE
        BEGIN
        SELECT TOP (@PageLength) *
        FROM EmailTemplates
        WHERE Subject LIKE '%' + @Subject + '%'
        AND ProjectId = @ProjectId;
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[proc_GetEmailTemplateById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        create PROCEDURE [dbo].[proc_GetEmailTemplateById]
        @TemplateID INT = NULL
        AS
        BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
        select * from EmailTemplates where TemplateID = @TemplateID;
        END TRY
        BEGIN CATCH
        SELECT
        -1 AS StatusCode,
        ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetInvoiceDataByInvoiceId]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetInvoiceDataByInvoiceId]
        @InvoiceID INT ,
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
        /****** Object:  StoredProcedure [dbo].[Proc_GetInvoiceList]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   proc [dbo].[Proc_GetInvoiceList]
        As
        Begin
        select * from Invoice order by 1 desc;
        End
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetMedicineById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetMedicineById]
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
        /****** Object:  StoredProcedure [dbo].[Proc_GetMedicines]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetMedicines]
        @Name VARCHAR(255) = NULL
        AS
        BEGIN
        IF (@Name IS NULL OR @Name = 'All')
        BEGIN
        SELECT m.*, ms.Quantity, mt.MedTypeName
        FROM Medicines m
        INNER JOIN MedicineStocks ms ON m.MedicineID = ms.MedicineID
        INNER JOIN MedicinesType mt ON m.MedTypeID = mt.MedTypeID;
        END
        ELSE
        BEGIN
        SELECT m.*, ms.Quantity, mt.MedTypeName
        FROM Medicines m
        INNER JOIN MedicineStocks ms ON m.MedicineID = ms.MedicineID
        INNER JOIN MedicinesType mt ON m.MedTypeID = mt.MedTypeID
        WHERE m.Name LIKE '%' + @Name + '%';
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetMedQuantityByName]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   proc [dbo].[Proc_GetMedQuantityByName]
        @Name Varchar(255)
        As
        Begin
        SELECT ms.Quantity
        FROM MedicineStocks ms
        INNER JOIN Medicines m ON m.MedicineID = ms.MedicineID
        WHERE m.Name LIKE '%' + @Name + '%';
        End
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetPatientId]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetPatientId]
        @Email VARCHAR(100)
        AS
        BEGIN
        DECLARE @PId INT;
        SELECT @PId = PId
        FROM Patients
        WHERE Email = @Email;
        IF @PId IS NULL
        BEGIN
        SELECT NULL AS PatientId;
        END
        ELSE
        BEGIN
        SELECT @PId AS PatientId;
        END
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetPatients]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetPatients]
        @PId int = NULL
        AS
        BEGIN
        IF (@PId IS NULL OR @PId = 0)
        BEGIN
        SELECT * FROM Patients
        ORDER BY 1 DESC;
        END
        ELSE
        BEGIN
        SELECT * FROM Patients
        WHERE PId = @PId
        ORDER BY 1 DESC;
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetPatientsById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetPatientsById]
        @PId int
        AS
        BEGIN

        SELECT * FROM Patients WHERE PId =@PId;

        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetPremiumService]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetPremiumService]
        @ServiceName NVARCHAR(100) = NULL
        AS
        BEGIN
        IF(@ServiceName ='All')
        BEGIN
        SELECT * FROM PremiumService;
        END
        ELSE
        BEGIN
        SELECT * FROM PremiumService WHERE ServiceName LIKE '%' + @ServiceName + '%';
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetPremiumServiceById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetPremiumServiceById]
        @ServiceID int
        AS
        BEGIN
        SELECT * FROM PremiumService WHERE ServiceID =@ServiceID;
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetProjectDetailsById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetProjectDetailsById]
        @ProjectId int = NULL
        AS
        BEGIN
        select * from Projects where ProjectId = @ProjectId;
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetProjects]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetProjects]
        @ProjectName varchar(255) = NULL
        AS
        BEGIN
        DECLARE @UpdatedProjectName varchar(255);

        IF (@ProjectName IS NULL OR @ProjectName = 'All')
        BEGIN
        SELECT ProjectId,Email,UpdatedProjectName as ProjectName ,UpdatedLogo as Logo,UpdatedDomainName as DomainName,Purchase_Date,Status
        FROM Projects
        ORDER BY 1 DESC;
        END
        ELSE
        BEGIN
        SET @UpdatedProjectName = (SELECT TOP 1 UpdatedProjectName FROM Projects WHERE ProjectName LIKE '%' + @ProjectName + '%');

        IF (@UpdatedProjectName = '')
        BEGIN
        SELECT  ProjectId,Email,UpdatedProjectName as ProjectName ,UpdatedLogo as Logo,UpdatedDomainName as DomainName,Purchase_Date,Status
        FROM Projects
        WHERE ProjectName LIKE '%' + @ProjectName + '%'
        ORDER BY 1 DESC;
        END
        ELSE
        BEGIN
        SELECT  ProjectId,Email,UpdatedProjectName as ProjectName ,UpdatedLogo as Logo,UpdatedDomainName as DomainName,Purchase_Date,Status
        FROM Projects
        WHERE UpdatedProjectName LIKE '%' + @ProjectName + '%'
        ORDER BY 1 DESC;
        END
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetProjectsByEmail]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetProjectsByEmail]
        @Email varchar(255) = NULL
        AS
        BEGIN
        select * from Projects where Email = @Email
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetPurchaseServiceById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetPurchaseServiceById]
        @PurchaseID int
        AS
        BEGIN
        SELECT * FROM Purchases WHERE PurchaseID =@PurchaseID;
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetPurchasesService]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetPurchasesService]
        @UserEmail nvarchar(255)
        AS
        BEGIN
        IF(@UserEmail ='All')
        BEGIN
        SELECT * FROM Purchases;
        END
        ELSE
        BEGIN
        SELECT * FROM Purchases WHERE UserEmail LIKE '%' + @UserEmail + '%';
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetSocialMediaById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   proc [dbo].[Proc_GetSocialMediaById]
        @SMId int
        As
        Begin
        Select * from SocialMedia Where SMId=@SMId;
        End
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetTreatmentById]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetTreatmentById]
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
        /****** Object:  StoredProcedure [dbo].[Proc_GetTreatmentList]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_GetTreatmentList]
        @CreatedDate datetime  = NULL,
        @PId int = NULL
        AS
        BEGIN
        IF (@CreatedDate IS NOT NULL AND @PId IS NULL)
        BEGIN
        SELECT t.*, m.Name, m.Dosage, m.Frequency, m.FollowUpDate
        FROM Treatment t
        INNER JOIN Medication m ON t.TreatmentId = m.TreatmentId
        WHERE t.CreatedDate = @CreatedDate
        ORDER BY t.CreatedDate DESC;
        END
        ELSE IF (@CreatedDate IS NOT NULL AND @PId IS NOT NULL)
        BEGIN
        SELECT t.*, m.Name, m.Dosage, m.Frequency, m.FollowUpDate
        FROM Treatment t
        INNER JOIN Medication m ON t.TreatmentId = m.TreatmentId
        WHERE t.CreatedDate = @CreatedDate  and t.PId = @PId
        ORDER BY t.CreatedDate DESC;
        END
        ELSE IF (@CreatedDate IS NULL AND @PId IS NOT NULL)
        BEGIN
        SELECT t.*, m.Name, m.Dosage, m.Frequency, m.FollowUpDate
        FROM Treatment t
        INNER JOIN Medication m ON t.TreatmentId = m.TreatmentId
        WHERE t.PId = @PId
        ORDER BY t.CreatedDate DESC;
        END
        ELSE IF (@CreatedDate IS NULL AND @PId IS NULL)
        BEGIN
        SELECT t.*, m.Name, m.Dosage, m.Frequency, m.FollowUpDate
        FROM Treatment t
        INNER JOIN Medication m ON t.TreatmentId = m.TreatmentId
        ORDER BY t.CreatedDate  DESC;
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_GetUser]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   Proc [dbo].[Proc_GetUser]
        As
        Begin
        SELECT tu.userId As UserId, U.Name, U.UserName, U.Email, R.Name AS Role,tu.PasswordHash,tu.IsVerified ,tu.IsActive, tu.IsLocked
        FROM AspNetUsers U
        JOIN AspNetUserRoles UR ON U.Id = UR.UserId
        JOIN tbl_users tu ON U.Email = tu.username
        JOIN AspNetRoles R ON UR.RoleId = R.Id;
        End
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_IncrementInvalidLoginAttempts]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_IncrementInvalidLoginAttempts]
        @Email VARCHAR(50)
        AS
        BEGIN
        -- Check if the user exists
        IF EXISTS (SELECT 1 FROM tbl_users WHERE username = @Email)
        BEGIN
        -- Increment the invalid login attempts
        UPDATE tbl_users
        SET InvalidLoginAttempts = InvalidLoginAttempts + 1
        WHERE username = @Email;

        -- Optional: Return the current invalid login attempts count
        SELECT InvalidLoginAttempts
        FROM tbl_users
        WHERE username = @Email;
        END
        ELSE
        BEGIN
        -- Handle the case where the user does not exist
        RAISERROR('User not found.', 16, 1);
        END
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_InsertErrorLog]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_InsertErrorLog]
        @ClassName NVARCHAR(255),
        @FuncName NVARCHAR(255),
        @ProcName NVARCHAR(255),
        @Error NVARCHAR(MAX)
        AS
        BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
        INSERT INTO ErrorLog (ClassName, FuncName, ProcName, Error)
        VALUES (@ClassName, @FuncName, @ProcName, @Error);
        END TRY
        BEGIN CATCH
        -- Log the error to a special error table or take other appropriate actions
        INSERT INTO ErrorLog (ClassName, FuncName, ProcName, Error)
        VALUES ('ErrorLog Procedure', 'ErrorLog', 'Proc_InsertErrorLog', ERROR_MESSAGE());

        -- Throw or handle the error as needed
        THROW;
        END CATCH;
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[proc_InsertOrUpdateDoctor]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO

        Create   PROCEDURE [dbo].[proc_InsertOrUpdateDoctor]
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
        -- Insert new record
        INSERT INTO Doctors (
        Name, Email, Phone, DrImage, Address, Specialization, Gender, DateOfBirth,
        Qualifications, ExperienceYears, Affiliations, Languages, ConsultationFee,
        Availability, Status
        )
        VALUES (
        @Name, @Email, @Phone, @DrImage, @Address, @Specialization, @Gender, @DateOfBirth,
        @Qualifications, @ExperienceYears, @Affiliations, @Languages, @ConsultationFee,
        @Availability, @Status
        );
        SELECT 1 AS StatusCode, 'Insert Successful' AS ResponseText;
        END
        ELSE
        BEGIN
        -- Update existing record
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
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[proc_InsertOrUpdatePatient]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[proc_InsertOrUpdatePatient]
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
        @Status INT =1
        AS
        BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
        declare @PatientId int
        IF Not EXISTS (SELECT 1 FROM Patients WHERE PId = @PId)
        BEGIN
        INSERT INTO Patients (
        Name, DateOfBirth, Gender, Email, Phone, PImage, Address,
        MedicalHistory, InsuranceInformation, EmergencyContactName, EmergencyContactPhone,
        PrimaryCarePhysicianName, PrimaryCarePhysicianPhone, Allergies, Medications,
        BloodType, Height, Weight, PreferredLanguage, Occupation, Status
        )
        VALUES (
        @Name, @DateOfBirth, @Gender, @Email, @Phone, @PImage, @Address,
        @MedicalHistory, @InsuranceInformation, @EmergencyContactName, @EmergencyContactPhone,
        @PrimaryCarePhysicianName, @PrimaryCarePhysicianPhone, @Allergies, @Medications,
        @BloodType, @Height, @Weight, @PreferredLanguage, @Occupation, @Status
        );
        SET @PatientId = SCOPE_IDENTITY();
        update Appointments set PId =@PId where AppointmentId =@AppointmentId;
        SELECT @PatientId AS PatientId, 1 AS StatusCode, 'Insert Successful' AS ResponseText;
        END
        ELSE
        BEGIN
        -- Update existing record
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
        update Appointments set PId =@PId where AppointmentId =@AppointmentId;
        SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
        END
        END TRY
        BEGIN CATCH
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_InsertOrUpdatePremiumService]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_InsertOrUpdatePremiumService]
        @ServiceID INT = NULL,
        @ServiceName NVARCHAR(100)= NULL,
        @Description NVARCHAR(500)= NULL,
        @Price DECIMAL(18, 2)= NULL,
        @LastPrice DECIMAL(18, 2)= NULL,
        @Duration INT= NULL,
        @RenewalOption BIT= 0,
        @Discounts DECIMAL(18, 2)= NULL,
        @CustomerSupportLevel NVARCHAR(50)= NULL,
        @TermsAndConditions NVARCHAR(MAX)= NULL,
        @EmailMarketing BIT= 0,
        @EmailVerificationService BIT= 0,
        @ShowYourUserPassword BIT= 0,
        @ReferralService BIT= 0,
        @BackUpService BIT= 0,
        @SmsNotificationService BIT= 0,
        @UserAppointmentReminderService BIT= 0,
        @DoctorAvailabilityNotificationService BIT= 0,
        @MedicineStoreManagementService BIT= 0,
        @TwoFactorAuthenticationService BIT= 0,
        @IsMultipleMobileAllowed BIT= 0,
        @IsDarkModeEnabled BIT= 0,
        @IsBillingNotificationEnabled BIT= 0,
        @IsPrescriptionRefillReminderEnabled BIT= 0,
        @MaxLoginAttempts BIT= 0,
        @IsShowPassword BIT= 0,
        @IsSocialAlert BIT= 0,
        @IsPasswordOnly BIT= 0,
        @IsPatient BIT= 0,
        @IsDoctor BIT= 0,
        @SuperAdmin BIT= 0,
        @IsAdmin BIT= 0,
        @IsLabManagmentService BIT= 0,
        @IsLowStorageMedicineNotification BIT= 0,
        @IsAppointmentContactService BIT= 0,
        @IsAppointmentFormService BIT= 0,
        @IsAppointmentStatus BIT= 0,
        @IsWhatsappMarketing BIT= 0
        AS
        BEGIN
        BEGIN TRY
        IF Not EXISTS (SELECT 1 FROM PremiumService WHERE ServiceID = @ServiceID)
        BEGIN
        -- Insert new record
        INSERT INTO PremiumService (
        ServiceName,
        Description,
        Price,
        LastPrice,
        Duration,
        RenewalOption,
        Discounts,
        CustomerSupportLevel,
        TermsAndConditions,
        CreatedAt,
        UpdatedAt,
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
        IsAdmin ,
        IsLabManagmentService,
        IsLowStorageMedicineNotification,
        IsAppointmentContactService,
        IsAppointmentFormService,
        IsAppointmentStatus,
        IsWhatsappMarketing

        ) VALUES (
        @ServiceName,
        @Description,
        @Price,
        @LastPrice,
        @Duration,
        @RenewalOption,
        @Discounts,
        @CustomerSupportLevel,
        @TermsAndConditions,
        GETDATE(), -- CreatedAt
        GETDATE(), -- UpdatedAt
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
        -- Update existing record
        UPDATE PremiumService
        SET
        ServiceName = @ServiceName,
        Description = @Description,
        Price = @Price,
        LastPrice = @LastPrice,
        Duration = @Duration,
        RenewalOption = @RenewalOption,
        Discounts = @Discounts,
        CustomerSupportLevel = @CustomerSupportLevel,
        TermsAndConditions = @TermsAndConditions,
        UpdatedAt = GETDATE(), -- UpdatedAt
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
        IsAdmin = @IsAdmin ,
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
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_InsertTreatment]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_InsertTreatment]
        @PatientId INT,
        @DoctorId INT,
        @Diagnosis NVARCHAR(MAX),
        @TreatmentDate DATETIME,
        @Description NVARCHAR(MAX),
        @Status NVARCHAR(50),
        @CreatedBy NVARCHAR(100),
        @Medications MedicationType READONLY -- Table type for Medications
        AS
        BEGIN
        Begin Try
        SET NOCOUNT ON;

        DECLARE @TreatmentId INT;

        -- Insert into Treatment table
        INSERT INTO Treatment (PId, DrId, Diagnosis, TreatmentDate, Description, Status, CreatedBy)
        VALUES (@PatientId, @DoctorId, @Diagnosis, @TreatmentDate, @Description, @Status,  @CreatedBy);

        SET @TreatmentId = SCOPE_IDENTITY();

        -- Insert into Medication table
        INSERT INTO Medication (TreatmentId, Name, Dosage, Frequency, FollowUpDate)
        SELECT @TreatmentId, Name, Dosage, Frequency, FollowUpDate
        FROM @Medications;

        SELECT 1 AS StatusCode, 'Add Successful' AS ResponseText;
        End try
        Begin Catch
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        End Catch
        END;

        GO
        /****** Object:  StoredProcedure [dbo].[Proc_InsertUserLogin]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_InsertUserLogin]
        @UserEmail NVARCHAR(255),
        @DeviceID INT,
        @IPAddress NVARCHAR(45),
        @LoginStatus INT
        AS
        BEGIN
        INSERT INTO UserLogins (UserEmail, DeviceID, IPAddress, LoginStatus)
        VALUES (@UserEmail, @DeviceID, @IPAddress, @LoginStatus);
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_IsUserVerfied]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO

        CREATE   PROCEDURE[dbo].[Proc_IsUserVerfied]
        @Email VARCHAR(100)
        AS
        BEGIN
        IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND(IsActive = 0 OR IsActive IS NULL))
        BEGIN
        SELECT 3 AS StatusCode, 'Your account has been deactivated. Please contact the support team for assistance.' AS ResponseText;
        END
        ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND IsLocked = 1)
        BEGIN
        SELECT 4 AS StatusCode, 'The user account is temporarily locked.' AS ResponseText;
        END
        ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND IsVerified = 1)
        BEGIN
        SELECT 1 AS StatusCode, 'Email Verified' AS ResponseText;
        END
        ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND(IsVerified = 0 OR IsVerified IS NULL))
        BEGIN
        SELECT - 2 AS StatusCode, 'Email Verification Pending' AS ResponseText;
        END
        ELSE
        BEGIN
        SELECT - 1 AS StatusCode, 'Invalid Email' AS ResponseText;
        END
        END;

        GO
        /****** Object:  StoredProcedure [dbo].[Proc_LockedUser]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_LockedUser]
        @Email VARCHAR(50)
        AS
        BEGIN
        -- Check if the user exists
        IF EXISTS (SELECT 1 FROM tbl_users WHERE username = @Email)
        BEGIN
        -- Increment the invalid login attempts
        UPDATE tbl_users
        SET IsLocked = 1
        WHERE username = @Email;
        END
        ELSE
        BEGIN
        -- Handle the case where the user does not exist
        RAISERROR('User not found.', 16, 1);
        END
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_ManagePurchase]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO


        Create   PROCEDURE [dbo].[Proc_ManagePurchase]
        @PurchaseID INT = NULL,
        @ProjectID INT,
        @UserEmail VARCHAR(255),
        @ServiceID INT,
        @ExpiryYear int,
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
        @IsWhatsappMarketing BIT,
        @ExpiryDate VARCHAR(255)
        SET NOCOUNT ON;

        BEGIN TRY
        IF Not EXISTS (SELECT 1 FROM Purchases WHERE PurchaseID = @PurchaseID)
        BEGIN
        SET @ExpiryDate = DATEADD(YEAR, @ExpiryYear, GETDATE());
        INSERT INTO Purchases (UserEmail,ProjectId, ServiceID, ExpiryDate, Price, Discount, FinalPrice, RenewalOption)
        VALUES (@UserEmail,@ProjectID ,@ServiceID, @ExpiryDate, @Price, @Discount, @FinalPrice, @RenewalOption);


        Select @EmailMarketing=EmailMarketing,@EmailVerificationService=EmailVerificationService,@ShowYourUserPassword=ShowYourUserPassword,@ReferralService=ReferralService,
        @BackUpService=BackUpService,@SmsNotificationService=SmsNotificationService,@UserAppointmentReminderService=UserAppointmentReminderService,
        @DoctorAvailabilityNotificationService=DoctorAvailabilityNotificationService,@MedicineStoreManagementService=MedicineStoreManagementService,@TwoFactorAuthenticationService=TwoFactorAuthenticationService,
        @IsMultipleMobileAllowed=IsMultipleMobileAllowed,@IsBillingNotificationEnabled=IsBillingNotificationEnabled,@IsPrescriptionRefillReminderEnabled=IsPrescriptionRefillReminderEnabled,
        @MaxLoginAttempts=MaxLoginAttempts,
        @IsShowPassword=IsShowPassword,@IsSocialAlert=IsSocialAlert,@IsPasswordOnly=IsPasswordOnly,@IsPatient=IsPatient,@IsDoctor=IsDoctor,@SuperAdmin=SuperAdmin,@IsAdmin=IsAdmin
        From PremiumService Where ServiceID=@ServiceID;

        Update ApplicationSetting Set  IsEmailVerificationRequired=@EmailVerificationService,IsEmailMarketing=@EmailMarketing,IsShowPassword=@ShowYourUserPassword,IsReferral=@ReferralService,
        IsBackUpService=@BackUpService,IsSmsNotificationEnabled=@SmsNotificationService,IsDarkModeEnabled=@IsDarkModeEnabled,IsAppointmentReminderEnabled=@UserAppointmentReminderService ,IsDoctorAvailabilityNotificationEnabled=@DoctorAvailabilityNotificationService,
        IsMSServiceEnabled=@MedicineStoreManagementService,IsTwoFactorAuthenticationEnabled=@TwoFactorAuthenticationService,IsMultipleMobileAllowed=@IsMultipleMobileAllowed,
        IsBillingNotificationEnabled=@IsBillingNotificationEnabled,IsPrescriptionRefillReminderEnabled=@IsPrescriptionRefillReminderEnabled,MaxLoginAttempts=@MaxLoginAttempts,
        IsSocialAlert=@IsSocialAlert,IsPasswordOnly=@IsPasswordOnly,IsPatient=@IsPatient,IsDoctor=@IsDoctor,SuperAdmin=@SuperAdmin,IsAdmin=@IsAdmin ,
        IsLabManagmentService = @IsLabManagmentService,IsLowStorageMedicineNotification = @IsLowStorageMedicineNotification,IsAppointmentContactService = @IsAppointmentContactService,
        IsAppointmentFormService = @IsAppointmentFormService,IsAppointmentStatus = @IsAppointmentStatus,IsWhatsappMarketing = @IsWhatsappMarketing ,Updatedate=GETDATE()
        Where ProjectID =@ProjectID;

        SELECT 1 AS StatusCode, 'Add Successful' AS ResponseText;
        END
        ELSE
        BEGIN
        UPDATE Purchases
        SET UserEmail = @UserEmail,
        ServiceID = @ServiceID,
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
        /****** Object:  StoredProcedure [dbo].[Proc_PageErrorLog]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   proc [dbo].[Proc_PageErrorLog]
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
        INSERT INTO tbl_PageErrorLog (_ClsName, _FnName,_ProcName, _UserID, _Error)
        VALUES (@ClsName, @FnName,@ProcName, @UserID, @Error)

        SELECT 1,'Error Log Sucessfully Inserted' Msg

        end
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_ResetInvalidLoginAttempts]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_ResetInvalidLoginAttempts]
        @Email VARCHAR(50)
        AS
        BEGIN
        -- Check if the user exists
        IF EXISTS (SELECT 1 FROM tbl_users WHERE username = @Email)
        BEGIN
        -- Increment the invalid login attempts
        UPDATE tbl_users
        SET InvalidLoginAttempts = 0
        WHERE username = @Email;
        END
        ELSE
        BEGIN
        -- Handle the case where the user does not exist
        RAISERROR('User not found.', 16, 1);
        END
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_UpdateProjectId]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE PROCEDURE [dbo].[Proc_UpdateProjectId]
        @Email VARCHAR(100),
        @ProjectId INT
        AS
        BEGIN
        BEGIN TRY
        IF EXISTS (SELECT 1 FROM AspNetUsers WHERE Email = @Email)
        BEGIN
        UPDATE AspNetUsers
        SET ProjectId = @ProjectId
        WHERE Email = @Email;

        SELECT 1 AS StatusCode, 'Update successful' AS ResponseText;
        END
        ELSE
        BEGIN
        SELECT -1 AS StatusCode, 'User does not exist! Please try again.' AS ResponseText;
        END
        END TRY
        BEGIN CATCH
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_UpdateTreatment]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_UpdateTreatment]
        @TreatmentId INT,
        @PatientId INT,
        @DoctorId INT,
        @Diagnosis NVARCHAR(MAX),
        @TreatmentDate DATETIME,
        @Description NVARCHAR(MAX),
        @Status NVARCHAR(50),
        @ModifiedBy NVARCHAR(100),
        @Medications MedicationType READONLY -- Table type for Medications
        AS
        BEGIN
        Begin Try
        SET NOCOUNT ON;

        -- Update Treatment table
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

        -- Delete existing Medications
        DELETE FROM Medication WHERE TreatmentId = @TreatmentId;

        -- Insert new Medications
        INSERT INTO Medication (TreatmentId, Name, Dosage, Frequency, FollowUpDate)
        SELECT @TreatmentId, Name, Dosage, Frequency, FollowUpDate
        FROM @Medications;
        SELECT 1 AS StatusCode, 'Update Successful' AS ResponseText;
        End try
        Begin Catch
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        End Catch
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_UpdateUserStatus]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_UpdateUserStatus]
        @Id INT,
        @IsVerified BIT,
        @IsLocked BIT,
        @IsActive BIT
        AS
        BEGIN TRY
        BEGIN TRANSACTION;
        UPDATE tbl_users
        SET
        IsVerified = @IsVerified,
        IsLocked = @IsLocked,
        IsActive = @IsActive
        WHERE userId = @Id;
        SELECT 1 AS StatusCode, 'update Succesful' AS ResponseText;
        COMMIT TRANSACTION;
        END TRY
        BEGIN CATCH
        ROLLBACK TRANSACTION;
        SELECT 1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH;

        GO
        /****** Object:  StoredProcedure [dbo].[Proc_UpsertAppointment]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_UpsertAppointment]
        @AppointmentId INT = NULL,
        @DrId INT,
        @PId INT= NULL,
        @ServiceId INT,
        @Date DATE,
        @Time NVARCHAR(20),
        @Status INT,
        @Notes NVARCHAR(MAX) = NULL
        AS
        BEGIN
        BEGIN TRY
        SET NOCOUNT ON;

        IF @AppointmentId IS NULL OR NOT EXISTS (SELECT 1 FROM Appointments WHERE AppointmentId = @AppointmentId)
        BEGIN
        -- Insert new appointment
        INSERT INTO Appointments (DrId, PId, ServiceId, Date, Time, Status, Notes)
        VALUES (@DrId, @PId, @ServiceId, @Date, @Time, 1, @Notes);
        SELECT SCOPE_IDENTITY() AS AppointmentId, 1 AS StatusCode, 'Insert Successful' AS ResponseText;
        END
        ELSE
        BEGIN
        -- Update existing appointment
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
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_UpsertMedicineAndStock]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[Proc_UpsertMedicineAndStock]
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
        IF EXISTS (SELECT 1 FROM Medicines WHERE MedicineID = @MedicineID)
        BEGIN
        UPDATE Medicines
        SET Name = @Name,
        Description = @Description,
        Manufacturer = @Manufacturer,
        Price = @Price,
        MedTypeID=@MedTypeID,
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
        INSERT INTO Medicines (Name, Description, Manufacturer,Price,MedTypeID, ExpiryDate)
        VALUES (@Name, @Description, @Manufacturer,@Price, @MedTypeID, @ExpiryDate);
        DECLARE @NewMedicineID INT;
        SET @NewMedicineID = SCOPE_IDENTITY();
        INSERT INTO MedicineStocks (MedicineID, Quantity)
        VALUES (@NewMedicineID, @Quantity);
        SELECT 1 AS StatusCode, 'Medicines Add Successful!' AS ResponseText;
        END
        SELECT -1 AS StatusCode, 'Sorry something went wrong!' AS ResponseText;
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[Proc_VerifyConfirmationEmail]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE PROCEDURE[dbo].[Proc_VerifyConfirmationEmail]
        @Email VARCHAR(100),
        @OTP INT,
        @Type VARCHAR(50)
        AS
        /*
        Type:
          NEV = New Email Verification;
          EVFUNLOCK = Email Verification For Unlock Account;
          FPOV = Forgot Password OTP Verification;
        */
        BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
        DECLARE @CurrentTime DATETIME = GETDATE();
        DECLARE @ExpiryTime DATETIME = DATEADD(MINUTE, -5, @CurrentTime);

        IF @Type = 'NEV'
        BEGIN
            IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)
        BEGIN
        UPDATE tbl_users SET IsVerified = 1 WHERE username = @Email;
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;
        SELECT 1 AS StatusCode, 'OTP Verified. Please log in again!' AS ResponseText;
        END
        ELSE IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP)
        BEGIN
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;
        SELECT - 1 AS StatusCode, 'OTP Has Expired' AS ResponseText;
        END
        ELSE
        BEGIN
        SELECT - 1 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
        END
        END
        ELSE IF @Type = 'EVFUNLOCK'
        BEGIN
        IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email)
        BEGIN
                IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)
        BEGIN
        UPDATE tbl_users SET InvalidLoginAttempts = 0, IsLocked = 0 WHERE username = @Email;
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;
        SELECT 1 AS StatusCode, 'Congratulations! Your account has been unlocked. Please log in again to regain access.' AS ResponseText;
        END
        ELSE
        BEGIN
        SELECT - 1 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
        END
        END
        ELSE
        BEGIN
        SELECT - 1 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
        END
        END
        ELSE IF @Type = 'FPOV'
        BEGIN
        IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email)
        BEGIN
                IF EXISTS(SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)
        BEGIN
        SELECT 5 AS StatusCode, 'Congratulations! OTP Verified' AS ResponseText;
        END
        ELSE
        BEGIN
        SELECT - 1 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
        END
        END
        ELSE
        BEGIN
        SELECT - 1 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
        END
        END
        ELSE
        BEGIN
        SELECT - 1 AS StatusCode, 'Invalid Type' AS ResponseText;
        END
        END TRY
        BEGIN CATCH
        SELECT
        - 1 AS StatusCode,
        ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END
        GO
        /****** Object:  StoredProcedure [dbo].[sp_insert_user]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[sp_insert_user]
        @username VARCHAR(100),
        @PasswordHash NVARCHAR(255)
        AS
        BEGIN
        INSERT INTO tbl_users (username, PasswordHash,IsActive)
        VALUES (@username, @PasswordHash,1);
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[sp_Validate_Email]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[sp_Validate_Email]
        @Email VARCHAR(100),
        @OTP INT
        AS
        BEGIN
        SET NOCOUNT ON;

        INSERT INTO tbl_Validate_Email (vEmail, vOTP)
        VALUES (@Email, @OTP);
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[sp_VerifyOTP]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[sp_VerifyOTP]
        @Email VARCHAR(100),
        @OTP INT
        AS
        BEGIN
        SET NOCOUNT ON;

        DECLARE @IsValid BIT;
        DECLARE @CurrentTime DATETIME;
        DECLARE @ExpiryTime DATETIME;

        SET @CurrentTime = GETDATE();

        SET @ExpiryTime = DATEADD(MINUTE, -5, @CurrentTime);    
    
    IF EXISTS (SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)
        BEGIN
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;
        update tbl_users set IsVerified= 1  WHERE username = @Email;
        SELECT 1 AS StatusCode, 'OTP Verified' AS ResponseText;
        END
        ELSE IF EXISTS (SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP)
        BEGIN
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;
        SELECT -1 AS StatusCode, 'OTP Has Expired' AS ResponseText;
        END
        ELSE
        BEGIN
        SELECT -2 AS StatusCode, 'Invalid OTP or Email' AS ResponseText;
        END
        END
        GO
        /****** Object:  StoredProcedure [dbo].[UpdateApplicationSetting]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        Create   PROCEDURE [dbo].[UpdateApplicationSetting]
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
        @IsDarkModeEnabled BIT,
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
        @IsAdmin BIT   ,
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
        IsDarkModeEnabled = @IsDarkModeEnabled,
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
        IsAdmin = @IsAdmin  ,
        Updatedate= Getdate(),
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
        SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        /****** Object:  StoredProcedure [dbo].[usp_UpsertEmailTemplate]    Script Date: 19-07-2024 17:35:39 ******/
        SET ANSI_NULLS ON
        GO
        SET QUOTED_IDENTIFIER ON
        GO
        CREATE   PROCEDURE [dbo].[usp_UpsertEmailTemplate]
        @TemplateID INT = 0 ,
        @ProjectId INT,
        @EmailType VARCHAR(255),
        @Subject VARCHAR(255),
        @TemplateImage VARCHAR(255),
        @Content nvarchar(MAX),
        @Status INT
        AS
        BEGIN
        SET NOCOUNT ON;

        BEGIN TRY
        IF EXISTS (SELECT 1 FROM EmailTemplates WHERE TemplateID = @TemplateID)
        BEGIN
        UPDATE EmailTemplates
        SET TemplateImage = @TemplateImage,
        Content = @Content,
        Status = @Status,
        UpdateOn = GETDATE()
        WHERE TemplateID = @TemplateID;

        SELECT 1 AS StatusCode, 'Email Templates Update Successful!' AS ResponseText;
        END
        ELSE
        BEGIN
        INSERT INTO EmailTemplates (ProjectId,EmailType,Subject,TemplateImage,Content,Status,CreatedAt)
        VALUES (@ProjectId,@EmailType,@Subject,@TemplateImage,@Content,0,GETDATE());

        SELECT 1 AS StatusCode, 'Email Templates Insert Successful!' AS ResponseText;
        END
        END TRY
        BEGIN CATCH
        SELECT
        -1 AS StatusCode,
        ERROR_MESSAGE() AS ResponseText;
        END CATCH
        END;
        GO
        USE [master]
        GO
        ALTER DATABASE [DCS2] SET  READ_WRITE
        GO

            CREATE PROCEDURE [dbo].[Proc_GetMasterEmailTemplateType]
            @Id INT = 0,
            @EmailType VARCHAR(100) = 'All',
            @ProjectId INT,
            @PageLength INT = 10
            AS
            BEGIN
            IF (@EmailType = 'All' AND @Id = 0)
            BEGIN
            SELECT TOP (@PageLength) *
            FROM MasterEmailTemplateType
            WHERE ProjectId = @ProjectId;
            END               
            ELSE IF (@Id > 0)
            BEGIN
            SELECT *
            FROM MasterEmailTemplateType
            WHERE ProjectId = @ProjectId AND (EmailTypeId = @Id OR @Id = 0);
            END
            ELSE
            BEGIN
            SELECT TOP (@PageLength) *
            FROM MasterEmailTemplateType
            WHERE EmailType LIKE '%' + @EmailType + '%'
            AND ProjectId = @ProjectId;
            END
            END  




            CREATE TABLE MasterEmailTemplateType (
            EmailTypeId INT primary key Identity(1,1),
            ProjectId int,
            EmailType NVARCHAR(255),
            Status BIT,
            IsDefault BIT,
            CreateOn NVARCHAR(255),
            UpdateOn NVARCHAR(255),
            );





            ALTER PROCEDURE Proc_AddOrUpdateMasterEmailTemplateType
            @EmailTypeId  int,
            @ProjectId int,
            @EmailType NVARCHAR(255),
            @Status BIT =0,
            @IsDefault BIT = 0
            AS
            BEGIN
            BEGIN TRY
            IF EXISTS (SELECT 1 FROM MasterEmailTemplateType WHERE EmailTypeId = @EmailTypeId)
            BEGIN
            UPDATE MasterEmailTemplateType
            SET EmailType = @EmailType,
            Status = @Status,
            IsDefault = @IsDefault,
            UpdateOn = Getdate()
            WHERE EmailTypeId = @EmailTypeId;

            SELECT 1 AS StatusCode, 'Email Type Update Successful' AS ResponseText;
            END
            ELSE
            BEGIN
            INSERT INTO MasterEmailTemplateType (ProjectId,EmailType, Status, IsDefault, CreateOn)
            VALUES (@ProjectId,@EmailType, @Status, @IsDefault, Getdate());

            SELECT 1 AS StatusCode, 'Email Type Add Successful' AS ResponseText;
            END
            END TRY
            BEGIN CATCH
            SELECT -1 AS StatusCode, ERROR_MESSAGE() AS ResponseText;
            END CATCH
            END;


            update Invoice set ProjectId = 266188

            CREATE PROCEDURE [dbo].[Proc_Proc_GetInvoiceListAndBYId]
            @Id INT = 0,
            @PatientName VARCHAR(100) = null,
            @ProjectId INT,
            @PageLength INT = 10
            AS
            BEGIN
            IF (@PatientName IS NULL OR @PatientName = '')
            BEGIN
            SET @PatientName = 'All';
            END

            IF (@PatientName = 'All' AND @Id = 0)
            BEGIN
            SELECT TOP (@PageLength) *
            FROM Invoice
            WHERE ProjectId = @ProjectId;
            END                   
    ELSE IF (@Id > 0)
            BEGIN
            SELECT *
            FROM Invoice
            WHERE ProjectId = @ProjectId AND (InvoiceID = @Id OR @Id = 0);
            END
            ELSE
            BEGIN
            SELECT TOP (@PageLength) *
            FROM Invoice
            WHERE PatientName LIKE '%' + @PatientName + '%'
            AND ProjectId = @ProjectId;
            END
            END 

            update Invoice set Email = 'farazshaikh8960@gmail.com' ;