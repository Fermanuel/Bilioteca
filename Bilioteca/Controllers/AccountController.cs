using Bilioteca.Models;
using Bilioteca.Service.Account;
using Microsoft.AspNetCore.Http;
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

        // POST: AccountController/Login
        [HttpPost]
        public ActionResult Login(Login login)
        {
            if (ModelState.IsValid)
            {
                var result = _accountService.Login(login);
                if (result)
                {
                    return RedirectToAction("Index", "Dashboard");
                }
                else
                {
                    ModelState.AddModelError("", "Email o contraseña incorrectos.");
                }
            }
            return View();
        }
    }
}
