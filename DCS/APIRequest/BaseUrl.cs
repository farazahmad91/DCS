namespace DCS.APIRequest
{
	public class BaseUrl: IBaseUrl
	{  
		private readonly IWebHostEnvironment _webHostEnvironment;
		public BaseUrl(IWebHostEnvironment webHostEnvironment)
        {
			_webHostEnvironment = webHostEnvironment;

		}
		public string GetBaseUrl()
		{
			string baseUrl = "";
			if (_webHostEnvironment.IsDevelopment())
			{
				baseUrl = "https://localhost:7079";
			}
			else
			{
				baseUrl = "http://dcsapi.runasp.net";
			}
			return baseUrl;
		}
    }
}
