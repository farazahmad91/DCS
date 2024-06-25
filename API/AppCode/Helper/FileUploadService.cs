using API.RequestInfo;
using Entities.Response;
using Microsoft.AspNetCore.Http;
using Microsoft.VisualBasic.FileIO;
using System.ComponentModel.DataAnnotations;
using System.Net.Http.Headers;
using System.Text;

namespace API.AppCode.Helper
{
    public class FileUploadService
    {
        public static FileUploadService O => instance.Value;
        private static Lazy<FileUploadService> instance = new Lazy<FileUploadService>(() => new FileUploadService());

        public Response UploadFile(FileUploadModel request)
        {
            var response = new Response
            {
                StatusCode = ResponseStatus.FAILED,
                ResponseText = "An error han occurred try after sometime."
            };
            if (response.StatusCode == ResponseStatus.SUCCESS)
            {
                try
                {
                    StringBuilder sb = new StringBuilder();
                    sb.Append(request.FilePath);
                    if (!Directory.Exists(sb.ToString()))
                    {
                        Directory.CreateDirectory(sb.ToString());
                    }
                    var filename = ContentDispositionHeaderValue.Parse(request.file.ContentDisposition).FileName.Trim('"');
                    string originalExt = Path.GetExtension(filename).ToLower();
                    if (request.formates != null)
                    {
                        if (request.formates.Count() > 0)
                        {
                            if (!request.formates.Any(x => x.ToUpper().Contains(originalExt.ToUpper())))
                            {
                                response.StatusCode = ResponseStatus.FAILED;
                                response.ResponseText = "Invalid File Formate!";
                                return response;
                            }
                        }
                    }
                    string[] Extensions = { ".png", ".jpeg", ".jpg" };
                    if (Extensions.Contains(originalExt))
                    {
                    }
                    string originalFileName = Path.GetFileNameWithoutExtension(filename).ToLower() + originalExt;

                    if (string.IsNullOrEmpty(Path.GetExtension(request.FileName)))
                    {
                        request.FileName = string.Concat(request.FileName, originalExt);
                    }
                    request.FileName = string.IsNullOrEmpty(request.FileName) ? originalFileName.Trim() : request.FileName;
                    sb.Append(request.FileName);
                    using (FileStream fs = File.Create(sb.ToString()))
                    {
                        request.file.CopyTo(fs);
                        fs.Flush();
                    }
                    response.StatusCode = ResponseStatus.SUCCESS;
                    response.ResponseText = "File uploaded successfully";
                    response.Filename = request.FileName;
                }
                catch (Exception ex)
                {
                    response.ResponseText = "Error in file uploading. Try after sometime...";
                }
            }
            return response;
        }
    }
    public class FileUploadModel
    {
        public IFormFile file { get; set; }
        public string FileName { get; set; }
        public string FilePath { get; set; }
        public List<string> formates { get; set; }
    }
}
