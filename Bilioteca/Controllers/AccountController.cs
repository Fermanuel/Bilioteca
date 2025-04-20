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
        public ActionResult Login(Login login)
        {
            if (ModelState.IsValid)
            {
                var result = _accountService.Login(login);
                if (result.Codigo == 1)
                {
                    return RedirectToAction("Index", "Dashboard");
                }
                else
                {
                    ViewBag.LoginError = result.Mensaje;
                }
            }
            return View();
        }
    }
}
