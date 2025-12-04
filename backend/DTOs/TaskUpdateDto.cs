namespace Maat_TaskBuddyApplication.DTOs
{
    public class TaskUpdateDto
    {
        public string? Titulo { get; set; }
        public string? Descripcion { get; set; }
        // Nullable so you can send only the field(s) you want to update
        public bool? Completado { get; set; }
    }
}
