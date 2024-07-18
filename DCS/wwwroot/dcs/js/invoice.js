USE[DCS2]
GO
/****** Object:  StoredProcedure [dbo].[Proc_IsUserVerfied]    Script Date: 7/18/2024 3:19:28 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER   PROCEDURE[dbo].[Proc_IsUserVerfied]@Email VARCHAR(100)ASBEGIN      IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND(IsActive = 0 OR IsActive IS NULL))BEGIN        SELECT 3 AS StatusCode, 'Your account has been deactivated. Please contact the support team for assistance.' AS ResponseText;END	ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND IsLocked = 1)
BEGIN
        SELECT 4 AS StatusCode, 'The user account is temporarily locked.' AS ResponseText;
END    ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND IsVerified = 1)BEGIN        SELECT 1 AS StatusCode, 'Email Verified' AS ResponseText;END    ELSE IF EXISTS(SELECT 1 FROM tbl_users WHERE username = @Email AND(IsVerified = 0 OR IsVerified IS NULL))BEGINSELECT - 2 AS StatusCode, 'Email Verification Pending' AS ResponseText;ENDELSEBEGINSELECT - 1 AS StatusCode, 'Invalid Email' AS ResponseText;ENDEND;
USE[DCS2]
GO
/****** Object:  StoredProcedure [dbo].[Proc_VerifyConfirmationEmail]    Script Date: 7/18/2024 1:07:07 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
ALTER PROCEDURE[dbo].[Proc_VerifyConfirmationEmail]
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
