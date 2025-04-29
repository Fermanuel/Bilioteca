using Bilioteca.Context;
using Bilioteca.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System.Data;

namespace Bilioteca.Service.Users
{
    public class UserService
    {
        private readonly ApplicationDbContext _context;
        public UserService(ApplicationDbContext context)
        {
            _context = context;
        }

        public List<GetUserModel> GetAllUser()
        {
            try
            {
                var users = _context.Users.FromSqlRaw("EXEC dbo.GET_ALL_USER").ToList();
                return users;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
        }

        public ActionResult CreateUser(UserModel user)
        {
            try
            {
                var emailParam = new SqlParameter("@EMAIL", user.Email);
                var passwordParam = new SqlParameter("@PASSWORD", user.Password);
                var nombreParam = new SqlParameter("@NOMBRE", user.Nombre);
                var apellidoParam = new SqlParameter("@APELLIDO", user.Apellido);
                var carreraParam = new SqlParameter("@CARRERA_ID", user.CarreraId);
                var matriculaParam = new SqlParameter("@MATRICULA", user.Matricula);
                var rolParam = new SqlParameter("@ROL_ID", user.RolId);
                var generoParam = new SqlParameter("@GENERO", user.Genero);

                // 2. Parámetros de salida
                var mensajeParam = new SqlParameter("@MENSAJE", SqlDbType.VarChar, 255)
                {
                    Direction = ParameterDirection.Output
                };
                var codigoParam = new SqlParameter("@CODIGO", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                // 3. Ejecutar el SP
                _context.Database.ExecuteSqlRaw(
                    @"EXEC dbo.CREATE_USER 
                            @EMAIL, @PASSWORD, @NOMBRE, @APELLIDO, @CARRERA_ID, 
                            @MATRICULA, @ROL_ID, @GENERO, @MENSAJE OUTPUT, @CODIGO OUTPUT",
                    emailParam, passwordParam, nombreParam, apellidoParam, carreraParam,
                    matriculaParam, rolParam, generoParam, mensajeParam, codigoParam
                );

                // 4. Leer valores de salida
                var mensaje = mensajeParam.Value?.ToString();
                var codigo = (int)codigoParam.Value;

                // 5. Devolver resultado
                return new JsonResult(new
                {
                    Codigo = codigo,
                    Mensaje = mensaje
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    Mensaje = ex.Message
                });
            }
        }

        public ActionResult UpdateUser(UserModel user)
        {
            try
            {
                var emailParam = new SqlParameter("@EMAIL", user.Email);
                var passwordParam = new SqlParameter("@PASSWORD", user.Password);
                var nombreParam = new SqlParameter("@NOMBRE", user.Nombre);
                var apellidoParam = new SqlParameter("@APELLIDO", user.Apellido);
                var carreraParam = new SqlParameter("@CARRERA_ID", user.CarreraId);
                var matriculaParam = new SqlParameter("@MATRICULA", user.Matricula);
                var rolParam = new SqlParameter("@ROL_ID", user.RolId);
                var generoParam = new SqlParameter("@GENERO", user.Genero);

                // 2. Parámetros de salida
                var mensajeParam = new SqlParameter("@MENSAJE", SqlDbType.VarChar, 255)
                {
                    Direction = ParameterDirection.Output
                };
                var codigoParam = new SqlParameter("@CODIGO", SqlDbType.Int)
                {
                    Direction = ParameterDirection.Output
                };

                // 3. Ejecutar el SP
                _context.Database.ExecuteSqlRaw(
                    @"EXEC dbo.CREATE_USER 
                            @EMAIL, @PASSWORD, @NOMBRE, @APELLIDO, @CARRERA_ID, 
                            @MATRICULA, @ROL_ID, @GENERO, @MENSAJE OUTPUT, @CODIGO OUTPUT",
                    emailParam, passwordParam, nombreParam, apellidoParam, carreraParam,
                    matriculaParam, rolParam, generoParam, mensajeParam, codigoParam
                );

                // 4. Leer valores de salida
                var mensaje = mensajeParam.Value?.ToString();
                var codigo = (int)codigoParam.Value;

                // 5. Devolver resultado
                return new JsonResult(new
                {
                    Codigo = codigo,
                    Mensaje = mensaje
                });
            }
            catch (Exception ex)
            {
                return new JsonResult(new
                {
                    Mensaje = ex.Message
                });
            }
        }
    }
}
