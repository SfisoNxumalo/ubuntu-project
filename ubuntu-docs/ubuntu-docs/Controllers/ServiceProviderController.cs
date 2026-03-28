using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ServiceProviderController : ControllerBase
    {
        private readonly IServiceProviderService _service;

        public ServiceProviderController(IServiceProviderService service)
        {
            _service = service;
        }
    
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CreateServiceProviderDto dto)
        {
            var result = await _service.CreateAsync(dto);

            return Created("", result);
        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();

            return Ok(result);
        }
       
        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            var result = await _service.GetByUserIdAsync(userId);

            return Ok(result);
        }

        [HttpGet("{serviceProviderId}/users")]
        public async Task<IActionResult> GetUsers(Guid serviceProviderId)
        {
            var users = await _service.GetUsersByServiceProviderIdAsync(serviceProviderId);

            return Ok(users);
        }
    }
}
