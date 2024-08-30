namespace API.AppCode.Helper
{
    public class FileUploadService
    {
        private readonly IWebHostEnvironment webHostEnvironment;
        private readonly IHttpContextAccessor httpContextAccessor;

        public FileUploadService(IWebHostEnvironment webHostEnvironment, IHttpContextAccessor httpContextAccessor)
        {
            this.webHostEnvironment = webHostEnvironment;
            this.httpContextAccessor = httpContextAccessor;
        }

        public string Image(IFormFile imageFile, string fileType, string prefix)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return string.Empty;
            }

            var uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, fileType);

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            var request = httpContextAccessor.HttpContext.Request;
            var baseUrl = $"{request.Scheme}://{request.Host}";

            // Return the URL including the base URL
            return $"{baseUrl}/{prefix}{uniqueFileName}";
        }
    }

    public static class FileUploadType
    {
        public const string DoctorPrefix = "DoctorImage/";
        public static readonly string DoctorImage = DoctorPrefix;
        public const string PatientPrefix = "PatientImage/";
        public static readonly string PatientImage = PatientPrefix;
		public const string ProjectPrefix = "ProjectLogo/";
		public static readonly string ProjectImage = ProjectPrefix;
        public const string ServicePrefix = "ServiceImage/";
        public static readonly string ServiceImage = ServicePrefix;
        public const string EmailPrefix = "Email/";
        public static readonly string EmailImage = EmailPrefix;
    }
}
