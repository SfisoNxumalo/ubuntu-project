using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserDocumentController : ControllerBase
    {
        private readonly IUserDocumentService _service;

        public UserDocumentController(IUserDocumentService service)
        {
            _service = service;
        }

        [Authorize]
        // Get documents for user
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            var result = await _service.GetByUserIdAsync(userId);

            return Ok(result);
        }

        [Authorize]
        // Get documents for provider
        [HttpGet("provider/{providerId}")]
        public async Task<IActionResult> GetByProvider(Guid providerId)
        {
            var result = await _service.GetByServiceProviderIdAsync(providerId);

            return Ok(result);
        }

        [Authorize]
        //  Mark as read
        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(Guid id)
        {
            var success = await _service.MarkAsReadAsync(id);

            if (!success)
                return NotFound();

            return Ok(new { message = "Marked as read" });
        }
    }
}
