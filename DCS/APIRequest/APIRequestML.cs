using System.Net;
using System.Text;
using Entities;

namespace API.AppCode.WebAPIRequest
{
    public class APIRequestML : IAPIRequest
    {
        public static APIRequestML O { get { return Instance.Value; } }
        private static Lazy<APIRequestML> Instance = new Lazy<APIRequestML>(() => new APIRequestML());
        private APIRequestML() { }
        #region HttpGet
        public async Task<string> CallUsingHttpWebRequest_GET(string URL)
        {
            HttpWebRequest http = (HttpWebRequest)System.Net.WebRequest.Create(URL);
            http.Method = "GET";
            http.ContentType = "application/json";
            http.Timeout = 2 * 60 * 1000;
            http.Headers.Add("User-Agent", UserAgent.Name);
            WebResponse response = http.GetResponse();
            string result = string.Empty;
            try
            {
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    result = sr.ReadToEnd();
                }
            }
            catch (UriFormatException ufx)
            {
                throw new Exception(ufx.Message);
            }
            catch (WebException wx)
            {
                if (wx.Response != null)
                {
                    using (var ErrorResponse = wx.Response)
                    {
                        using (StreamReader sr = new StreamReader(ErrorResponse.GetResponseStream()))
                        {
                            result = sr.ReadToEnd();
                        }
                    }
                }
                else
                {
                    throw new Exception(wx.Message);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

            return result;
        }
        #endregion

        #region HttpPost

        public async Task<HttpResponseMessage> PostAsync(string URL, string PostData = "", string AccessToken = "", string ContentType = "application/json", int timeout = 0)
        {
            using (HttpClient client = new HttpClient())
            {
                if (!string.IsNullOrEmpty(AccessToken))
                {
                    client.DefaultRequestHeaders.Authorization = new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", AccessToken);
                }
                client.DefaultRequestHeaders.UserAgent.ParseAdd(UserAgent.Name);

                HttpResponseMessage httpResponse = new HttpResponseMessage();

                try
                {
                    HttpContent content = new StringContent(PostData ?? "", Encoding.UTF8, ContentType);

                    HttpResponseMessage response = await client.PostAsync(URL, content).ConfigureAwait(false);
                    httpResponse.StatusCode = response.StatusCode;
                    httpResponse.Content = response.Content;
                }
                catch (HttpRequestException ex)
                {
                    throw new Exception("HTTP Request Error: " + ex.Message);
                }
                catch (Exception ex)
                {
                    throw new Exception("Error: " + ex.Message);
                }

                return httpResponse;
            }
        }
    
    #endregion
    
        public async Task<string> CallUsingHttpWebRequest_POSTAsync(string URL, string PostData, string ContentType = "application/x-www-form-urlencoded")
        {
            HttpWebRequest http = (HttpWebRequest)System.Net.WebRequest.Create(URL);
            http.Timeout = 5 * 60 * 1000;
            var data = Encoding.ASCII.GetBytes(PostData);
            http.Method = "POST";
            http.ContentType = ContentType;
            http.ContentLength = data.Length;
            http.Headers.Add("User-Agent", UserAgent.Name);

            try
            {
                using (Stream stream = await http.GetRequestStreamAsync().ConfigureAwait(false))
                {
                    await stream.WriteAsync(data, 0, data.Length).ConfigureAwait(false);
                }

                string result;
                using (WebResponse response = await http.GetResponseAsync().ConfigureAwait(false))
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    result = await sr.ReadToEndAsync().ConfigureAwait(false);
                }

                return result;
            }
            catch (UriFormatException ufx)
            {
                throw new Exception("UriFormatException: " + ufx.Message);
            }
            catch (WebException wx)
            {
                if (wx.Response != null)
                {
                    using (var ErrorResponse = wx.Response)
                    using (StreamReader sr = new StreamReader(ErrorResponse.GetResponseStream()))
                    {
                        return await sr.ReadToEndAsync().ConfigureAwait(false);
                    }
                }
                else
                {
                    throw new Exception("WebException: " + wx.Message);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Unhandled Exception: " + ex.Message);
            }
        }


        public string CallUsingHttpWebRequest_POST(string URL, string PostData, IDictionary<string, string> headers = null, string ContentType = "application/x-www-form-urlencoded")
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;

            var http = (HttpWebRequest)WebRequest.Create(URL);
            var data = Encoding.ASCII.GetBytes(PostData);

            http.Method = "POST";
            http.ContentType = ContentType;
            http.ContentLength = data.Length;
            http.Timeout = 5 * 60 * 1000;
            http.Headers.Add("User-Agent", UserAgent.Name);

            if (headers != null)
            {
                foreach (var item in headers)
                {
                    http.Headers.Add(item.Key, item.Value);
                }
            }

            using (Stream stream = http.GetRequestStream())
            {
                stream.Write(data, 0, data.Length);
            }

            string result = "";

            try
            {
                WebResponse response = http.GetResponse();

                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    result = sr.ReadToEnd();
                }
            }
            catch (WebException wx)
            {
                if (wx.Response != null)
                {
                    using (var ErrorResponse = wx.Response)
                    using (StreamReader sr = new StreamReader(ErrorResponse.GetResponseStream()))
                    {
                        result = sr.ReadToEnd();
                    }
                }
                else
                {
                    throw new Exception("WebException: " + wx.Message);
                }
            }
            catch (Exception ex)
            {
                throw new Exception("Unhandled Exception: " + ex.Message);
            }

            return result;
        }

        public async Task<string> PostMultipartUsingHttpClient(string URL, IDictionary<string, string> customHeaders, MultipartFormDataContent formData)
        {
            string result = string.Empty;
            try
            {
                using (HttpClient httpClient = new HttpClient())
                {
                    foreach (var header in customHeaders)
                    {
                        httpClient.DefaultRequestHeaders.TryAddWithoutValidation(header.Key, header.Value);
                    }

                    HttpResponseMessage response = await httpClient.PostAsync(URL, formData);

                    if (response.IsSuccessStatusCode)
                    {
                        result = await response.Content.ReadAsStringAsync();
                    }
                    else
                    {
                        result = response.StatusCode.ToString();
                    }
                }
            }
            catch (UriFormatException ufx)
            {
                throw new Exception(ufx.Message);
            }
            catch (HttpRequestException hrx)
            {
                if (hrx.InnerException is WebException wx && wx.Response != null)
                {
                    using (var errorResponse = wx.Response)
                    {
                        using (StreamReader sr = new StreamReader(errorResponse.GetResponseStream()))
                        {
                            result = await sr.ReadToEndAsync();
                        }
                    }
                }
                else
                {
                    throw new Exception(hrx.Message);
                }
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            return result;

        }

    }
}
