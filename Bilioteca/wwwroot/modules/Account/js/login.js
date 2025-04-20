$(document).ready(function () {
    $('#loginForm').submit(function (event) {
        event.preventDefault(); // Evita la recarga de la página

        // Obtener los valores de los campos
        var email = $('input[name="email-user"]').val();
        var password = $('input[name="password-user"]').val();

        // Enviar los datos al controlador mediante AJAX
        $.ajax({
            url: '/Account/Login', // Reemplaza con la URL de tu controlador
            type: 'POST',
            data: {
                Email: email,
                Password: password
            },
            success: function (response) {
                // Manejar la respuesta del servidor
                console.log(response);
                // Puedes redirigir al usuario o mostrar un mensaje
            },
            error: function (xhr, status, error) {
                // Manejar errores
                console.error(error);
            }
        });
    });
});
