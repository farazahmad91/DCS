using System.Net;

namespace API.DBContext.Response
{
    public class HttpsResponse
    {
        public HttpStatusCode HttpStatusCode { get; set; }
        public string HttpMessage { get; set; }
        public string Result { get; set; }
    }
}
