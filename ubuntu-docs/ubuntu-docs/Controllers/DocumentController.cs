using Microsoft.AspNetCore.Mvc;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentController : ControllerBase
    {
        private readonly IDocumentService _service;

        public DocumentController(IDocumentService service)
        {
            _service = service;
        }

        [HttpPost("upload")]
        public async Task<IActionResult> Upload([FromForm] UploadAndAssignDocumentDto dto)
        {
            var id = await _service.UploadAndAssignAsync(dto);

            return Ok(new { documentId = id });
        }

        
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var doc = await _service.GetByIdAsync(id);

            if (doc == null)
                return NotFound();

            return Ok(doc);
        }

        
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            var docs = await _service.GetByUserIdAsync(userId);

            return Ok(docs);
        }

       
        [HttpGet("provider/{providerId}")]
        public async Task<IActionResult> GetByProvider(Guid providerId)
        {
            var docs = await _service.GetByServiceProviderIdAsync(providerId);

            return Ok(docs);
        }
    }
}
