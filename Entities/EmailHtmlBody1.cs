using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;

namespace Entities
{
    public class EmailHtmlBody1
    {
        private readonly IConfiguration _configuration;
        
        public EmailHtmlBody1(IConfiguration configuration)
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
               <!DOCTYPE html     PUBLIC \""-//W3C//DTD XHTML 1.0 Transitional//EN\"" \""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\""> <html dir=\""ltr\"" xmlns=\""http://www.w3.org/1999/xhtml\"" xmlns:o=\""urn:schemas-microsoft-com:office:office\"">  <head>     <meta charset=\""UTF-8\"">     <meta content=\""width=device-width, initial-scale=1\"" name=\""viewport\"">     <meta name=\""x-apple-disable-message-reformatting\"">     <meta http-equiv=\""X-UA-Compatible\"" content=\""IE=edge\"">     <meta content=\""telephone=no\"" name=\""format-detection\"">     <title></title>     <!--[if (mso 16)]>     <style type=\""text/css\"">     a {{text-decoration: none;}}     </style>     <![endif]-->     <!--[if gte mso 9]><style>sup {{ font-size: 100% !important; }}</style><![endif]-->     <!--[if gte mso 9]> <xml>     <o:OfficeDocumentSettings>     <o:AllowPNG></o:AllowPNG>     <o:PixelsPerInch>96</o:PixelsPerInch>     </o:OfficeDocumentSettings> </xml> <![endif]-->     <!--[if !mso]><!-- -->     <link href=\""https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap\"" rel=\""stylesheet\"">     <link href=\""https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap\"" rel=\""stylesheet\"">     <!--<![endif]-->     <style>         $font-title: 'Open Sans';          @import url('https://fonts.googleapis.com/css?family=Open+Sans');          * {{             box-sizing: border-box;         }}          body {{             background-color: #fafafa;             display: flex;             justify-content: center;             align-items: center;         }}          .c-email {{             width: 40vw;             border-radius: 40px;             overflow: hidden;             box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, .1);              &__header {{                 background-color: #0fd59f;                 width: 100%;                 height: 60px;                  &__title {{                     font-size: 23px;                     font-family: $font-title;                     height: 60px;                     line-height: 60px;                     margin: 0;                     text-align: center;                     color: white;                 }}             }}              &__content {{                 width: 100%;                 height: 300px;                 display: flex;                 flex-direction: column;                 justify-content: space-around;                 align-items: center;                 flex-wrap: wrap;                 background-color: #fff;                 padding: 15px;                  &__text {{                     font-size: 20px;                     text-align: center;                     color: #343434;                     margin-top: 0;                 }}             }}              &__code {{                 display: block;                 width: 60%;                 margin: 30px auto;                 background-color: #ddd;                 border-radius: 40px;                 padding: 20px;                 text-align: center;                 font-size: 36px;                 font-family: $font-title;                 letter-spacing: 10px;                 box-shadow: 0px 7px 22px 0px rgba(0, 0, 0, .1);             }}              &__footer {{                 width: 100%;                 height: 60px;                 background-color: #fff;             }}         }}          .text-title {{             font-family: $font-title;         }}          .text-center {{             text-align: center;         }}          .text-italic {{             font-style: italic;         }}          .opacity-30 {{             opacity: 0.3;         }}          .mb-0 {{             margin-bottom: 0;         }}     </style> </head>  <body>     <div class=\""c-email\"">         <div class=\""c-email__header\"">             <h1 class=\""c-email__header__title\"">Your Verification Code</h1>         </div>         <div class=\""c-email__content\"">             <p class=\""c-email__content__text text-title\"">                 Enter this verification code in field:             </p>             <div class=\""c-email__code\"">                 <span class=\""c-email__code__text\"">352787</span>             </div>             <p class=\""c-email__content__text text-italic opacity-30 text-title mb-0\"">Verification code is valid only for                 30 minutes</p>         </div>         <div class=\""c-email__footer\""></div>     </div> </body>  </html>";

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
            string htmlBody = "";

            return htmlBody;
        }
    }
}
