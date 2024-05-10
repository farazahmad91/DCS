﻿USE[master]
GO
/****** Object:  Database [SDClinic]    Script Date: 10-05-2024 17:56:16 ******/
CREATE DATABASE[SDClinic]
CONTAINMENT = NONE
 ON  PRIMARY
	(NAME = N'SDClinic', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER03\MSSQL\DATA\SDClinic.mdf', SIZE = 8192KB, MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB)
 LOG ON
	(NAME = N'SDClinic_log', FILENAME = N'C:\Program Files\Microsoft SQL Server\MSSQL16.MSSQLSERVER03\MSSQL\DATA\SDClinic_log.ldf', SIZE = 8192KB, MAXSIZE = 2048GB, FILEGROWTH = 65536KB)
 WITH CATALOG_COLLATION = DATABASE_DEFAULT, LEDGER = OFF
GO
ALTER DATABASE[SDClinic] SET COMPATIBILITY_LEVEL = 160
GO
IF(1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC[SDClinic].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE[SDClinic] SET ANSI_NULL_DEFAULT OFF
GO
ALTER DATABASE[SDClinic] SET ANSI_NULLS OFF
GO
ALTER DATABASE[SDClinic] SET ANSI_PADDING OFF
GO
ALTER DATABASE[SDClinic] SET ANSI_WARNINGS OFF
GO
ALTER DATABASE[SDClinic] SET ARITHABORT OFF
GO
ALTER DATABASE[SDClinic] SET AUTO_CLOSE OFF
GO
ALTER DATABASE[SDClinic] SET AUTO_SHRINK OFF
GO
ALTER DATABASE[SDClinic] SET AUTO_UPDATE_STATISTICS ON
GO
ALTER DATABASE[SDClinic] SET CURSOR_CLOSE_ON_COMMIT OFF
GO
ALTER DATABASE[SDClinic] SET CURSOR_DEFAULT  GLOBAL
GO
ALTER DATABASE[SDClinic] SET CONCAT_NULL_YIELDS_NULL OFF
GO
ALTER DATABASE[SDClinic] SET NUMERIC_ROUNDABORT OFF
GO
ALTER DATABASE[SDClinic] SET QUOTED_IDENTIFIER OFF
GO
ALTER DATABASE[SDClinic] SET RECURSIVE_TRIGGERS OFF
GO
ALTER DATABASE[SDClinic] SET  ENABLE_BROKER
GO
ALTER DATABASE[SDClinic] SET AUTO_UPDATE_STATISTICS_ASYNC OFF
GO
ALTER DATABASE[SDClinic] SET DATE_CORRELATION_OPTIMIZATION OFF
GO
ALTER DATABASE[SDClinic] SET TRUSTWORTHY OFF
GO
ALTER DATABASE[SDClinic] SET ALLOW_SNAPSHOT_ISOLATION OFF
GO
ALTER DATABASE[SDClinic] SET PARAMETERIZATION SIMPLE
GO
ALTER DATABASE[SDClinic] SET READ_COMMITTED_SNAPSHOT OFF
GO
ALTER DATABASE[SDClinic] SET HONOR_BROKER_PRIORITY OFF
GO
ALTER DATABASE[SDClinic] SET RECOVERY FULL
GO
ALTER DATABASE[SDClinic] SET  MULTI_USER
GO
ALTER DATABASE[SDClinic] SET PAGE_VERIFY CHECKSUM
GO
ALTER DATABASE[SDClinic] SET DB_CHAINING OFF
GO
ALTER DATABASE[SDClinic] SET FILESTREAM(NON_TRANSACTED_ACCESS = OFF)
GO
ALTER DATABASE[SDClinic] SET TARGET_RECOVERY_TIME = 60 SECONDS
GO
ALTER DATABASE[SDClinic] SET DELAYED_DURABILITY = DISABLED
GO
ALTER DATABASE[SDClinic] SET ACCELERATED_DATABASE_RECOVERY = OFF
GO
EXEC sys.sp_db_vardecimal_storage_format N'SDClinic', N'ON'
GO
ALTER DATABASE[SDClinic] SET QUERY_STORE = ON
GO
ALTER DATABASE[SDClinic] SET QUERY_STORE(OPERATION_MODE = READ_WRITE, CLEANUP_POLICY = (STALE_QUERY_THRESHOLD_DAYS = 30), DATA_FLUSH_INTERVAL_SECONDS = 900, INTERVAL_LENGTH_MINUTES = 60, MAX_STORAGE_SIZE_MB = 1000, QUERY_CAPTURE_MODE = AUTO, SIZE_BASED_CLEANUP_MODE = AUTO, MAX_PLANS_PER_QUERY = 200, WAIT_STATS_CAPTURE_MODE = ON)
GO
USE[SDClinic]
GO
/****** Object:  Table [dbo].[Appointments]    Script Date: 10-05-2024 17:56:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Appointments](
	[AppointmentID][int] IDENTITY(1, 1) NOT NULL,
	[PatientID][int] NULL,
	[AppointmentDate][date] NULL,
	[StartTime][varchar](50) NULL,
	[EndTime][varchar](50) NULL,
	[Status][int] NULL,
	[EntryOn][datetime] NULL,
	PRIMARY KEY CLUSTERED
	(
		[AppointmentID] ASC
	)WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Dentists]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[FAQs]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[Invoices]    Script Date: 10-05-2024 17:56:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Invoices](
	[InvoiceID][int] IDENTITY(1, 1) NOT NULL,
	[AppointmentID][int] NULL,
	[TotalAmount][decimal](10, 2) NULL,
	[InvoiceDate][date] NULL,
	[IsPaid][int] NULL,
	[EntryOn][datetime] NULL,
	PRIMARY KEY CLUSTERED
	(
		[InvoiceID] ASC
	)WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[MedicalHistory]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[Patient_Services]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[Patients]    Script Date: 10-05-2024 17:56:16 ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE[dbo].[Patients](
	[PatientID][int] IDENTITY(1, 1) NOT NULL,
	[FirstName][varchar](50) NULL,
	[LastName][varchar](50) NULL,
	[Email][varchar](100) NULL,
	[Phone][varchar](20) NULL,
	[Address][varchar](255) NULL,
	[CreatedOn][datetime] NULL,
	PRIMARY KEY CLUSTERED
	(
		[PatientID] ASC
	)WITH(PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON[PRIMARY]
) ON[PRIMARY]
GO
/****** Object:  Table [dbo].[Payments]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[Reviews]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[Services]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[tbl_PageErrorLog]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[Treatment]    Script Date: 10-05-2024 17:56:16 ******/
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
/****** Object:  Table [dbo].[WorkingHours]    Script Date: 10-05-2024 17:56:16 ******/
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
SET IDENTITY_INSERT[dbo].[Appointments] ON
GO
INSERT[dbo].[Appointments]([AppointmentID], [PatientID], [AppointmentDate], [StartTime], [EndTime], [Status], [EntryOn]) VALUES(1, 1, CAST(N'2024-05-10' AS Date), N'09:00 AM', N'10:00 AM', 1, CAST(N'2024-05-09T14:58:10.017' AS DateTime))
GO
INSERT[dbo].[Appointments]([AppointmentID], [PatientID], [AppointmentDate], [StartTime], [EndTime], [Status], [EntryOn]) VALUES(2, 2, CAST(N'2024-05-12' AS Date), N'02:30 PM', N'03:30 PM', 1, CAST(N'2024-05-09T14:58:10.017' AS DateTime))
GO
INSERT[dbo].[Appointments]([AppointmentID], [PatientID], [AppointmentDate], [StartTime], [EndTime], [Status], [EntryOn]) VALUES(3, 3, CAST(N'2024-05-15' AS Date), N'11:00 AM', N'12:00 PM', 1, CAST(N'2024-05-09T14:58:10.017' AS DateTime))
GO
SET IDENTITY_INSERT[dbo].[Appointments] OFF
GO
ALTER TABLE[dbo].[Dentists] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[FAQs] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Invoices] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[MedicalHistory] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Patient_Services] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Patients] ADD  DEFAULT(getdate()) FOR[CreatedOn]
GO
ALTER TABLE[dbo].[Payments] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Reviews] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[Services] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[tbl_PageErrorLog] ADD  DEFAULT(getdate()) FOR[_EntryDate]
GO
ALTER TABLE[dbo].[Treatment] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
ALTER TABLE[dbo].[WorkingHours] ADD  DEFAULT(getdate()) FOR[EntryOn]
GO
/****** Object:  StoredProcedure [dbo].[Proc_PageErrorLog]    Script Date: 10-05-2024 17:56:16 ******/
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
USE[master]
GO
ALTER DATABASE[SDClinic] SET  READ_WRITE
GO
