namespace API.Connection
{
    public interface IConnectionString
    {
        string ConnectionString { get; set; }
    }
    public class ConnectionProvidor : IConnectionString
    {
        public string ConnectionString { get; set; }
    }
}
