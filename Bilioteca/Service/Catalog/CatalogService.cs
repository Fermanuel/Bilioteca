using Bilioteca.Context;
using Bilioteca.Models;

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
            var books = _context.Book.ToList();
            return books;
        }
    }
}
