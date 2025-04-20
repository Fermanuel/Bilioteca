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

        public bool Login(Login login)
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
                $"EXEC dbo.LOGIN_USER {login.Email}, {login.Password}, {codigoParam} OUTPUT, {mensajeParam} OUTPUT"
            );

            int codigo = (int)codigoParam.Value;
            string mensaje = mensajeParam.Value.ToString();

            return codigo == 0;
        }

    }
}
