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
}
