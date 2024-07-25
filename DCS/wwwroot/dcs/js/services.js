CREATE PROCEDURE Proc_UpdateHospitalEmployeeStatus
@Id INT,
    @Status BIT
AS
BEGIN  
    BEGIN TRY  
        IF EXISTS(SELECT 1 FROM HospitalEmployee WHERE EmployeeId = @Id)
BEGIN  
            UPDATE HospitalEmployee   
            SET Status = @Status   
            WHERE EmployeeId = @Id;  
  
            SELECT 1 AS StatusCode, 'Status update successful!' AS ResponseText;
END
ELSE
BEGIN
SELECT - 1 AS StatusCode, 'employee not found!' AS ResponseText;
END  
    END TRY  
    BEGIN CATCH
SELECT
    - 1 AS StatusCode,
        ERROR_MESSAGE() AS ResponseText;  
    END CATCH
END  





alter   Proc[dbo].[Proc_GetUser]
As
Begin    
 SELECT tu.userId As UserId, U.Name, U.ProjectId as ProjectId, U.UserName, U.Email, R.Name AS Role, tu.PasswordHash, tu.IsVerified, tu.IsActive, tu.IsLocked    
 FROM AspNetUsers U    
 JOIN AspNetUserRoles UR ON U.Id = UR.UserId    
 JOIN tbl_users tu ON U.Email = tu.username    
 JOIN AspNetRoles R ON UR.RoleId = R.Id;
End  

    alter PROCEDURE[dbo].[Proc_GetHospitalEmployeeListOrById]
@Id INT = 0,
    @email VARCHAR(100) = null,
        @ProjectId INT,
            @Role Varchar(100) = null,
                @PageLength INT = 10
AS
BEGIN
IF(@email IS NULL OR @email = '')
BEGIN    
        SET @email = 'All';
END
IF(@Role = 'Admin')
BEGIN    
        SELECT TOP(@PageLength) *
    FROM HospitalEmployee;

END
IF(@email = 'All' AND @Id = 0)
BEGIN                    
        SELECT TOP(@PageLength) *
    FROM HospitalEmployee         
        WHERE ProjectId = @ProjectId;
END                     
    ELSE IF(@Id > 0)
BEGIN
SELECT *
    FROM HospitalEmployee         
        WHERE ProjectId = @ProjectId AND(EmployeeId = @Id OR @Id = 0);
END
ELSE
BEGIN                    
        SELECT TOP(@PageLength) *
    FROM HospitalEmployee                   
        WHERE Email LIKE '%' + @email + '%'                   
        AND ProjectId = @ProjectId;
END
END 



                alter PROCEDURE Proc_AddOrUpdateHospitalEmployee
@EmployeeId INT = NULL, --NULL for add, provide value for update
    @ProjectId INT,
    @Name VARCHAR(255),
        @Email VARCHAR(255),
            @ContactNumber VARCHAR(50),
                @ProfileImage VARCHAR(255),
                    @Address VARCHAR(255),
                        @Specialization VARCHAR(255),
                            @Gender VARCHAR(50),
                                @DateOfBirth VARCHAR(255),
                                    @DateOfJoining VARCHAR(255),
                                        @Qualifications VARCHAR(255),
                                            @ExperienceYears INT,
                                                @Department VARCHAR(255),
                                                    @Position VARCHAR(255),
                                                        @Salary DECIMAL(10, 2),
                                                            @AdharNumber VARCHAR(20),
                                                                @AdharImage VARCHAR(255)
AS
BEGIN
    SET NOCOUNT ON;

		IF EXISTS(SELECT 1 FROM HospitalEmployee WHERE EmployeeId = @EmployeeId)
BEGIN
--Update existing record
        UPDATE HospitalEmployee
SET
Name = @Name,
    ContactNumber = @ContactNumber,
    ProfileImage = @ProfileImage,
    Address = @Address,
    Specialization = @Specialization,
    ExperienceYears = @ExperienceYears,
    Department = @Department,
    Position = @Position,
    Salary = @Salary,
    UpdateDate = Getdate()
        WHERE EmployeeId = @EmployeeId;
		SELECT 1 AS StatusCode, 'Employee uUpdate Successful' AS ResponseText;
END
Else If EXISTS(SELECT 1 FROM HospitalEmployee WHERE Email = @Email)

Begin
SELECT - 1 AS StatusCode, 'Email Already Exists' AS ResponseText;
return
End
ELSE
BEGIN
--Insert new record
        INSERT INTO HospitalEmployee(
    ProjectId,
    Name,
    Email,
    ContactNumber,
    ProfileImage,
    Address,
    Specialization,
    Gender,
    DateOfBirth,
    Qualifications,
    ExperienceYears,
    Department,
    Position,
    DateOfJoining,
    Salary,
    AdharNumber,
    AdharImage,
    Status,
    CreateDate
)
VALUES(
    @ProjectId,
    @Name,
    @Email,
    @ContactNumber,
    @ProfileImage,
    @Address,
    @Specialization,
    @Gender,
    @DateOfBirth,
    @Qualifications,
    @ExperienceYears,
    @Department,
    @Position,
    @DateOfJoining,
    @Salary,
    @AdharNumber,
    @AdharImage,
    0,
    Getdate()
);
		SELECT 1 AS StatusCode, 'Employee Add Successful' AS ResponseText;

END
END;


    CREATE TABLE HospitalEmployee(
        EmployeeId INT PRIMARY KEY identity(1, 1),
        ProjectId INT,
        Name VARCHAR(255),
        Email VARCHAR(255),
        ContactNumber VARCHAR(50),
        ProfileImage VARCHAR(255),
        Address VARCHAR(255),
        Specialization VARCHAR(255),
        Gender VARCHAR(50),
        DateOfBirth VARCHAR(255),
        Qualifications VARCHAR(255),
        ExperienceYears INT,
        Department VARCHAR(255),
        Position VARCHAR(255),
        DateOfJoining DATE,
        Salary DECIMAL(10, 2),
        AdharNumber VARCHAR(20),
        AdharImage VARCHAR(255),
        Status bit,
        CreateDate VARCHAR(255),
        UpdateDate VARCHAR(255)
    );
