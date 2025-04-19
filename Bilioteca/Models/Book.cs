namespace Bilioteca.Models
{
    public class Book
    {
        public int CANTIDAD { get; set; } = 0;
        public string TITULO { get; set; } = string.Empty;
        public string AUTOR { get; set; } = string.Empty;
        public string UBICACION { get; set; } = string.Empty;
        public string ISBN { get; set; } = string.Empty;
    }
}
