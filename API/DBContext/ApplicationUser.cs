﻿using Microsoft.AspNetCore.Identity;

namespace API.DBContext
{
    public class ApplicationUser : IdentityUser
    {
        public string Name { get; set; }
        public int ProjectId { get; set; }
        public string PhoneNo { get; set; }
    }
}
