﻿namespace Entities.Response
{
    public class LoginResponse
    {
        public string UserId { get; set; }
        public int ProjectId { get; set; }
        public string UserName { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Token { get; set; }
        public string Role { get; set; }
    }
}
