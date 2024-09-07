using Entities;

namespace API.AppCode.IML
{
    public interface IWorkingHours
    {
        Task<IEnumerable<WorkingHours>> GetWorkingDays(string? name);
    }
}
