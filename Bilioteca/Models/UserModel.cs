namespace Bilioteca.Models
{
    public class UserModel
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
        public string? Nombre { get; set; }
        public string? Apellido { get; set; }
        public int? CarreraId { get; set; }
        public int Matricula { get; set; }
        public int? RolId { get; set; }
        public string? Genero { get; set; }
    }

    public class GetUserModel
    {
        public int ID { get; set; }
        public string? EMAIL { get; set; }
        public string? NOMBRE { get; set; }
        public string? APELLIDO { get; set; }
        public string? NOMBRE_CARRERA { get; set; }
        public int MATRICULA { get; set; }
        public string? NOMBRE_ROL { get; set; }
        public string? GENERO { get; set; }
    }
}
