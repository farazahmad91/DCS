using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public class Common
    {
        public int? Id { get; set; } = 0;
        public int? ProjectId { get; set; } = 0;
        public string? name { get; set; } = string.Empty;
        public string? email { get; set; } = string.Empty;
        public int? PageLength { get; set; } = 10;
    }
}
