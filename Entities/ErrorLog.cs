using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class ErrorLog
    {
        public string ClassName { get; set; }
        public string FuncName { get; set; }
        public string ProcName { get; set; }
        public string Error { get; set; }
    }
}
