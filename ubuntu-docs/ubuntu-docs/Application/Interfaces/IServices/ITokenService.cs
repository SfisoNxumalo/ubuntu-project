using System.Security.Claims;
using ubuntu_docs.Application.DTOs;

namespace ubuntu_docs.Application.Interfaces.IServices
{
    public interface ITokenService
    {
        string GenerateAccessToken(UserDetailsDto userLoginDetails);
        string GenerateRefreshToken(Guid userId);
        ClaimsPrincipal? ValidateRefreshToken(string refreshToken);

        string RefreshAsync(string? refreshToken);
    }
}
