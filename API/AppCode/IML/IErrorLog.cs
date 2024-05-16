namespace API.AppCode.IML
{
    public interface IErrorLog
    {
        public Task<int> Error(object entity);
    }
}
