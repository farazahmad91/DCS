namespace API.AppCode.Utility
{
    public class FileDirectories
    {
        public const string DictionaryPrefix = "images/";
        public static string DictionaryImage = Path.Combine(Directory.GetCurrentDirectory(), $"wwwroot/{DictionaryPrefix}");
    }
}
