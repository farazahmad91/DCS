namespace API.RequestInfo
{
    public interface IRequestInfo
    {
        string GetRemoteIP();
        string GetLocalIP();
        string GetBrowser();
        string GetBrowserVersion();
        string GetUserAgent();
        string GetBrowserFullInfo();
        string GetDomain(IConfiguration Configuration);
        CurrentRequestInfo GetCurrentReqInfo();
    }
}
