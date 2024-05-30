using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Entities
{
    public class EmailHtmlBody
    {
        private readonly IConfiguration _configuration;

        public EmailHtmlBody(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private Dictionary<string, string> SocialMediaLinks()
        {
            return new Dictionary<string, string>
            {
                { "FBUrl", _configuration["SocialMedia:FB"] },
                { "FBIcon", _configuration["SocialMedia:FBIcon"] },
                { "TwitterUrl", _configuration["SocialMedia:X"] },
                { "TwitterIcon", _configuration["SocialMedia:XIcon"] },
                { "InstaUrl", _configuration["SocialMedia:Insta"] },
                { "InstaIcon", _configuration["SocialMedia:InstaIcon"] }
            };
        }

        public string GenerateHtmlBody(string body)
        {
            var links = SocialMediaLinks();

            string htmlBody = $@"
                <html>
                <body>
                    <p>{body}</p>
                    <p>Follow us on social media:</p>
                    <p>
                        <a href='{links["FBUrl"]}'>
                            <img src='{links["FBIcon"]}' alt='Facebook' style='width:32px;height:32px;border:0;' />
                        </a> 
                        <a href='{links["TwitterUrl"]}'>
                            <img src='{links["TwitterIcon"]}' alt='Twitter' style='width:32px;height:32px;border:0;' />
                        </a> 
                        <a href='{links["InstaUrl"]}'>
                            <img src='{links["InstaIcon"]}' alt='Instagram' style='width:32px;height:32px;border:0;' />
                        </a>
                    </p>
                </body>
                </html>";

            return htmlBody;
        }

        public string GenerateHtmlBodyWithImage(string body)
        {
            var links = SocialMediaLinks();

            string htmlBody = $@"
                <html>
                <body>
                    <p>
                        <img src='cid:EmbeddedImage' alt='Image' />
                    </p>
                    <p>{body}</p>
                    <p>Follow us on social media:</p>
                    <p>
                        <a href='{links["FBUrl"]}'>
                            <img src='{links["FBIcon"]}' alt='Facebook' style='width:32px;height:32px;border:0;' />
                        </a> 
                        <a href='{links["TwitterUrl"]}'>
                            <img src='{links["TwitterIcon"]}' alt='Twitter' style='width:32px;height:32px;border:0;' />
                        </a> 
                        <a href='{links["InstaUrl"]}'>
                            <img src='{links["InstaIcon"]}' alt='Instagram' style='width:32px;height:32px;border:0;' />
                        </a>
                    </p>
                </body>
                </html>";

            return htmlBody;
        }
    }
}
