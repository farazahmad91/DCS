namespace API.RequestInfo
{
    public class RequestInfo : IRequestInfo
    {
        private readonly IHttpContextAccessor _accessor;
        public RequestInfo(IHttpContextAccessor httpContext)
        {
            _accessor = httpContext;
        }
        public string GetDomain()
        {
            var domain = $"{_accessor.HttpContext.Request.Scheme}://{_accessor.HttpContext.Request.Host.Host}";
            if (_accessor.HttpContext.Request.Host.Port>0)
            {
                domain = $"{domain}:{_accessor.HttpContext.Request.Host.Port}";
            }
            return domain;
        }
    }
}
