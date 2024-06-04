using Entities;
using Entities.Response;

namespace API.Service
{
    public interface IUserValidation
    {
        public Task<Response> ValidateEmail(string email);
        public Task<Response> IsUserVerified(string Email);
        public Task<Response> VerifyConfirmationEmail(ValidateEmail validateEmail);
        public Task<Response> VerifyOTP(ValidateEmail validateEmail);
    }
}
