using API.AppCode.DL;
using API.AppCode.IML;
using API.SendEmail;
using API.Service;
using Entities;
using Entities.Response;
using Microsoft.VisualStudio.Web.CodeGenerators.Mvc.Templates.Blazor;

namespace API.AppCode.ML
{
    public class ProjectDetails_ML : IProjectDetails
    {
        private readonly IDapper _dapper;
        private readonly IUserValidation _userValidation;
		private readonly Sendmail _sendmail;
		public ProjectDetails_ML(IDapper dapper, IUserValidation userValidation, Sendmail sendmail)
        {
            _dapper=dapper;
            _userValidation=userValidation;
            _sendmail=sendmail;
        }
        public async Task<Response> AddorUpdateProjectDetails(ProjectDetails details)
        {
			var res = new Response()
			{
				ResponseText="Somthing wrong!!",
				StatusCode=ResponseStatus.FAILED
			};
			var pId= _userValidation.GenerateOTP("ABCDEFGHIJKLMNOPQRSTUVWXYZ234567");
            details.ProjectId=Convert.ToInt32(pId);
            IProcedureAsync procedure = new Proc_AddProjectDetails(_dapper);
            var i = await procedure.Call(details);
            i=res;
			if (res.StatusCode==ResponseStatus.SUCCESS)
			{
				_sendmail.SendEmails(details.UserEmail, "Create New Project", $"your Project Id Is: {pId}");

			}
			return res;
        }
        public async Task<IEnumerable<ProjectDetails>> GetProjectDetails(string name)
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
    }
}
