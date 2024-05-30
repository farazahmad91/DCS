using Microsoft.Extensions.Configuration; 

namespace API.SendEmail
{
	public class EmailCredential
	{
		private readonly IConfiguration _configuration;

		public EmailCredential(IConfiguration configuration)
		{
			_configuration = configuration;
		}

		public Dictionary<string, object> EmailCredentials()
		{
			return new Dictionary<string, object>
			{
				{ "FromAddress", _configuration["EmailSettings:MailFrom"] },
				{ "HostAddress", _configuration["EmailSettings:Host"] },
				{ "UserName", _configuration["EmailSettings:userName"] },
				{ "Password", _configuration["EmailSettings:Password"] },
				{ "Port", int.Parse(_configuration["EmailSettings:Port"]) }
			};
		}
	}
}
