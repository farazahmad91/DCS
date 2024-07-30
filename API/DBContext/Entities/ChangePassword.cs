namespace API.DBContext.Entities
{
	public class ChangePass
	{
		public string CurrentPassword { get; set; }
		public string NewPassword { get; set; }
        public string UName { get; set; }
        public string Email { get; set; }


    }
}
