$(document).ready(function () {
    $('#formAgregarLibro').on('submit', function (e) {
        e.preventDefault();
        // Aquí puedes agregar la lógica para enviar el formulario al servidor
        alert('Libro agregado exitosamente');
        this.reset();
    });
});