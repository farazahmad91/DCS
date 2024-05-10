using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
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
