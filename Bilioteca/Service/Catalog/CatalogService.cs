using Bilioteca.Context;
using Bilioteca.Models;
using Microsoft.EntityFrameworkCore;

namespace Bilioteca.Service.Catalog
{
    public class CatalogService
    {
        private readonly ApplicationDbContext _context;
        public CatalogService(ApplicationDbContext context) 
        {
            _context = context;
        }

        public List<Book> GetAllBook()
        {
            try
            {
                return _context.Book
                .FromSqlRaw("EXEC dbo.GET_ALL_BOOKS")
                .ToList();
            }
            catch (Exception ex)
            {

                throw new Exception(ex.Message);
            }
        }
    }
}
