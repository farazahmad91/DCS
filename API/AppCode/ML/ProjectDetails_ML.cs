using API.AppCode.DL;
using API.AppCode.IML;
using API.SendEmail;
using API.Service;
using Azure.Core;
using Entities;
using Entities.Response;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

namespace API.AppCode.ML
{
    public class ProjectDetails_ML : IProjectDetails
    {
        private readonly IDapper _dapper;
        private readonly IUserValidation _userValidation;
		public ProjectDetails_ML(IDapper dapper, IUserValidation userValidation)
        {
            _dapper=dapper;
            _userValidation=userValidation;
     
        }
        public async Task<Response> AddorUpdateProjectDetails(ProjectDetails details)
        {
            if (details.ProjectId == 0 || details.ProjectId == null)
            {
                var pId = _userValidation.GenerateOTP("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");
                details.ProjectId=Convert.ToInt32(pId);
            }
			
            IProcedureAsync procedure = new Proc_AddProjectDetails(_dapper);
            var i = await procedure.Call(details);
			return (Response)i;
        }
        public async Task<IEnumerable<ProjectDetails>> GetProjectDetails(string? name)
        {
            IProcedureAsync procedure = new Proc_GetProjectDetails(_dapper);
            var i = await procedure.Call(name);
            return (IEnumerable<ProjectDetails>)i;
        }
        public async Task<ProjectDetails> GetProjectDetailsByProjectId(int Id)
        {
            IProcedureAsync procedure = new Proc_GetProjectDetailsById(_dapper);
            var i = await procedure.Call(Id);
            return (ProjectDetails)i;
        }

        public async Task<ProjectDetails> GetProjectDetailsByEmail(string email)
        {
            try
            {
                IProcedureAsync procedure = new Proc_GetProjectDetailsByEmail(_dapper);
                var i = await procedure.Call(email);
                return (ProjectDetails)i;
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
