using Bilioteca.Context;

namespace Bilioteca.Service.Users
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }


    }
}
