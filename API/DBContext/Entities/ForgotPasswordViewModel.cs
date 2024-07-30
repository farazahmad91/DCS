using System.ComponentModel.DataAnnotations;

namespace API.DBContext.Entities
{
	public class ForgotPasswordViewModel
	{
		[Required]
		[EmailAddress]
		[Display(Name = "Email")]
		public string Email { get; set; }
        public string NewPassword { get; set; }
        public string UName { get; set; }

    }
}
