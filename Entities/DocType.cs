using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Entities
{
    public static class DOCType
    {
        public const string DictionaryPrefix = "images/";
        public static string DictionaryImage = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{DictionaryPrefix}");
    }
}
