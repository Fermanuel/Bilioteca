$(document).ready(function () {

    $(function () {
        window.tablaUsuarios = $('#tablaUsuarios').DataTable({
            ajax: {
                url: '/Users/GetAllUser',
                dataType: 'json',
                dataSrc: function (json) {
                    return json.data;
                }
            },
            columns: [
                { data: 'id' },
                { data: 'email' },
                { data: 'nombre'},
                { data: 'apellido' },
                { data: 'nombrE_CARRERA' },
                { data: 'matricula' },
                { data: 'nombrE_ROL' },
                { data: 'genero' },
                {
                    data: null,
                    orderable: false,
                    render: function (data, type, row) {
                        return `
                        <button class="btn btn-sm btn-warning btnEditar" data-id="${row.id}">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-danger btnEliminar" data-id="${row.id}">
                          <i class="bi bi-trash"></i>
                        </button>`;
                    }
                }
            ]
        });
    });


    // Abrir modal para agregar usuario
    $('#btnAgregarUsuario').on('click', function () {
        $('#formUsuario')[0].reset();
        $('#usuarioId').val('');
        $('#modalUsuarioLabel').text('Agregar Usuario');
        $('#modalUsuario').modal('show');
    });


    $(function () {
        function cargarRoles() {
            $.ajax({
                url: '/Users/GetAllRoles',
                type: 'GET',
                dataType: 'json',
                success: function (response) {

                   // console.log(response);

                    var $select = $('#rol');
                    $select.empty().append('<option value="">Seleccione un rol</option>');

                    $.each(response.data, function (_, rol) {
                        $select.append(
                            $('<option></option>')
                                .val(rol.id) 
                                .text(rol.nombrE_ROL)
                        );
                    });
                },
                error: function (xhr, status, error) {
                    Toast.error('Error al cargar los roles: ' + error);
                }
            });
        }

        cargarRoles();

        $('#modalUsuario').on('show.bs.modal', function () {
            cargarRoles();
        });
    });

    $(function () {
        function cargarCarreras() {
            $.ajax({
                url: '/Users/GetAllCarreras',
                type: 'GET',
                dataType: 'json',
                success: function (response) {

                    //console.log(response);

                    var $select = $('#carrera');
                    $select.empty().append('<option value="">Seleccione una carrera</option>');
                    $.each(response.data, function (_, carrera) {
                        $select.append(
                            $('<option></option>')
                                .val(carrera.id)
                                .text(carrera.nombrE_CARRERA)
                        );
                    });
                },
                error: function (xhr, status, error) {
                    Toast.error('Error al cargar las carreras: ' + error);
                }
            });
        }

        cargarCarreras();

        $('#modalUsuario').on('show.bs.modal', function () {
            cargarCarreras();
        });
    });

    $(function () {
        $('#formUsuario').on('submit', function (e) {
            e.preventDefault();
            const user = {
                Email: $('#email').val(),
                Password: $('#password').val(),
                Nombre: $('#nombre').val(),
                Apellido: $('#apellido').val(),
                CarreraId: parseInt($('#carrera').val()) || null,
                Matricula: parseInt($('#matricula').val()),
                RolId: parseInt($('#rol').val()) || null,
                Genero: $('#genero').val()
            };

            $.ajax({
                url: '/Users/CreateUser',
                type: 'POST',
                contentType: 'application/json;',
                dataType: 'json',
                data: JSON.stringify(user),
                success: function (result) {
                    if (result.value.mensaje) {
                        $('#modalUsuario').modal('hide');
                        Toast.success(result.value.mensaje);
                        window.tablaUsuarios.ajax.reload(null, false);
                    } else {
                        Toast.error('Error: ' + result.message);
                    }
                },
                error: function (xhr, status, error) {
                    Toast.error('Error al crear usuario: ' + error);
                }
            });
        });
    });

});
