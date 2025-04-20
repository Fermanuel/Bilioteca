using Bilioteca.Models;
using Bilioteca.Service.Catalog;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bilioteca.Controllers
{
    public class CatalogController : Controller
    {
        private readonly CatalogService _catalogService;

        public CatalogController(CatalogService catalogService)
        {
            // Constructor vacío
            _catalogService = catalogService;
        }

        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Categories()
        {
            return View();
        }

        [HttpGet]
        public ActionResult<List<Book>> GetAllBook()
        {
            var books = _catalogService.GetAllBook();
            return books;
        }

        [HttpDelete]
        public IActionResult DeleteBook(int id)
        {
            try
            {
                _catalogService.DeleteBook(id);
                return Ok(new { message = "Libro eliminado correctamente." });
            }
            catch (Exception ex)
            {
                // Manejo de errores
                return StatusCode(500, new { message = "Error al eliminar el libro.", details = ex.Message });
            }
        }
    }
}
