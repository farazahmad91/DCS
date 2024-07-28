using Entities;
using Entities.Response;

namespace API.Service
{
    public interface IUserValidation
    {
        public Task<Response> SendOTP(EmailType email);
        public Task<Response> IsUserVerified(string Email);
        public Task<Response> VerifyConfirmationEmail(ValidateEmail validateEmail);
        public Task<Response> VerifyOTP(ValidateEmail validateEmail);
        public string GenerateOTP(string secret, int digits = 6);


    }
}
