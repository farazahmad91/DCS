using System.Security.Claims;

namespace API.Claims
{
    public static class ClaimExtension
    {
        public static T GetLoggedInUserId<T>(this ClaimsPrincipal principal)
        {
            var loggedInUserId = principal.FindFirst("UserId");
            if (typeof(T) == typeof(string))
            {
                return (T)Convert.ChangeType(loggedInUserId, typeof(T));
            }
            else if (typeof(T) == typeof(int) || typeof(T) == typeof(long))
            {
                return loggedInUserId != null ? (T)Convert.ChangeType(loggedInUserId, typeof(T)) : (T)Convert.ChangeType(0, typeof(T));
            }
            else
            {
                throw new Exception("Invalid type provided");
            }
        }

        public static int? GetProjectId(this ClaimsPrincipal principal)
        {
            var projectidClaim = principal.FindFirst("projectId");
            if (projectidClaim != null && int.TryParse(projectidClaim.Value, out int projectid))
            {
                return projectid;
            }
            return null;
        }

        public static string GetLoggedInUserToken(this ClaimsPrincipal principal)
        {
            var tokenClaim = principal.FindFirst("Token");
            return tokenClaim != null ? tokenClaim.Value : null;
        }

        public static string GetLoggedInUserName(this ClaimsPrincipal principal)
        {
            var nameClaim = principal.FindFirst(ClaimTypes.Name);
            return nameClaim != null ? nameClaim.Value : null;
        }
        public static string GetLoggedInUserEmail(this ClaimsPrincipal principal)
        {
            var nameClaim = principal.FindFirst(ClaimTypes.Email);
            return nameClaim != null ? nameClaim.Value : null;
        }
        public static string GetLoggedInUserRole(this ClaimsPrincipal principal)
        {
            var roleClaim = principal.FindFirst(ClaimTypes.Role);
            return roleClaim != null ? roleClaim.Value : null;

            //if (Enum.TryParse<string>(enumValue, out var result))
            //{
            //    return result;
            //}
            //else
            //{
            //    throw new ArgumentException("Invalid role value");
            //}
        }
    }
}
