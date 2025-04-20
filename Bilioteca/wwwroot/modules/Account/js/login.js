$(document).ready(function () {
    $('#loginForm').submit(function (e) {
        e.preventDefault();
        $.ajax({
            url: '/Account/Login',
            type: 'POST',
            dataType: 'json',
            data: {
                Email: $('#email-user').val(),
                Password: $('#password-user').val()
            },
            success: function (response) {
                if (response.success) {
                    Toast.success('¡Bienvenido!').then(() => {
                        window.location.href = response.redirectUrl;
                    });
                } else {
                    Toast.error(response.message);
                }
            },
            error: function () {
                Toast.error('Ocurrió un problema en la solicitud');
            }
        });
    });
});
