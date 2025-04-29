using Bilioteca.Service.Carreras;
using Bilioteca.Service.Rol;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bilioteca.Controllers
{
    public class UsersController : Controller
    {
        private readonly RolService _rolService;
        private readonly CarrerasService _carrerasService;
        public UsersController(RolService rolService, CarrerasService carrerasService)
        {
            _rolService = rolService;
            _carrerasService = carrerasService;
        }

        public ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public JsonResult GetAllRoles()
        {
            try
            {
                var roles = _rolService.GetAllRol();
                return Json(new { data = roles });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet]
        public JsonResult GetAllCarreras()
        {
            try
            {
                var carrera = _carrerasService.GetAllCarreras();
                return Json(new { data = carrera });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
