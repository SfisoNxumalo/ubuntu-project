using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccessController : ControllerBase
    {
        private readonly IAccessService _accessService;

        public AccessController(IAccessService accessService)
        {
            _accessService = accessService;
        }

        [Authorize]
        [HttpPost("grant")]
        public async Task<IActionResult> GrantAccess([FromBody] GrantAccessDto dto)
        {
            var result = await _accessService.GrantAccessAsync(dto);

            return Ok(new { message = "Access granted successfully" });
        }

        [Authorize]
        [HttpPost("revoke")]
        public async Task<IActionResult> RevokeAccess([FromBody] GrantAccessDto dto)
        {
            var result = await _accessService.RevokeAccessAsync(dto.UserId, dto.ServiceProviderId);

            if (!result)
                return NotFound("Access not found");

            return Ok(new { message = "Access revoked successfully" });
        }

        [Authorize]
        [HttpGet("check")]
        public async Task<IActionResult> CheckAccess(Guid userId, Guid serviceProviderId)
        {
            var hasAccess = await _accessService.HasAccessAsync(userId, serviceProviderId);

            return Ok(new { hasAccess });
        }
    }
}
