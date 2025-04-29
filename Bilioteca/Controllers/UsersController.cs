using Bilioteca.Service.Rol;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bilioteca.Controllers
{
    public class UsersController : Controller
    {
        private readonly RolService _rolService;
        public UsersController(RolService rolService)
        {
            _rolService = rolService;
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
            catch (Exception)
            {

                throw;
            }
        }
    }
}
