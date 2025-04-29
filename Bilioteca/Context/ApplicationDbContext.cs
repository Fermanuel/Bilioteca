using Bilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bilioteca.Context
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }

        // Agrega tus DbSet aquí
        public DbSet<Book> Book { get; set; }
        public DbSet<RolModel> Rol { get; set; }
        public DbSet<CarreraModel> Carrera { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Book>().HasNoKey();
            modelBuilder.Entity<RolModel>().HasNoKey();
            modelBuilder.Entity<CarreraModel>().HasNoKey();
        }
    }
}
