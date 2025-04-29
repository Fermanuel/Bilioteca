using Bilioteca.Context;
using Bilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bilioteca.Service.Carreras
{
    public class CarrerasService
    {
        private readonly ApplicationDbContext _context;

        public CarrerasService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<CarreraModel> GetAllCarreras()
        {
            try
            {
                var carreras = _context.Carrera
                    .FromSqlRaw("EXEC dbo.GET_ALL_CARREARS")
                    .ToList();

                return carreras;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
