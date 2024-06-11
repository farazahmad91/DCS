using Entities;
using Entities.Response;

namespace API.AppCode.IML
{
    public interface IProjectDetails
    {
        public Task<Response> AddorUpdateProjectDetails(ProjectDetails details);
        public Task<ProjectDetails> GetProjectDetailsByProjectId(int Id);
        public Task<IEnumerable<ProjectDetails>> GetProjectDetails(string name);
    }
}
