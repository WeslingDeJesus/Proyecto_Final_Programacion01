namespace Maat_TaskBuddyApplication.DTOs
{
    public class TaskCreateDto
    {
        public string Titulo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        public string? Fecha { get; set; } = string.Empty;
    }
}
