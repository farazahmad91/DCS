using API.DBContext.Entities;
using Entities.Response;
using Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Service
{
    public interface IUserService
    {
        public Task<Response> RegisterAsync(RegisterViewModel model);
        public Task<Response> Register(string email, string password);
        public Task<Response<LoginResponse>> LoginAsync(LoginViewModel model);
        public Task<Response<bool>> ForgetPassword(ForgotPasswordViewModel forgetPasswordReq);
        public Task<IEnumerable<User>> GetAllUsers();
        public Task<Response<bool>> UpdateUserStatus(UserStatus userStatus);
    }
}
