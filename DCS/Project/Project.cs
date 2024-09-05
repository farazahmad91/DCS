namespace DCS.Layout
{
	public class Project
	{
		public int ProjectID { get; set; } = 1;
        public string ProjectName { get; set; } = "dcs";
        public string DesignedBy { get; set; } = "";
        public string? Email { get; set; } = "Info@DCS.in";
		public bool IsActive { get; set; } = true;

	}
}
