namespace Entities.Response
{
    public class Response
    {
        public string? ResponseText { get; set; }

        public ResponseStatus StatusCode { get; set; }
    }
    public enum ResponseStatus
    {

        SUCCESS = 1,
        FAILED = -1,
		ISEmailVerified = 2,
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
