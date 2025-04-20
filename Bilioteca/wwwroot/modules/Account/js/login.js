$(document).ready(function () {
    $('#loginForm').on('submit', function (event) {
        event.preventDefault();

        var email = $('#email-user').val();
        var password = $('#password-user').val();

        // Mostrar en consola para depuración
        console.log('Email:', email);
        console.log('Password:', password);

        $.ajax({
            url: '/Account/Login',
            type: 'POST',
            data: { Email: email, Password: password },
            success: function (response) {
                if (response.success) {
                    window.location.href = response.redirectUrl;
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Error de inicio de sesión',
                        text: response.message
                    });
                }
            },
            error: function () {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un problema en la solicitud.'
                });
            }
        });
    });
});