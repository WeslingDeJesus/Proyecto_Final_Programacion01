namespace Maat_TaskBuddyApplication.Models
{
    public class TaskItem
    {
        public int Id { get; set; }
        public string Titulo { get; set; } = string.Empty;
        public string? Descripcion { get; set; }
        public string? Fecha { get; set; } = string.Empty;
        public bool Completado { get; set; } = false;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? CompletedAt { get; set; }
        public string? OwnerId { get; set; } = string.Empty;
    }
}
