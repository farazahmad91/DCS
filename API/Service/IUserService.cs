using API.DBContext.Entities;
using API.DBContext.Response;
using Microsoft.AspNetCore.Mvc;

namespace API.Service
{
    public interface IUserService
    {
        public Task<Response> RegisterAsync(RegisterViewModel model);
        public Task<Response> Register(string email, string password);
        public Task<Response<LoginResponse>> LoginAsync(LoginViewModel model);
        public IEnumerable<User> GetAllUsers();


    }
}
