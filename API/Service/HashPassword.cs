using API.AppCode.IML;
using API.AppCode.ML;
using API.SendEmail;
using Entities.Response;
using System.Net.Mail;
using System.Security.Cryptography;
using System.Text;

namespace API.Service
{
    public class HashPassword : IHashPassword
    {
        private readonly IConfiguration _configuration;
        private readonly Sendmail _sendmail;
        private readonly IDapper _dapper;
        public HashPassword(IConfiguration configuration, Sendmail sendmail, IDapper dapper)
        {
            _configuration = configuration;
            _sendmail=sendmail;
            _dapper=dapper;
        }
        public string EncryptionKey { get; set; }
        public string EncodePasswordToBase64(string clearText)
        {
            string encryptionKey = _configuration["HashPassword:EncryptionKey"];
            byte[] clearBytes = Encoding.Unicode.GetBytes(clearText);

            try
            {
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(encryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);

                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateEncryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(clearBytes, 0, clearBytes.Length);
                            cs.Close();
                        }
                        clearText = Convert.ToBase64String(ms.ToArray());
                    }
                }
            }
            catch (Exception ex)
            {
                var response = new Response<bool>
                {
                   Result = false,
                };
                string responseMessage = $"Error: {response.Result}";
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "EncodePasswordToBase64",
                    Error = ex.Message,
                    ProcName = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return Convert.ToBase64String(Encoding.UTF8.GetBytes(responseMessage));
            }

            return clearText;
        }
        public string DecodeFrom64(string cipherText)
        {
            string encryptionKey = _configuration["HashPassword:EncryptionKey"];

            byte[] cipherBytes = Convert.FromBase64String(cipherText);

            try
            {
                using (Aes encryptor = Aes.Create())
                {
                    Rfc2898DeriveBytes pdb = new Rfc2898DeriveBytes(encryptionKey, new byte[] { 0x49, 0x76, 0x61, 0x6e, 0x20, 0x4d, 0x65, 0x64, 0x76, 0x65, 0x64, 0x65, 0x76 });
                    encryptor.Key = pdb.GetBytes(32);
                    encryptor.IV = pdb.GetBytes(16);
                    using (MemoryStream ms = new MemoryStream())
                    {
                        using (CryptoStream cs = new CryptoStream(ms, encryptor.CreateDecryptor(), CryptoStreamMode.Write))
                        {
                            cs.Write(cipherBytes, 0, cipherBytes.Length);
                            cs.Close();
                        }
                        cipherText = Encoding.Unicode.GetString(ms.ToArray());
                    }
                }
            }
            catch (Exception ex)
            {
                var response = new Response<bool>
                {
                    Result = false,
                };
                string responseMessage = $"Error: {response.Result}";
                var error = new Entities.ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "DecodeFrom64",
                    Error = ex.Message,
                    ProcName = "",
                };
                var _ = new ErrorLog_ML(_dapper).Error(error);
                return Convert.ToBase64String(Encoding.UTF8.GetBytes(responseMessage));
            }

            return cipherText;
        }

        private bool IsBase64String(string base64)
        {
            Span<byte> buffer = new Span<byte>(new byte[base64.Length]);
            return Convert.TryFromBase64String(base64, buffer, out _);
        }
    }
    }


