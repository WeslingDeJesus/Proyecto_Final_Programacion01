using Maat_TaskBuddyApplication.Models;
using Microsoft.EntityFrameworkCore;

namespace Maat_TaskBuddyApplication.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<TaskItem> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
    }
}
