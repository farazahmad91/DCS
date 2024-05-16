﻿using System.Net;
using System.Net.Mime;
using System.Text;
using API.DBContext.Response;
using Entities;
using Newtonsoft.Json;

namespace API.AppCode.APIRequest
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

        public async Task<HttpsResponse> PostAsync(string URL, string PostData = "", string AccessToken = "", string ContentType = "application/json", int timeout = 0)
        {
            HttpsResponse httpResponse = new HttpsResponse();
            HttpWebRequest http = (HttpWebRequest)WebRequest.Create(URL);
            if (!string.IsNullOrEmpty(AccessToken))
            {
                http.Headers.Add("Authorization", "Bearer " + AccessToken);
            }
            http.Headers.Add("User-Agent", UserAgent.Name);
            http.Timeout = timeout == 0 ? 5 * 60 * 1000 : timeout;
            var data = Encoding.ASCII.GetBytes(PostData ?? "");
            http.Method = "POST";
            http.ContentType = ContentType;
            http.ContentLength = data.Length;
            using (Stream stream = await http.GetRequestStreamAsync().ConfigureAwait(false))
            {
                await stream.WriteAsync(data, 0, data.Length).ConfigureAwait(false);
            }
            try
            {
                WebResponse response = await http.GetResponseAsync().ConfigureAwait(false);
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    httpResponse.HttpStatusCode = HttpStatusCode.OK;
                    httpResponse.Result = await sr.ReadToEndAsync().ConfigureAwait(false);
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

                            httpResponse.Result = await sr.ReadToEndAsync().ConfigureAwait(false);
                            httpResponse.HttpMessage = wx.Message;
                            httpResponse.HttpStatusCode = ((HttpWebResponse)wx.Response).StatusCode;
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
            return httpResponse;
        }
        #endregion
        //public async Task<string> PostJsonDataUsingHWRTLS(string URL, object PostData, IDictionary<string, string> headers)
        //{
        //    string result = "";
        //    try
        //    {
        //        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //        HttpWebRequest http = (HttpWebRequest)System.Net.WebRequest.Create(URL);
        //        http.Timeout = 3 * 60 * 1000;
        //        var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(PostData));
        //        http.Method = "POST";
        //        http.Accept = ContentType.application_json;
        //        http.ContentType = ContentType.application_json;
        //        http.MediaType = ContentType.application_json;
        //        http.ContentLength = data.Length;
        //        http.Headers.Add("User-Agent", UserAgent.Name);
        //        if (headers != null)
        //        {
        //            foreach (var item in headers)
        //            {
        //                http.Headers.Add(item.Key, item.Value);
        //            }
        //        }
        //        using (Stream stream = http.GetRequestStream())
        //        {
        //            stream.Write(data, 0, data.Length);
        //        }
        //        WebResponse response = await http.GetResponseAsync().ConfigureAwait(false);

        //        using (StreamReader sr = new StreamReader(response.GetResponseStream()))
        //        {
        //            result = await sr.ReadToEndAsync().ConfigureAwait(false);
        //        }
        //    }
        //    catch (UriFormatException ufx)
        //    {
        //        throw new Exception(ufx.Message);
        //    }
        //    catch (WebException wx)
        //    {
        //        if (wx.Response != null)
        //        {
        //            using (var ErrorResponse = wx.Response)
        //            {
        //                using (StreamReader sr = new StreamReader(ErrorResponse.GetResponseStream()))
        //                {
        //                    result = await sr.ReadToEndAsync();
        //                }
        //            }
        //        }
        //        else
        //        {
        //            throw new Exception(wx.Message);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    return result;
        //}
        public async Task<string> CallUsingHttpWebRequest_POSTAsync(string URL, string PostData, string ContentType = "application/x-www-form-urlencoded")
        {
            HttpWebRequest http = (HttpWebRequest)System.Net.WebRequest.Create(URL);
            http.Timeout = 5 * 60 * 1000;
            var data = Encoding.ASCII.GetBytes(PostData);
            http.Method = "POST";
            http.ContentType = ContentType;
            http.ContentLength = data.Length;
            http.Headers.Add("User-Agent", UserAgent.Name);
            using (Stream stream = await http.GetRequestStreamAsync().ConfigureAwait(false))
            {
                await stream.WriteAsync(data, 0, data.Length).ConfigureAwait(false);
            }
            string result = "";
            try
            {
                WebResponse response = await http.GetResponseAsync().ConfigureAwait(false);
                using (StreamReader sr = new StreamReader(response.GetResponseStream()))
                {
                    result = await sr.ReadToEndAsync().ConfigureAwait(false);
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
                            result = await sr.ReadToEndAsync().ConfigureAwait(false);
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
        //public async Task<string> PostJsonDataUsingHWRTLS(string URL, object PostData)
        //{
        //    string result = "";
        //    try
        //    {
        //        ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
        //        HttpWebRequest http = (HttpWebRequest)System.Net.WebRequest.Create(URL);
        //        var data = Encoding.UTF8.GetBytes(JsonConvert.SerializeObject(PostData, Newtonsoft.Json.Formatting.Indented));
        //        http.Method = "POST";
        //        http.Accept = ContentType.application_json;
        //        http.ContentType = ContentType.application_json;
        //        http.ContentLength = data.Length;
        //        http.Headers.Add("User-Agent", UserAgent.Name);
        //        using (Stream stream = http.GetRequestStream())
        //        {
        //            stream.Write(data, 0, data.Length);
        //        }
        //        WebResponse response = await http.GetResponseAsync().ConfigureAwait(false);

        //        using (StreamReader sr = new StreamReader(response.GetResponseStream()))
        //        {
        //            result = await sr.ReadToEndAsync().ConfigureAwait(false);
        //        }
        //    }
        //    catch (UriFormatException ufx)
        //    {
        //        throw new Exception(ufx.Message);
        //    }
        //    catch (WebException wx)
        //    {
        //        if (wx.Response != null)
        //        {
        //            using (var ErrorResponse = wx.Response)
        //            {
        //                using (StreamReader sr = new StreamReader(ErrorResponse.GetResponseStream()))
        //                {
        //                    result = await sr.ReadToEndAsync();
        //                }
        //            }
        //        }
        //        else
        //        {
        //            throw new Exception(wx.Message);
        //        }
        //    }
        //    catch (Exception ex)
        //    {
        //        throw new Exception(ex.Message);
        //    }
        //    return result;
        //}
        public string CallUsingHttpWebRequest_POST(string URL, string PostData, IDictionary<string, string> headers = null, string ContentType = "application/x-www-form-urlencoded")
        {
            ServicePointManager.SecurityProtocol = SecurityProtocolType.Tls12;
            var http = (HttpWebRequest)System.Net.WebRequest.Create(URL);
            var data = Encoding.ASCII.GetBytes(PostData);
            http.Method = HttpMethod.Post.ToString();
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
            catch (Exception EX)
            {
                throw new Exception(EX.Message);
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
