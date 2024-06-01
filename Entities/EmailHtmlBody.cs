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

        

        public string GenerateHtmlBody(string body)
        {
            string FBlink = _configuration["SocialMedia:FB"];
            string FBIconlink = _configuration["SocialMedia:FBIcon"];
            string XLink = _configuration["SocialMedia:X"];
            string XIconLink = _configuration["SocialMedia:XIcon"];
            string InstaLink = _configuration["SocialMedia:Insta"];
            string InstaIconLink = _configuration["SocialMedia:InstaIcon"];

            string htmlBody = $@"
                <html>
                <body>
                    <p>{body}</p>
                    <p>Follow us on social media:</p>
                    <p>
                        <a href='{FBlink}'>
                            <img src='{FBIconlink}' alt='Facebook' style='width:32px;height:32px;border:0;' />
                        </a> 
                        <a href='{XLink}'>
                            <img src='{XIconLink}' alt='Twitter' style='width:32px;height:32px;border:0;' />
                        </a> 
                        <a href='{InstaLink}'>
                            <img src='{InstaIconLink}' alt='Instagram' style='width:32px;height:32px;border:0;' />
                        </a>
                    </p>
                </body>
                </html>";

            return htmlBody;
        }

        public string GenerateHtmlBodyWithImage(string body)
        {
            string FBlink = _configuration["SocialMedia:FB"];
            string FBIconlink = _configuration["SocialMedia:FBIcon"];
            string XLink = _configuration["SocialMedia:X"];
            string XIconLink = _configuration["SocialMedia:XIcon"];
            string InstaLink = _configuration["SocialMedia:Insta"];
            string InstaIconLink = _configuration["SocialMedia:InstaIcon"];
            string htmlBody = $@"
               
    <style>
        body {{
            font-family: Arial, sans-serif;
            background-color: #f4f4f4;
            margin: 0;
            padding: 0;
        }}

        .email-container {{
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
        }}

        .email-header {{
            text-align: center;
            padding-bottom: 20px;
        }}

        .email-content {{
            padding: 20px;
        }}

        .social-media {{
            text-align: center;
            padding: 20px 0;
        }}

        .social-media a {{
            margin: 0 10px;
            text-decoration: none;
            color: #0073e6;
            font-size: 18px;
        }}

        .social-media a:hover {{
            color: #0056b3;
        }}

        .social-media img {{
            width: 32px;
            height: 32px;
            border: 0;
            margin-right: 10px;
            vertical-align: middle;
        }}

        .email-content p {{
            font-size: 16px;
            line-height: 1.6;
            margin-bottom: 10px;
        }}
    </style>


<body>
    <div class=""email-container"">
        <div class=""email-header"">
            <img src=""cid:EmbeddedImage"" alt=""Company Logo"">
        </div>
  
            {body}
       
        <div class=""social-media"">
            <p>Follow us on social media:</p>
            <a href=""https://www.facebook.com"" target=""_blank""><img src=""https://yourwebsite.com/facebook-icon.png"" alt=""Facebook""></a>
            <a href=""https://www.twitter.com"" target=""_blank""><img src=""https://yourwebsite.com/twitter-icon.png"" alt=""Twitter""></a>
            <a href=""https://www.instagram.com"" target=""_blank""><img src=""https://yourwebsite.com/instagram-icon.png"" alt=""Instagram""></a>
        </div>
    </div>
</body>

</html>

";

            return htmlBody;
        }
    }
}
