using API.DBContext.Response;
using Microsoft.AspNetCore.Http;

namespace API.AppCode.APIRequest
{
    public interface IAPIRequest
    {
        Task<HttpsResponse> PostAsync(string URL, string PostData = "", string AccessToken = "", string ContentType = "application/json", int timeout = 0);
        Task<string> CallUsingHttpWebRequest_GET(string URL);
        //  Task<string> PostJsonDataUsingHWRTLS(string URL, object PostData, IDictionary<string, string> headers);
        Task<HttpsResponse> CallUsingHttpWebRequest_POSTAsync(string URL, string PostData, string ContentType = "application/x-www-form-urlencoded");
       // Task<string> PostJsonDataUsingHWRTLS(string URL, object PostData);
        string CallUsingHttpWebRequest_POST(string URL, string PostData, IDictionary<string, string> headers = null, string ContentType = "application/x-www-form-urlencoded");
        Task<HttpResponseMessage> SendFileAndContentAsync<TContent>(string apiUrl, TContent contentData, Microsoft.AspNetCore.Http.IFormFile file, Microsoft.AspNetCore.Http.IFormFile file1 = null, string authToken = "");
        Task<string> PostAsyncObject(string URL, object PostData, string AccessToken = "", string ContentType = "application/json", int timeout = 0);
    }
}
