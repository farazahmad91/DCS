using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using System;
using System.IO;

namespace DCS.Models
{
    public class UploadImage
    {
        private readonly IWebHostEnvironment webHostEnvironment;

        public UploadImage(IWebHostEnvironment webHostEnvironment)
        {
            this.webHostEnvironment = webHostEnvironment;
        }

        public string Image(IFormFile imageFile)
        {
            if (imageFile == null || imageFile.Length == 0)
            {
                return "";
            }

            var uploadsFolder = Path.Combine(webHostEnvironment.WebRootPath, "img");
            Directory.CreateDirectory(uploadsFolder);

            var uniqueFileName = Guid.NewGuid().ToString() + "_" + Path.GetFileName(imageFile.FileName);
            var filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            return "/img/" + uniqueFileName;
        }
    }
}