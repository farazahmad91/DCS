﻿using API.AppCode.IML;
using API.AppCode.ML;
using Entities.Response;
using Entities;

namespace API.AppCode.DL
{
    public class Proc_AddProjectDetails : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_AddProjectDetails(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            var req = (ProjectDetails)obj;
            var res = new Response()
            {
                ResponseText="Somthing wrong!!",
                StatusCode=ResponseStatus.FAILED
            };
            try
            {
				

					var param = new
					{
                        Id=req.Id,
						ProjectId = req.ProjectId,
						UserEmail = req.Email,
						Logo = req.Logo,
						ProjectName = req.OldProjectName,
                        UpdateDomainName = req.OldDomainName,
						DomainName = req.DomainName,
					};
					var j = await _dapper.GetAsync<Response>(GetName(), param);
					res=j;
					return res;

				
				
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                 new ErrorLog_ML(_dapper).Error(error);
            }
            return res;
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Prc_InsertOrUpdateProject";
        }
    }
    public class Proc_GetProjectDetails : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetProjectDetails(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string name = (string)obj;
            try
            {
                var param = new
                {
                    ProjectName = name,

                };
                var i = await _dapper.GetAll<ProjectDetails>(GetName(), param);
                return i;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                 new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetProjects";
        }
    }
    public class Proc_GetProjectDetailsById : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetProjectDetailsById(IDapper dapper)
        {
            _dapper=dapper;
        }

        public async Task<object> Call(object obj)
        {
            int id = (int)obj;
            try
            {
                var param = new
                {
                    ProjectId = id,

                };
                var i = await _dapper.GetAsync<ProjectDetails>(GetName(), param);
                return i;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                 new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetProjectDetailsById";
        }
    }

    public class Proc_GetProjectDetailsByEmail : IProcedureAsync
    {
        private readonly IDapper _dapper;
        public Proc_GetProjectDetailsByEmail(IDapper dapper)
        {
            _dapper=dapper;
        }
        public async Task<object> Call(object obj)
        {
            string name = (string)obj;
            try
            {
                var param = new
                {
                    Email = name,

                };
                var i = await _dapper.GetAsync<ProjectDetails>(GetName(), param);
                return i;
            }
            catch (Exception ex)
            {
                var error = new ErrorLog
                {
                    ClassName = GetType().Name,
                    FuncName = "call",
                    Error = ex.Message,
                    ProcName = GetName(),
                };
                new ErrorLog_ML(_dapper).Error(error);
            }
            return "error";
        }

        public Task<object> Call()
        {
            throw new NotImplementedException();
        }

        public string GetName()
        {
            return "Proc_GetProjectsByEmail";
        }
    }

	public class Proc_UpdateProjectStatus : IProcedureAsync
	{
		private readonly IDapper _dapper;
		public Proc_UpdateProjectStatus(IDapper dapper)
		{
			_dapper=dapper;
		}
		public async Task<object> Call(object obj)
		{
			var req = (Common)obj;
			try
			{
				var param = new
				{
					Id = req.Id,
					Status = req.Status

				};
				var i = await _dapper.GetAsync<Response>(GetName(), param);
				return i;
			}
			catch (Exception ex)
			{
				var error = new ErrorLog
				{
					ClassName = GetType().Name,
					FuncName = "call",
					Error = ex.Message,
					ProcName = GetName(),
				};
				new ErrorLog_ML(_dapper).Error(error);
			}
			return "error";
		}

		public Task<object> Call()
		{
			throw new NotImplementedException();
		}

		public string GetName()
		{
			return "Proc_UpdateProjectStatus";
		}
	}
}
