namespace Entities.Response
{
    public class ErrorLog
    {
            public int StatusCode { get; set; }
            public string? ResponseText { get; set; }
            public string? ClassName { get; set; }
            public string? FunctionName { get; set; }
            public string? Proc_Name { get; set; }

    }
}
