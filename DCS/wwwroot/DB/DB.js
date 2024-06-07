iUSE[master]
GO
/****** Object:  Database [DCS]    Script Date: 07-06-2024 18:45:21 ******/
CREATE DATABASE[DCS]
CONTAINMENT = NONE
 ON  PRIMARY
	(NAME = N'SDClinic', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER03\MSSQL\DATA\SDClinic.mdf', SIZE = 8192KB, MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB)
 LOG ON
	(NAME = N'SDClinic_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER03\MSSQL\DATA\SDClinic_log.ldf', SIZE = 8192KB, MAXSIZE = 2048GB, FILEGROWTH = 65536KB)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE[DCS] SET COMPATIBILITY_LEVEL = 160
GO
IF(1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC[DCS].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE[DCS] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE[DCS] SET ANSI_NULLS OFF
GO
ALTER DATABASE[DCS] SET ANSI_PADDING OFF
GO
ALTER DATABASE[DCS] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE[DCS] SET ARITHABORT OFF
GO
ALTER DATABASE[DCS] SET AUTO_CLOSE OFF
GO
ALTER DATABASE[DCS] SET AUTO_SHRINK OFF
GO
ALTER DATABASE[DCS] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE[DCS] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE[DCS] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE[DCS] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE[DCS] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE[DCS] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE[DCS] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE[DCS] SET  ENABLE_BROKER
GO
ALTER DATABASE[DCS] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE[DCS] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE[DCS] SET TRUSTWORTHY OFF
GO
ALTER DATABASE[DCS] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE[DCS] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE[DCS] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE[DCS] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE[DCS] SET RECOVERY FULL
GO
ALTER DATABASE[DCS] SET  MULTI_USER
GO
ALTER DATABASE[DCS] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE[DCS] SET DB_CHAINING OFF
GO
ALTER DATABASE[DCS] SET FILESTREAM(NON_TRANSACTED_ACCESS = OFF)
GO
ALTER DATABASE[DCS] SET TARGET_RECOVERY_TIME = 60 SECONDS
GO
ALTER DATABASE[DCS] SET DELAYED_DURABILITY = DISABLED
GO
ALTER DATABASE[DCS] SET ACCELERATED_DATABASE_RECOVERY = OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'DCS', N'ON'
GO
ALTER DATABASE[DCS] SET QUERY_STORE = ON
GO
ALTER DATABASE[DCS] SET QUERY_STORE(OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE[DCS]
GO
/****** Object:  UserDefinedTableType [dbo].[InvoiceItemType]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  UserDefinedTableType [dbo].[TransactionDetailType]    Script Date: 07-06-2024 18:45:21 ******/
CREATE TYPE[dbo].[TransactionDetailType] AS TABLE(
	[InvoiceID][int] NULL,
	[Mode][nvarchar](50) NULL,
	[TransactionId][nvarchar](50) NULL,
	[IsPaid][bit] NULL,
	[DueDate][nvarchar](50) NULL
)
GO
/****** Object:  UserDefinedTableType [dbo].[TransactionType]    Script Date: 07-06-2024 18:45:21 ******/
CREATE TYPE[dbo].[TransactionType] AS TABLE(
	[Mode][nvarchar](50) NULL,
	[TransactionId][nvarchar](50) NULL,
	[IsPaid][bit] NULL,
	[DueDate][nvarchar](50) NULL
)
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[appointments]    Script Date: 07-06-2024 18:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[appointments](
	[AppointmentID][int] IDENTITY(10000, 1) NOT NULL,
	[PatientID][int] NULL,
	[AppointmentDate][varchar](255) NULL,
	[AppointTime][varchar](50) NULL,
	[Status][int] NULL,
	[EntryOn][datetime] NULL,
	PRIMARY KEY CLUSTERED
	(
		[AppointmentID] ASC
	)WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[AspNetRoleClaims]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[AspNetRoles]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[AspNetUserClaims]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[AspNetUserLogins]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[AspNetUserRoles]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[AspNetUsers]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[AspNetUserTokens]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[Dentists]    Script Date: 07-06-2024 18:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Dentists](
	[DentistID][int] IDENTITY(1, 1) NOT NULL,
	[FirstName][varchar](50) NULL,
	[LastName][varchar](50) NULL,
	[Email][varchar](100) NULL,
	[Phone][varchar](20) NULL,
	[Specialization][varchar](50) NULL,
	[EntryOn][datetime] NULL,
	PRIMARY KEY CLUSTERED
	(
		[DentistID] ASC
	)WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[ErrorLog]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[FAQs]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[Invoice]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[InvoiceItem]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[MedicalHistory]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[Patient_Services]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[patients]    Script Date: 07-06-2024 18:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[patients](
	[PatientID][int] IDENTITY(10000, 1) NOT NULL,
	[PatientName][varchar](255) NULL,
	[PatientEmail][varchar](255) NULL,
	[PatientPhone][varchar](20) NULL,
	[Address][varchar](255) NULL,
	[EntryOn][datetime] NULL,
	PRIMARY KEY CLUSTERED
	(
		[PatientID] ASC
	)WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[Reviews]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[Services]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[tbl_PageErrorLog]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[tbl_users]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[tbl_Validate_Email]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[TransactionDetails]    Script Date: 07-06-2024 18:45:21 ******/
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
/****** Object:  Table [dbo].[Treatment]    Script Date: 07-06-2024 18:45:21 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Treatment](
	[TreatmentID][int] IDENTITY(1, 1) NOT NULL,
	[AppointmentID][int] NULL,
	[ServiceID][int] NULL,
	[DentistID][int] NULL,
	[Notes][varchar](255) NULL,
	[Duration][int] NULL,
	[Cost][decimal](10, 2) NULL,
	[Status][int] NULL,
	[EntryOn][datetime] NULL,
	PRIMARY KEY CLUSTERED
	(
		[TreatmentID] ASC
	)WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[WorkingHours]    Script Date: 07-06-2024 18:45:21 ******/
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
SET IDENTITY_INSERT[dbo].[appointments] ON
GO
INSERT[dbo].[appointments]([AppointmentID], [PatientID], [AppointmentDate], [AppointTime], [Status], [EntryOn]) VALUES(10000, 10000, N'2024-06-07', N'09:27', 1, CAST(N'2024-06-07T18:40:43.943' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[appointments] OFF
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
SET IDENTITY_INSERT [dbo].[ErrorLog] OFF
GO
SET IDENTITY_INSERT [dbo].[Invoice] ON 
GO
INSERT [dbo].[Invoice] ([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (1, N'string', N'string', N'string', N'string', 0, 0, 0, 0, CAST(N'2024-06-05T13:06:32.930' AS DateTime))
GO
INSERT [dbo].[Invoice] ([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (2, N'string', N'string', N'string', N'string', 0, 0, 0, 0, CAST(N'2024-06-05T13:08:42.173' AS DateTime))
GO
INSERT [dbo].[Invoice] ([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (3, N'fdg', N'dfgdf', N'9988773737', N'dfgfdg', 336, 16.799999237060547, 188.16000366210938, 507.3599853515625, CAST(N'2024-06-05T16:52:30.000' AS DateTime))
GO
INSERT [dbo].[Invoice] ([InvoiceID], [PatientName], [Email], [Phone], [Address], [Subtotal], [DiscountAmount], [TotalVAT], [TotalAmount], [EntryOn]) VALUES (4, N'fdg', N'dfgdf', N'9988773737', N'dfgfdg', 649362, 156184.5625, 29554.560546875, 522732, CAST(N'2024-06-05T16:57:01.050' AS DateTime))
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
SET IDENTITY_INSERT [dbo].[InvoiceItem] OFF
GO
SET IDENTITY_INSERT [dbo].[patients] ON 
GO
INSERT [dbo].[patients] ([PatientID], [PatientName], [PatientEmail], [PatientPhone], [Address], [EntryOn]) VALUES (10000, N'Farazshaikh', N'Farazshaikh60@gmail.com', N'987654446', N'strazamgar', CAST(N'2024-06-07T18:40:43.937' AS DateTime))
GO
SET IDENTITY_INSERT [dbo].[patients] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_users] ON 
GO
INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (1, N'faraz@gmail.com', N'ts/rTdP0AyPKNg1nNjW/G1u0/RxzquIMTEn/9jx5Us8=', CAST(N'2024-05-16T16:11:05.373' AS DateTime), NULL, NULL, 1, 3)
GO
INSERT [dbo].[tbl_users] ([userId], [username], [PasswordHash], [EntryOn], [IsVerified], [IsLocked], [IsActive], [InvalidLoginAttempts]) VALUES (2, N'Farazshaikh08538@gmail.com', N'Ihh3xfAefViWj8YBd0G16QXFZ2eFFZZdNOyazqtZA2k=', CAST(N'2024-06-06T11:40:20.697' AS DateTime), NULL, NULL, 1, 4)
GO
SET IDENTITY_INSERT [dbo].[tbl_users] OFF
GO
SET IDENTITY_INSERT [dbo].[tbl_Validate_Email] ON 
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (2, N'farazshaikh8960@gmail.com', 414045, CAST(N'2024-05-17T18:24:57.467' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (3, N'farazshaikh8960@gmail.com', 51054, CAST(N'2024-05-17T18:25:37.993' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (4, N'farazshaikh8960@gmail.com', 30228, CAST(N'2024-05-17T18:29:17.660' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (5, N'farazshaikh8960@gmail.com', 557898, CAST(N'2024-05-17T18:35:54.743' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (6, N'farazshaikh8960@gmail.com', 619465, CAST(N'2024-05-17T18:41:02.450' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (7, N'farazshaikh8960@gmail.com ', 482146, CAST(N'2024-05-29T17:49:37.020' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (8, N'Farazshaikh8960@gmail.com ', 86805, CAST(N'2024-05-29T17:57:23.537' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (9, N'farazshaikh8960@gmail.com ', 561152, CAST(N'2024-05-29T18:02:43.780' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (13, N'farazshaikh8960@gmail.com ', 811711, CAST(N'2024-05-30T12:27:44.450' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (14, N'farazshaikh8960@gmail.com ', 272417, CAST(N'2024-05-30T12:32:00.153' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (15, N'farazshaikh8960@gmail.com', 885314, CAST(N'2024-06-01T10:43:13.403' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (16, N'farazshaikh8960@gmail.com', 781682, CAST(N'2024-06-01T10:46:38.520' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (17, N'farazshaikh8960@gmail.com', 911570, CAST(N'2024-06-01T10:52:20.763' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (18, N'farazshaikh8960@gmail.com', 420577, CAST(N'2024-06-01T10:53:17.143' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (19, N'farazshaikh8960@gmail.com', 349892, CAST(N'2024-06-01T10:57:17.010' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (20, N'farazshaikh8960@gmail.com', 197330, CAST(N'2024-06-01T10:58:50.763' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (21, N'farazshaikh8960@gmail.com', 49812, CAST(N'2024-06-01T11:05:35.693' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (22, N'farazshaikh8960@gmail.com', 471181, CAST(N'2024-06-01T11:08:32.357' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (24, N'farazshaikh8960@gmail.com', 985664, CAST(N'2024-06-01T11:16:43.630' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (25, N'farazshaikh8960@gmail.com', 86074, CAST(N'2024-06-01T11:21:12.697' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (26, N'farazshaikh8960@gmail.com', 737575, CAST(N'2024-06-01T11:22:39.833' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (27, N'farazshaikh8960@gmail.com', 573082, CAST(N'2024-06-01T11:24:07.427' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (29, N'farazshaikh8960@gmail.com', 30396, CAST(N'2024-06-01T11:27:26.680' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (30, N'farazshaikh8960@gmail.com', 195918, CAST(N'2024-06-01T11:45:33.330' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (31, N'farazshaikh8960@gmail.com', 852617, CAST(N'2024-06-01T11:49:04.397' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (32, N'farazshaikh8960@gmail.com', 966045, CAST(N'2024-06-01T11:50:14.473' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (33, N'farazshaikh8960@gmail.com', 231240, CAST(N'2024-06-01T11:51:27.627' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (34, N'farazshaikh8960@gmail.com', 447915, CAST(N'2024-06-01T11:52:36.527' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (35, N'farazshaikh8960@gmail.com', 199830, CAST(N'2024-06-01T11:53:54.133' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (36, N'farazshaikh8960@gmail.com', 894994, CAST(N'2024-06-01T11:57:18.807' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (39, N'farazshaikh8960@gmail.com', 691884, CAST(N'2024-06-01T12:12:36.790' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (40, N'farazshaikh8960@gmail.com', 905228, CAST(N'2024-06-01T12:15:20.003' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (41, N'farazshaikh8960@gmail.com', 749557, CAST(N'2024-06-01T12:16:40.653' AS DateTime))
GO
INSERT [dbo].[tbl_Validate_Email] ([vID], [vEmail], [vOTP], [vEntry]) VALUES (1007, N'Farazshaikh08538@gmail.com', 17988, CAST(N'2024-06-06T11:40:25.127' AS DateTime))
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
SET IDENTITY_INSERT [dbo].[TransactionDetails] OFF
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetRoleClaims_RoleId]    Script Date: 07-06-2024 18:45:22 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetRoleClaims_RoleId] ON [dbo].[AspNetRoleClaims]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [RoleNameIndex]    Script Date: 07-06-2024 18:45:22 ******/
CREATE UNIQUE NONCLUSTERED INDEX [RoleNameIndex] ON [dbo].[AspNetRoles]
(
	[NormalizedName] ASC
)
WHERE ([NormalizedName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserClaims_UserId]    Script Date: 07-06-2024 18:45:22 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserClaims_UserId] ON [dbo].[AspNetUserClaims]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserLogins_UserId]    Script Date: 07-06-2024 18:45:22 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserLogins_UserId] ON [dbo].[AspNetUserLogins]
(
	[UserId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [IX_AspNetUserRoles_RoleId]    Script Date: 07-06-2024 18:45:22 ******/
CREATE NONCLUSTERED INDEX [IX_AspNetUserRoles_RoleId] ON [dbo].[AspNetUserRoles]
(
	[RoleId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [EmailIndex]    Script Date: 07-06-2024 18:45:22 ******/
CREATE NONCLUSTERED INDEX [EmailIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UserNameIndex]    Script Date: 07-06-2024 18:45:22 ******/
CREATE UNIQUE NONCLUSTERED INDEX [UserNameIndex] ON [dbo].[AspNetUsers]
(
	[NormalizedUserName] ASC
)
WHERE ([NormalizedUserName] IS NOT NULL)
WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, DROP_EXISTING = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
SET ANSI_PADDING ON
GO
/****** Object:  Index [UQ__patients__7006396A68595A2B]    Script Date: 07-06-2024 18:45:22 ******/
ALTER TABLE [dbo].[patients] ADD UNIQUE NONCLUSTERED 
(
	[PatientEmail] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
/****** Object:  Index [UK_vOTP]    Script Date: 07-06-2024 18:45:22 ******/
ALTER TABLE [dbo].[tbl_Validate_Email] ADD  CONSTRAINT [UK_vOTP] UNIQUE NONCLUSTERED 
(
	[vOTP] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, SORT_IN_TEMPDB = OFF, IGNORE_DUP_KEY = OFF, ONLINE = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
GO
ALTER TABLE [dbo].[appointments] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[Dentists] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[ErrorLog] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[FAQs] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[Invoice] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[MedicalHistory] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[Patient_Services] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[patients] ADD  DEFAULT (getdate()) FOR [EntryOn]
GO
ALTER TABLE [dbo].[Payments] ADD  DEFAULT (getdate()) FOR [EntryOn]
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
ALTER TABLE [dbo].[Treatment] ADD  DEFAULT (getdate()) FOR [EntryOn]
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
/****** Object:  StoredProcedure [dbo].[InsertInvoiceData]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[InsertInvoiceData]
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
/****** Object:  StoredProcedure [dbo].[Proc_ConfirmEmail]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
create proc [dbo].[Proc_ConfirmEmail]@IsVerfied int,@Email Varchar(100)AsBeginUpdate tbl_users set IsVerified = @IsVerfied where username = @Email;End
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetInvoiceDataByInvoiceId]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Proc_GetInvoiceDataByInvoiceId] 
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
/****** Object:  StoredProcedure [dbo].[Proc_GetInvoiceList]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create proc [dbo].[Proc_GetInvoiceList]
As
Begin
select * from InvoiceItem;
End
GO
/****** Object:  StoredProcedure [dbo].[Proc_GetUser]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE Proc [dbo].[Proc_GetUser]
As
Begin
 SELECT U.Id, U.Name, U.UserName, U.Email, R.Name AS Role,tu.PasswordHash,tu.IsVerified ,tu.IsActive, tu.IsLocked
 FROM AspNetUsers U
 JOIN AspNetUserRoles UR ON U.Id = UR.UserId
 JOIN tbl_users tu ON U.Email = tu.username
 JOIN AspNetRoles R ON UR.RoleId = R.Id;
End
GO
/****** Object:  StoredProcedure [dbo].[Proc_IncrementInvalidLoginAttempts]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Proc_IncrementInvalidLoginAttempts]
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
/****** Object:  StoredProcedure [dbo].[Proc_InsertErrorLog]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Proc_InsertErrorLog]  
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
/****** Object:  StoredProcedure [dbo].[Proc_InsertPatientAndAppointment]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Proc_InsertPatientAndAppointment]
    @PatientName VARCHAR(255),
    @PatientEmail VARCHAR(255),
    @PatientPhone VARCHAR(20),
    @Address VARCHAR(255),
    @AppointmentDate VARCHAR(50),
    @AppointTime VARCHAR(50),
    @Status INT
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;
        
        INSERT INTO patients (PatientName, PatientEmail, PatientPhone, Address)
        VALUES (@PatientName, @PatientEmail, @PatientPhone, @Address);
        
        DECLARE @PatientID INT;
        SET @PatientID = SCOPE_IDENTITY();
        
        INSERT INTO appointments (PatientID, AppointmentDate, AppointTime, Status)
        VALUES (@PatientID, @AppointmentDate, @AppointTime, @Status);
        
        COMMIT TRANSACTION;

        SELECT 1 AS StatusCode, 'Appointment confirmed successfully.' AS ResponseText;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK TRANSACTION;

        SELECT -1 AS StatusCode, 'Failed to confirm appointment. Please try again.' AS ResponseText;
    END CATCH;
END;
GO
/****** Object:  StoredProcedure [dbo].[Proc_IsUserVerfied]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Proc_IsUserVerfied]    @Email VARCHAR(100)ASBEGIN      IF EXISTS (SELECT 1 FROM tbl_users WHERE username = @Email AND (IsActive = 0 OR IsActive IS NULL))    BEGIN        SELECT 3 AS StatusCode, 'Your account has been deactivated. Please contact the support team for assistance.' AS ResponseText;    END	ELSE IF EXISTS (SELECT 1 FROM tbl_users WHERE username = @Email AND IsLocked = 1)
    BEGIN
        SELECT -1 AS StatusCode, 'The user account is temporarily locked.' AS ResponseText;
    END    ELSE IF EXISTS (SELECT 1 FROM tbl_users WHERE username = @Email AND IsVerified = 1)    BEGIN        SELECT 1 AS StatusCode, 'Email Verified' AS ResponseText;    END    ELSE IF EXISTS (SELECT 1 FROM tbl_users WHERE username = @Email AND (IsVerified = 0 OR IsVerified IS NULL))    BEGIN        SELECT 2 AS StatusCode, 'Email Not Verified' AS ResponseText;    END    ELSE    BEGIN        SELECT -1 AS StatusCode, 'Invalid Email' AS ResponseText;    ENDEND;
GO
/****** Object:  StoredProcedure [dbo].[Proc_PageErrorLog]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE proc [dbo].[Proc_PageErrorLog]  
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
/****** Object:  StoredProcedure [dbo].[Proc_ResetInvalidLoginAttempts]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
Create PROCEDURE [dbo].[Proc_ResetInvalidLoginAttempts]
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
/****** Object:  StoredProcedure [dbo].[Proc_VerifyConfirmationEmail]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[Proc_VerifyConfirmationEmail]    
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
    
    IF EXISTS (SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)      
    BEGIN      
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;       
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
/****** Object:  StoredProcedure [dbo].[sp_insert_user]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_insert_user]
    @username VARCHAR(100),
    @PasswordHash NVARCHAR(255)
AS
BEGIN
    INSERT INTO tbl_users (username, PasswordHash)
    VALUES (@username, @PasswordHash);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_Validate_Email]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_Validate_Email]
    @Email VARCHAR(100),
    @OTP INT
AS
BEGIN
    SET NOCOUNT ON;

    INSERT INTO tbl_Validate_Email (vEmail, vOTP)
    VALUES (@Email, @OTP);
END;
GO
/****** Object:  StoredProcedure [dbo].[sp_VerifyOTP]    Script Date: 07-06-2024 18:45:22 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE PROCEDURE [dbo].[sp_VerifyOTP]    
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
  
    IF EXISTS (SELECT 1 FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP AND vEntry >= @ExpiryTime)    
    BEGIN    
        DELETE FROM tbl_Validate_Email WHERE vEmail = @Email AND vOTP = @OTP;     
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
USE [master]
GO
ALTER DATABASE [DCS] SET  READ_WRITE 
GO


		CREATE PROCEDURE Proc_FindUser
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
