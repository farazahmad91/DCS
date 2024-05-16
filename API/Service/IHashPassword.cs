namespace API.Service
{
    public interface IHashPassword
    {
        public string EncodePasswordToBase64(string clearText);
        public string DecodeFrom64(string cipherText);
    }
}
