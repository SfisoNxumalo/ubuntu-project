using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentQAController : ControllerBase
    {
        private readonly IDocumentQAService _service;

        public DocumentQAController(IDocumentQAService service)
        {
            _service = service;
        }

        [Authorize]
        [HttpPost("ask")]
        public async Task<IActionResult> Ask([FromBody] AskQuestionDto dto)
        {
            var result = await _service.AskAsync(dto);

            return Ok(result);
        }
    }
}
