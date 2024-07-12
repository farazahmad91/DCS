using API.AppCode.DL;
using API.AppCode.IML;
using API.AppCode.ML;
using Entities;
using Entities.Response;

namespace API.SendEmail
{
    public class EmailLogs
    {
        private readonly IDapper _dapper;
        public EmailLogs(IDapper dapper)
        {
            _dapper=dapper;
        }
        public int LogEmail(EmailLog req)
        {
            var sp = "InsertEmailLog";
            try
            {
                var param = new
                {
                    ToEmail = req.ToEmail,
                    ErrorMessage = req.ErrorMessage,
                    Subject = req.Subject,
                    Body = req.Body,
                    SentStatus = req.SentStatus,
                };
                var i = _dapper.Update(param, sp);
                return i;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = "",
                };
                 new ErrorLog_ML(_dapper).Error(error);
                return -1;
            }
        }
    }
}
