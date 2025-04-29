using Bilioteca.Models;
using Bilioteca.Service.Carreras;
using Bilioteca.Service.Rol;
using Bilioteca.Service.Users;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bilioteca.Controllers
{
    public class UsersController : Controller
    {
        private readonly RolService _rolService;
        private readonly CarrerasService _carrerasService;
        private readonly UserService _userService;
        public UsersController(RolService rolService, CarrerasService carrerasService, UserService userService)
        {
            _rolService = rolService;
            _carrerasService = carrerasService;
            _userService = userService;
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

        [HttpPost]
        public JsonResult CreateUser([FromBody] UserModel user)
        {
            try
            {
                var result = _userService.CreateUser(user);
                return Json(result);
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        [HttpGet]
        public JsonResult GetAllUser()
        {
            try
            {
                var users = _userService.GetAllUser();
                return Json(new { data = users });
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }
    }
}
