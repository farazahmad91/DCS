using System.ComponentModel.DataAnnotations;

namespace API.DBContext.Entities
{
    public class RegisterViewModel
    {
            public int ProjectId { get; set; }
           [Required]
            [StringLength(50)]

            public string Name { get; set; }

            [Required]
            [StringLength(50, MinimumLength = 5)]
            [EmailAddress]
            public string Email { get; set; }

            [Required]
            [StringLength(20, MinimumLength = 5)]
            public string PhoneNo { get; set; }


            [Required]
            [StringLength(50, MinimumLength = 5)]
            public string Password { get; set; }


            [Required]
            [StringLength(50, MinimumLength = 5)]
            public string ConfirmPassword { get; set; }

            public string? Role { get; set; }
        }
   
}
