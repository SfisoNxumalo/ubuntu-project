using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IServices;
using ubuntu_docs.Application.Services;

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

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await _service.GetAllAsync();

            return Ok(result);
        }

        [Authorize]
        [HttpGet("by-user/{userId}")]
        public async Task<IActionResult> GetByUser(Guid userId)
        {
            var result = await _service.GetByUserIdAsync(userId);

            return Ok(result);
        }

        [Authorize]
        [HttpGet("{serviceProviderId}/users")]
        public async Task<IActionResult> GetUsers(Guid serviceProviderId)
        {
            var users = await _service.GetUsersByServiceProviderIdAsync(serviceProviderId);

            return Ok(users);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            var users = await _service.GetById(id);

            return Ok(users);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthDTO loginModel)
        {
            try
            {
                var result = await _service.Login(loginModel);

                if (result == null)
                    throw new Exception();

                var cookieOptions = new CookieOptions
                {
                    HttpOnly = true,
                    Secure = true,
                    SameSite = SameSiteMode.None,
                    Expires = DateTime.UtcNow.AddDays(7)
                };

                Response.Cookies.Append("refreshToken", result.RefreshToken, cookieOptions);

                return Ok(result.UserDetails);
            }
            catch (Exception e)
            {
                return NotFound(e.Message);
            }
        }
    }
}
