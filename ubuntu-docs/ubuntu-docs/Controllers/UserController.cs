using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ubuntu_docs.Application.DTOs;
using ubuntu_docs.Application.Interfaces.IServices;

namespace ubuntu_docs.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        
        [HttpPost]
        public async Task<IActionResult> CreateUser([FromBody] CreateUserDto dto)
        {
            var user = await _userService.CreateUserAsync(dto);

            return CreatedAtAction(nameof(GetUserById), new { id = user.Id }, user);
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(Guid id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
                return NotFound($"User with ID {id} not found");

            return Ok(user);
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userService.GetAllUsersAsync();

            return Ok(users);
        }

        [Authorize]
        [HttpGet("by-email")]
        public async Task<IActionResult> GetUserByEmail([FromQuery] string email)
        {
            var user = await _userService.GetUserByEmailAsync(email);

            if (user == null)
                return NotFound($"User with email {email} not found");

            return Ok(user);
        }

        [Authorize]
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(Guid id)
        {
            var deleted = await _userService.DeleteUserAsync(id);

            if (!deleted)
                return NotFound($"User with ID {id} not found");

            return NoContent();
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] AuthDTO loginModel)
        {
            try
            {
                var result = await _userService.Login(loginModel);

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
