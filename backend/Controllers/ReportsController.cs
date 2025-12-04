using Microsoft.EntityFrameworkCore;
using ClosedXML.Excel;
using Maat_TaskBuddyApplication.Data;
using Maat_TaskBuddyApplication.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;
using System.Security.Claims;
using System.IdentityModel.Tokens.Jwt;
using System.Text;

namespace Maat_TaskBuddyApplication.Controllers
{
    [Authorize]
    [ApiController]
    [Route("reportes")]
    public class ReportsController : ControllerBase
    {
        private readonly AppDbContext _db;
        public ReportsController(AppDbContext db) { _db = db; }

        [HttpGet("general")]
        public async Task<IActionResult> General(DateTime? from, DateTime? to, string format = "csv")
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);
            var q = _db.Tasks.Where(t => t.OwnerId == userId);
            if (from.HasValue) q = q.Where(t => t.CreatedAt >= from.Value);
            if (to.HasValue) q = q.Where(t => t.CreatedAt <= to.Value);
            var list = await q.ToListAsync();

            if (format.ToLower() == "excel")
            {
                using var workbook = new XLWorkbook();
                var ws = workbook.Worksheets.Add("Tareas");
                ws.Cell(1, 1).Value = "Id";
                ws.Cell(1, 2).Value = "Titulo";
                ws.Cell(1, 3).Value = "Descripcion";
                ws.Cell(1, 4).Value = "Completado";
                ws.Cell(1, 5).Value = "CreatedAt";
                int r = 2;
                foreach (var t in list)
                {
                    ws.Cell(r, 1).Value = t.Id;
                    ws.Cell(r, 2).Value = t.Titulo;
                    ws.Cell(r, 3).Value = t.Descripcion;
                    ws.Cell(r, 4).Value = t.Completado;
                    ws.Cell(r, 5).Value = t.CreatedAt;
                    r++;
                }
                using var ms = new MemoryStream();
                workbook.SaveAs(ms);
                ms.Seek(0, SeekOrigin.Begin);
                return File(ms.ToArray(), "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet", "reporte_tareas.xlsx");
            }
            else
            {
                // CSV
                var sb = new StringBuilder();
                sb.AppendLine("Id,Titulo,Descripcion,Completado,CreatedAt");
                foreach (var t in list)
                {
                    sb.AppendLine($"{t.Id},\"{t.Titulo}\",\"{(t.Descripcion ?? "")}\",{t.Completado},{t.CreatedAt:O}");
                }
                var bytes = Encoding.UTF8.GetBytes(sb.ToString());
                return File(bytes, "text/csv", "reporte_tareas.csv");
            }
        }

        [HttpGet("completadas")]
        public async Task<IActionResult> Completadas(DateTime? from, DateTime? to, string format = "csv")
        {
            var userId = User.FindFirstValue(JwtRegisteredClaimNames.Sub);

            var q = _db.Tasks.Where(t => t.OwnerId == userId && t.Completado == true);

            if (from.HasValue) q = q.Where(t => t.CreatedAt >= from.Value);
            if (to.HasValue) q = q.Where(t => t.CreatedAt <= to.Value);

            var list = await q.ToListAsync();

            if (format.ToLower() == "excel")
            {
                using var workbook = new XLWorkbook();
                var ws = workbook.Worksheets.Add("TareasCompletadas");
                ws.Cell(1, 1).Value = "Id";
                ws.Cell(1, 2).Value = "Titulo";
                ws.Cell(1, 3).Value = "Descripcion";
                ws.Cell(1, 4).Value = "CreatedAt";

                int r = 2;
                foreach (var t in list)
                {
                    ws.Cell(r, 1).Value = t.Id;
                    ws.Cell(r, 2).Value = t.Titulo;
                    ws.Cell(r, 3).Value = t.Descripcion;
                    ws.Cell(r, 4).Value = t.CreatedAt;
                    r++;
                }

                using var ms = new MemoryStream();
                workbook.SaveAs(ms);
                ms.Seek(0, SeekOrigin.Begin);

                return File(
                    ms.ToArray(),
                    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    "reporte_tareas_completadas.xlsx"
                );
            }
            else
            {
                // CSV
                var sb = new StringBuilder();
                sb.AppendLine("Id,Titulo,Descripcion,CreatedAt");

                foreach (var t in list)
                {
                    sb.AppendLine($"{t.Id},\"{t.Titulo}\",\"{(t.Descripcion ?? "")}\",{t.CreatedAt:O}");
                }

                var bytes = Encoding.UTF8.GetBytes(sb.ToString());

                return File(bytes, "text/csv", "reporte_tareas_completadas.csv");
            }
        }
    }
}
