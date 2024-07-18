namespace Entities.Response
{
    public class Response
    {
        public string? ResponseText { get; set; }
        public ResponseStatus StatusCode { get; set; }
		public int? ProjectId { get; set; }
		public int? AppointmentId { get; set; }
        public int? PatientId { get; set; }

    }
    public enum ResponseStatus
    {

        SUCCESS = 1,
        FAILED = -1,
		EmailNotVerified = -2,
        ISEmailVerifiedField = 2,
        IsDeactiveUser =3,
        IsTempLock = 4,
        ISEmailVerifiedForForgotPassword = 5
    }

    public class RespnseToken : Response
    {
        public string? Token { get; set; }
        public DateTime? Expiretoken { get; set; }
    }
    public class Response<T>
    {
        public string? ResponseText { get; set; }

        public ResponseStatus StatusCode { get; set; }

        public T Result { get; set; }

    }
}
