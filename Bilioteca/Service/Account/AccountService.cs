using Bilioteca.Context;
using Bilioteca.Models;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Bilioteca.Service.Account
{
    public class AccountService
    {
        private readonly ApplicationDbContext _context;
        public AccountService(ApplicationDbContext context)
        {
            _context = context;
        }

        public LoginResult Login(Login login)
        {
            var codigoParam = new SqlParameter("@CODIGO", SqlDbType.Int)
            {
                Direction = ParameterDirection.Output
            };
            var mensajeParam = new SqlParameter("@MENSAJE", SqlDbType.VarChar, 255)
            {
                Direction = ParameterDirection.Output
            };

            _context.Database.ExecuteSqlInterpolated(
                $"EXEC dbo.LOGIN_USER @EMAIL={login.Email}, @PASSWORD={login.Password}, @CODIGO={codigoParam} OUT, @MENSAJE={mensajeParam} OUT"
            );

            int codigo = (int)codigoParam.Value;
            string mensaje = mensajeParam.Value?.ToString() ?? string.Empty;

            return new LoginResult
            {
                Codigo = codigo,
                Mensaje = mensaje
            };
        }
    }
}
