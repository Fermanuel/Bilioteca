using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace Bilioteca.Controllers
{
    public class AccountController : Controller
    {
        // GET: AccountController
        public ActionResult Login()
        {
            return View();
        }
    }
}
