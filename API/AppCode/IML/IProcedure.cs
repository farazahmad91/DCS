namespace API.AppCode.IML
{
    public interface IProcedure
    {
        string GetName();
        object Call(object obj);
        object Call();
    }
    public interface IProcedureAsync
    {
        string GetName();
        Task<object> Call(object obj);
        Task<object> Call();

    }
}
