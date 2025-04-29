using Bilioteca.Context;
using Bilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bilioteca.Service.Rol
{
    public class RolService
    {
        private readonly ApplicationDbContext _context;

        public RolService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<RolModel> GetAllRol()
        {
            try
            {
                return _context.Rol
                .FromSqlRaw("EXEC dbo.GET_ALL_ROLES")
                .ToList();
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
