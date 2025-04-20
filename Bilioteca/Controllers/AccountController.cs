using Bilioteca.Models;
using Bilioteca.Service.Account;
using Microsoft.AspNetCore.Mvc;

namespace Bilioteca.Controllers
{
    public class AccountController : Controller
    {
        private readonly AccountService _accountService;
        public AccountController(AccountService accountService) 
        {
            _accountService = accountService;
        }

        // GET: AccountController
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Login(Login login)
        {
            if (!ModelState.IsValid)
                return Json(new { success = false, message = "Datos inválidos." });

            var result = _accountService.Login(login);
            if (result.Codigo == 1)
                return Json(new { success = true, redirectUrl = Url.Action("Index", "Dashboard") });
            else
                return Json(new { success = false, message = result.Mensaje });
        }

    }
}
