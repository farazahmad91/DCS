namespace API.AppCode.WebAPIRequest
{
    public interface IAPIRequest
    {
        Task<HttpResponseMessage> PostAsync(string URL, string PostData = "", string AccessToken = "", string ContentType = "application/json", int timeout = 0);
        Task<string> CallUsingHttpWebRequest_GET(string URL);
        Task<string> CallUsingHttpWebRequest_POSTAsync(string URL, string PostData, string ContentType = "application/x-www-form-urlencoded");
        string CallUsingHttpWebRequest_POST(string URL, string PostData, IDictionary<string, string> headers = null, string ContentType = "application/x-www-form-urlencoded");
    }
}
