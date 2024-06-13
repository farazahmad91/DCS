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
               
    
<!DOCTYPE html PUBLIC ""-//W3C//DTD XHTML 1.0 Transitional//EN"" ""http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd"">
<html dir=""ltr"" xmlns=""http://www.w3.org/1999/xhtml"" xmlns:o=""urn:schemas-microsoft-com:office:office"">

<head>
    <meta charset=""UTF-8"">
    <meta content=""width=device-width, initial-scale=1"" name=""viewport"">
    <meta name=""x-apple-disable-message-reformatting"">
    <meta http-equiv=""X-UA-Compatible"" content=""IE=edge"">
    <meta content=""telephone=no"" name=""format-detection"">
    <title></title>
    <!--[if (mso 16)]>
    <style type=""text/css"">
    a {{text-decoration: none;}}
    </style>
    <![endif]-->
    <!--[if gte mso 9]><style>sup {{ font-size: 100% !important; }}</style><![endif]-->
    <!--[if gte mso 9]>
<xml>
    <o:OfficeDocumentSettings>
    <o:AllowPNG></o:AllowPNG>
    <o:PixelsPerInch>96</o:PixelsPerInch>
    </o:OfficeDocumentSettings>
</xml>
<![endif]-->
    <!--[if !mso]><!-- -->
    <link href=""https://fonts.googleapis.com/css2?family=Indie+Flower&display=swap"" rel=""stylesheet"">
    <link href=""https://fonts.googleapis.com/css2?family=Montserrat:wght@400;700&display=swap"" rel=""stylesheet"">
    <!--<![endif]-->
</head>

<body>
    <div dir=""ltr"" class=""es-wrapper-color"">
        <!--[if gte mso 9]>
			<v:background xmlns:v=""urn:schemas-microsoft-com:vml"" fill=""t"">
				<v:fill type=""tile"" color=""#FBEAE2""></v:fill>
			</v:background>
		<![endif]-->
        <table class=""es-wrapper"" width=""100%"" cellspacing=""0"" cellpadding=""0"">
            <tbody>
                <tr>
                    <td class=""esd-email-paddings"" valign=""top"">
                        <table cellpadding=""0"" cellspacing=""0"" class=""esd-header-popover es-header"" align=""center"">
                            <tbody>
                                <tr>
                                    <td class=""esd-stripe"" align=""center"">
                                        <table bgcolor=""#ffffff"" class=""es-header-body"" align=""center"" cellpadding=""0"" cellspacing=""0"" width=""600"">
                                            <tbody>
                                                <tr>
                                                    <td class=""esd-structure es-p20"" align=""left"">
                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""560"" class=""es-m-p0r esd-container-frame"" valign=""top"" align=""center"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <h3>Pauline &&nbsp;Tyler</h3>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding=""0"" cellspacing=""0"" class=""es-content"" align=""center"">
                            <tbody>
                                <tr>
                                    <td class=""esd-stripe"" align=""center"" background=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/jonathanborba2iim1rmju8unsplash_1.jpeg"" style=""background-image: url(https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/jonathanborba2iim1rmju8unsplash_1.jpeg); background-repeat: no-repeat; background-position: center top;"">
                                        <table class=""es-content-body"" align=""center"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""background-color: transparent;"">
                                            <tbody>
                                                <tr>
                                                    <td class=""es-p40t es-p30b es-p40r es-p30l esd-structure"" align=""left"">
                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""530"" class=""esd-container-frame"" align=""center"" valign=""top"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer"" height=""340""></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width=""530"" class=""esd-container-frame"" align=""center"" valign=""top"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"" background=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/rectangle_44_X4X.png"" style=""border-left:1px solid #F4CBB9;border-right:1px solid #F4CBB9;border-top:1px solid #F4CBB9;border-bottom:1px solid #F4CBB9;background-image: url(https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/rectangle_44_X4X.png); background-repeat: no-repeat; background-position: left top;"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p10t es-p10b"">
                                                                                        <h1>Pauline & Tyler</h1>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p10t es-p10b"">
                                                                                        <h3 style=""font-size: 30px; font-family: montserrat, helvetica, arial, sans-serif;"">Are Getting Married</h3>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                                <tr>
                                                                    <td width=""530"" class=""esd-container-frame"" align=""center"" valign=""top"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-button es-p20t es-m-p40b""><span class=""es-button-border""><a href=""https://viewstripo.email"" class=""es-button"" target=""_blank"">RSVP</a></span></td>
                                                                                </tr>
                                                                                <tr class=""es-mobile-hidden"">
                                                                                    <td align=""center"" class=""esd-block-spacer"" height=""179""></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding=""0"" cellspacing=""0"" class=""es-content"" align=""center"">
                            <tbody>
                                <tr>
                                    <td class=""esd-stripe"" align=""center"">
                                        <table class=""es-content-body"" align=""center"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""background-color: transparent;"">
                                            <tbody>
                                                <tr>
                                                    <td class=""esd-structure es-p20t es-p20b es-p40r es-p30l"" align=""left"">
                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""530"" class=""esd-container-frame"" align=""center"" valign=""top"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer"" height=""0""></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table class=""es-content"" cellspacing=""0"" cellpadding=""0"" align=""center"">
                            <tbody>
                                <tr>
                                    <td class=""esd-stripe"" align=""center"">
                                        <table class=""es-content-body"" style=""border-left:1px solid #F4CBB9;border-right:1px solid #F4CBB9;border-top:1px solid #F4CBB9;background-color: #ffffff;"" width=""600"" cellspacing=""0"" cellpadding=""0"" bgcolor=""#ffffff"" align=""center"">
                                            <tbody>
                                                <tr>
                                                    <td class=""esd-structure es-p40"" align=""left"" background=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/mask_group.png"" style=""background-image: url(https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/mask_group.png); background-repeat: no-repeat; background-position: center top;"">
                                                        <!--[if mso]><table width=""518"" cellpadding=""0"" cellspacing=""0""><tr><td width=""180"" valign=""top""><![endif]-->
                                                        <table cellspacing=""0"" cellpadding=""0"" align=""left"" class=""es-left"">
                                                            <tbody>
                                                                <tr>
                                                                    <td class=""es-m-p0r es-m-p20b esd-container-frame"" width=""160"" valign=""top"" align=""center"">
                                                                        <table width=""100%"" cellspacing=""0"" cellpadding=""0"">
                                                                            <tbody>
                                                                                <tr class=""es-mobile-hidden"">
                                                                                    <td align=""center"" class=""esd-block-spacer"" height=""55""></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p20t es-p10b es-p20r es-p20l"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <h2>Pauline</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <p style=""font-size: 18px;"">Butler</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p10t es-p20b es-p20r es-p20l"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class=""es-hidden"" width=""20""></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width=""159"" valign=""top""><![endif]-->
                                                        <table cellpadding=""0"" cellspacing=""0"" class=""es-left"" align=""left"">
                                                            <tbody>
                                                                <tr>
                                                                    <td class=""es-m-p0r es-m-p20b esd-container-frame"" width=""159"" valign=""top"" align=""center"">
                                                                        <table width=""100%"" cellspacing=""0"" cellpadding=""0"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <p>#paulineandtyler</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-image es-p20t"" style=""font-size: 0px;""><a target=""_blank"" href=""https://viewstripo.email""><img src=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/mask_group_dNR.png"" alt style=""display: block;"" width=""159""></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width=""20""></td><td width=""159"" valign=""top""><![endif]-->
                                                        <table cellpadding=""0"" cellspacing=""0"" class=""es-right"" align=""right"">
                                                            <tbody>
                                                                <tr>
                                                                    <td class=""es-m-p0r esd-container-frame"" width=""159"" valign=""top"" align=""center"">
                                                                        <table width=""100%"" cellspacing=""0"" cellpadding=""0"">
                                                                            <tbody>
                                                                                <tr class=""es-mobile-hidden"">
                                                                                    <td align=""center"" class=""esd-block-spacer"" height=""55""></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p20t es-p10b es-p20r es-p20l"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <h2>Tyler</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <p style=""font-size: 18px;"">Quinn</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p10t es-p20b es-p20r es-p20l"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class=""esd-structure es-p40t es-p30b es-p40r es-p40l"" align=""left"">
                                                        <!--[if mso]><table width=""518"" cellpadding=""0"" cellspacing=""0""><tr><td width=""228"" valign=""top""><![endif]-->
                                                        <table cellpadding=""0"" cellspacing=""0"" class=""es-left"" align=""left"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""208"" class=""es-m-p0r es-m-p20b esd-container-frame"" align=""center"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p20t es-p10b es-p20r es-p20l es-m-p0t"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <p>• April&nbsp;•</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p10t es-p20b es-p20r es-p20l es-m-p0b"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                    <td class=""es-hidden"" width=""20""></td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width=""58"" valign=""top""><![endif]-->
                                                        <table cellpadding=""0"" cellspacing=""0"" class=""es-left"" align=""left"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""58"" class=""es-m-p20b esd-container-frame"" align=""center"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <h1>10</h1>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width=""20""></td><td width=""212"" valign=""top""><![endif]-->
                                                        <table cellpadding=""0"" cellspacing=""0"" class=""es-right"" align=""right"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""212"" class=""es-m-p0r esd-container-frame"" align=""center"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p20t es-p10b es-p20r es-p20l es-m-p0t"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <p>• 2023&nbsp;•</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p10t es-p20b es-p20r es-p20l es-m-p0b"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class=""esd-structure es-p40"" align=""left"">
                                                        <table width=""100%"" cellspacing=""0"" cellpadding=""0"">
                                                            <tbody>
                                                                <tr>
                                                                    <td class=""es-m-p0r es-m-p20b esd-container-frame"" width=""518"" valign=""top"" align=""center"">
                                                                        <table width=""100%"" cellspacing=""0"" cellpadding=""0"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-image es-p10b"" style=""font-size: 0px;""><a target=""_blank"" href=""https://viewstripo.email""><img src=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/group_130.png"" alt style=""display: block;"" width=""30""></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <p>2952 Crystal Zephyr Square, <br>Bitter Lick, Iowa</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-button es-p20t""><span class=""es-button-border""><a href=""https://viewstripo.email"" class=""es-button"" target=""_blank"">RSVP</a></span></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding=""0"" cellspacing=""0"" class=""es-content"" align=""center"">
                            <tbody>
                                <tr>
                                    <td class=""esd-stripe"" align=""center"">
                                        <table bgcolor=""#ffffff"" class=""es-content-body"" align=""center"" cellpadding=""0"" cellspacing=""0"" width=""600"" style=""border-left:1px solid #f4cbb9;border-right:1px solid #f4cbb9;border-bottom:1px solid #F4CBB9;"">
                                            <tbody>
                                                <tr>
                                                    <td class=""esd-structure es-p40"" align=""left"">
                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""518"" class=""esd-container-frame"" align=""center"" valign=""top"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p10t es-p40b es-p20r es-p20l"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <h2>How we met</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p10t es-p10b"">
                                                                                        <p style=""font-size: 12px;"">September&nbsp; • 29th&nbsp;• 2019</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p20t es-p40r es-p40l es-m-p0r es-m-p0l"">
                                                                                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class=""esd-structure es-p40b es-p40r es-p40l"" align=""left"">
                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""518"" class=""esd-container-frame"" align=""center"" valign=""top"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p10t es-p40b es-p20r es-p20l"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"">
                                                                                        <h2>The proposal<br></h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p10t es-p10b"">
                                                                                        <p style=""font-size: 12px;"">September&nbsp; • 29th&nbsp;• 2019</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p20t es-p40r es-p40l es-m-p0r es-m-p0l"">
                                                                                        <p>Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non.</p>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-spacer es-p40t es-p20b es-p20r es-p20l"" style=""font-size:0"">
                                                                                        <table border=""0"" width=""100%"" height=""100%"" cellpadding=""0"" cellspacing=""0"">
                                                                                            <tbody>
                                                                                                <tr>
                                                                                                    <td style=""border-bottom: 1px solid #f4cbb9; background: unset; height: 1px; width: 100%; margin: 0px;""></td>
                                                                                                </tr>
                                                                                            </tbody>
                                                                                        </table>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p40t es-p10b"">
                                                                                        <h2>Waiting for you</h2>
                                                                                    </td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-timer es-p10t es-p20b"" esdev-config=""h1""><a target=""_blank"" href=""https://viewstripo.email""><img class=""adapt-img"" alt src=""https://cdt-timer.stripocdn.email/api/v1/images/FYM5BOBgX-UDUoCDyFvm2nL40OYlwaJbuYplLjFSjfg"" width=""518""></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text es-p10t es-p10b"">
                                                                                        <p style=""font-size: 12px;"">Please RSVP by August 20th 2023</p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td class=""esd-structure es-p40"" align=""left"" background=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/mask_group_Jko.png"" style=""background-image: url(https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/mask_group_Jko.png); background-repeat: no-repeat; background-position: center bottom;"">
                                                        <!--[if mso]><table width=""518"" cellpadding=""0"" cellspacing=""0""><tr><td width=""256"" valign=""top""><![endif]-->
                                                        <table cellpadding=""0"" cellspacing=""0"" class=""es-left"" align=""left"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""256"" class=""es-m-p20b esd-container-frame"" align=""center"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-image"" style=""font-size: 0px;""><a target=""_blank"" href=""https://viewstripo.email""><img class=""adapt-img"" src=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/jonathanborbaymokpm25y14unsplash.jpg"" alt style=""display: block;"" width=""256""></a></td>
                                                                                </tr>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-image es-p20t"" style=""font-size: 0px;""><a target=""_blank"" href=""https://viewstripo.email""><img class=""adapt-img"" src=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/jonathanborbani3cibemgckunsplash.jpg"" alt style=""display: block;"" width=""256""></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td><td width=""20""></td><td width=""242"" valign=""top""><![endif]-->
                                                        <table cellpadding=""0"" cellspacing=""0"" class=""es-right"" align=""right"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""242"" class=""esd-container-frame"" align=""center"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-image"" style=""font-size: 0px;""><a target=""_blank"" href=""https://viewstripo.email""><img class=""adapt-img"" src=""https://tlr.stripocdn.email/content/guids/CABINET_3c616dc5e0465fef7cdda45e7e52d6ed/images/jonathanborbaujzzswothesunsplash.jpg"" alt style=""display: block;"" width=""242""></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                        <!--[if mso]></td></tr></table><![endif]-->
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding=""0"" cellspacing=""0"" class=""es-footer"" align=""center"">
                            <tbody>
                                <tr>
                                    <td class=""esd-stripe"" align=""center"">
                                        <table bgcolor=""#ffffff"" class=""es-footer-body"" align=""center"" cellpadding=""0"" cellspacing=""0"" width=""600"">
                                            <tbody>
                                                <tr>
                                                    <td class=""esd-structure es-p20t es-p20b es-p20r es-p20l"" align=""left"">
                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""560"" align=""left"" class=""esd-container-frame"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-text"" esd-links-underline=""none"">
                                                                                        <p>For more details about the wedding and accommodations please visit our wedding website at</p>
                                                                                        <p><br></p>
                                                                                        <h3><strong><a href=""https://viewstripo.email/"" target=""_blank"" style=""text-decoration: none;"">www.paulineandtyler.com</a>.</strong><br><br></h3>
                                                                                        <p>To stop receiving communications from us, click<a href=""https://viewstripo.email/"" target=""_blank"" style=""text-decoration: none;""><u>here.</u></a></p>
                                                                                    </td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <table cellpadding=""0"" cellspacing=""0"" class=""esd-footer-popover es-footer"" align=""center"">
                            <tbody>
                                <tr>
                                    <td class=""esd-stripe"" align=""center"">
                                        <table bgcolor=""rgba(0, 0, 0, 0)"" class=""es-footer-body"" align=""center"" cellpadding=""0"" cellspacing=""0"" width=""600"">
                                            <tbody>
                                                <tr>
                                                    <td class=""es-p40t es-p30b es-p40r es-p40l esd-structure"" align=""left"">
                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                            <tbody>
                                                                <tr>
                                                                    <td width=""520"" class=""esd-container-frame"" align=""center"" valign=""top"">
                                                                        <table cellpadding=""0"" cellspacing=""0"" width=""100%"">
                                                                            <tbody>
                                                                                <tr>
                                                                                    <td align=""center"" class=""esd-block-image es-infoblock made_with"" style=""font-size:0""><a target=""_blank"" href=""https://viewstripo.email/?utm_source=templates&utm_medium=email&utm_campaign=wedding_invitation_3&utm_content=pauline_and_tyler_are_getting_married""><img src=""https://tlr.stripocdn.email/content/guids/CABINET_09023af45624943febfa123c229a060b/images/7911561025989373.png"" alt width=""125"" style=""display: block;""></a></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                    </td>
                                                                </tr>
                                                            </tbody>
                                                        </table>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</body>

</html>";

            return htmlBody;
        }
    }
}
