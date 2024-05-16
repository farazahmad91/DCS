using System.ComponentModel.DataAnnotations;

namespace DCS.Account
{
    public class Login
    {
        [Required(ErrorMessage = "UserName is Required")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password Is Required")]
        [DataType(DataType.Password)]
        public string? Password { get; set; }

        [Display(Name = "RememberMe")]
        public bool RememberMe { get; set; }
    }

    public class LoginVM : Login
    {
        public string message { get; set; }
    }
}
