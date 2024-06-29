using API.AppCode.IML;
using API.Data;
using Entities;

namespace API.SendEmail
{
    public class EmailHtmlBody
    {
        private readonly IConfiguration _configuration;
        private readonly IDapper _dapper;
        public EmailHtmlBody(IConfiguration configuration, IDapper dapper)
        {
            _configuration = configuration;
            _dapper=dapper;

        }



        public string GenerateHtmlBody(string body)
        {
            string FBlink = _configuration["SocialMedia:FB"];
            string FBIconlink = _configuration["SocialMedia:FBIcon"];
            string XLink = _configuration["SocialMedia:X"];
            string XIconLink = _configuration["SocialMedia:XIcon"];
            string InstaLink = _configuration["SocialMedia:Insta"];
            string InstaIconLink = _configuration["SocialMedia:InstaIcon"];

            var param = new
            {
                TemplateID = 8,
            };
            var res = _dapper.GetById<EmailTemplate>(param, "proc_GetEmailTemplateById");
            string htmlBody = res.Body;
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
            var param = new
            {
                TemplateID = 8,
            };
            var res = _dapper.GetById<EmailTemplate>(param, "proc_GetEmailTemplateById");
            string htmlBody  = res.Body; 

            return htmlBody;
        }
    }
}
