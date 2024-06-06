using API.Migrations;

namespace API.DBContext.Entities
{
    public class User
    {
        public string Id { get; set; }
        public string Email { get; set; }
        public string Name { get; set; }
        public string UserName { get; set; }
        public string? Role { get; set; }
        public string? PasswordHash { get; set; }
        public bool? IsVerified { get; set; }
        public bool? IsLocked { get; set; }
        public bool? IsActive { get; set; }
        public int InvalidLoginAttempts { get; set; }

    }
}
