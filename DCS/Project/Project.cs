namespace DCS.Layout
{
	public class Project
	{
		public int ProjectId { get; set; } = 1;
        public string ProjectName { get; set; } = "DCS ";
        public string DesignedBy { get; set; } = "";
        public string? Email { get; set; } = "Info@DCS.in";
		public bool IsActive { get; set; } = true;

	}
}
