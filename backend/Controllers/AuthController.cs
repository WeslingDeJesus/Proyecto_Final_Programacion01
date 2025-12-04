using Microsoft.EntityFrameworkCore;
using Maat_TaskBuddyApplication.Data;
using Maat_TaskBuddyApplication.Models;
using Maat_TaskBuddyApplication.Services;
using Maat_TaskBuddyApplication.DTOs;
using Microsoft.AspNetCore.Mvc;

namespace Maat_TaskBuddyApplication.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _db;
        private readonly JwtService _jwt;
        public AuthController(AppDbContext db, JwtService jwt) { _db = db; _jwt = jwt; }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterDto dto)
        {
            if (_db.Users.Any(u => u.Username == dto.Username))
                return BadRequest("Usuario existe");
            var user = new User
            {
                Username = dto.Username,
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(dto.Password)
            };
            _db.Users.Add(user);
            await _db.SaveChangesAsync();
            return Ok(new { user.Id, user.Username });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginDto dto)
        {
            var user = await _db.Users.FirstOrDefaultAsync(u => u.Username == dto.Username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(dto.Password, user.PasswordHash))
                return Unauthorized("Credenciales inválidas");
            var token = _jwt.GenerateToken(user);
            return Ok(new { token });
        }
    }
}
