using Microsoft.EntityFrameworkCore;
using Maat_TaskBuddyApplication.Data;
using Maat_TaskBuddyApplication.Models;
using Maat_TaskBuddyApplication.DTOs;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;


namespace Maat_TaskBuddyApplication.Controllers
{
   
    [ApiController]
    [Route("tareas")]
    public class TasksController : ControllerBase
    {
        private readonly AppDbContext _db;
        public TasksController(AppDbContext db) { _db = db; }

        private string UserId => User.FindFirstValue(JwtRegisteredClaimNames.Sub);

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasks = await _db.Tasks.Where(t => t.OwnerId == UserId).ToListAsync();
            return Ok(tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskCreateDto dto)
        {

            var t = new TaskItem
            {
                Titulo = dto.Titulo,
                Descripcion = dto.Descripcion,
                CreatedAt = dto.CreatedAt,
                Fecha = dto.Fecha,
                OwnerId = UserId
            };
            _db.Tasks.Add(t);
            await _db.SaveChangesAsync();
            return CreatedAtAction(nameof(GetAll), new { id = t.Id }, t);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> Update(int id, [FromBody] TaskUpdateDto dto)
        {
            var t = await _db.Tasks.FirstOrDefaultAsync(x => x.Id == id && x.OwnerId == UserId);
            if (t == null) return NotFound();
            t.Titulo = dto.Titulo ?? t.Titulo;
            t.Descripcion = dto.Descripcion ?? t.Descripcion;
            if (dto.Completado.HasValue && dto.Completado.Value && !t.Completado)
            {
                t.Completado = true;
                t.CompletedAt = DateTime.UtcNow;
            }
            else if (dto.Completado.HasValue)
            {
                t.Completado = dto.Completado.Value;
                if (!t.Completado) t.CompletedAt = null;
            }
            await _db.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var t = await _db.Tasks.FirstOrDefaultAsync(x => x.Id == id && x.OwnerId == UserId);
            if (t == null) return NotFound();
            _db.Tasks.Remove(t);
            await _db.SaveChangesAsync();
            return NoContent();
        }
    }
}
