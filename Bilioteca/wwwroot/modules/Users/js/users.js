$(document).ready(function () {

    const datosUsuarios = [
        {
            id: 1,
            nombre: 'Juan Pérez',
            email: 'juan.perez@example.com',
            rol: 'Administrador'
        },
        {
            id: 2,
            nombre: 'María López',
            email: 'maria.lopez@example.com',
            rol: 'Usuario'
        },
        {
            id: 3,
            nombre: 'Carlos García',
            email: 'carlos.garcia@example.com',
            rol: 'Usuario'
        }
    ];



    // Inicializar DataTable
    const tabla = $('#tablaUsuarios').DataTable({
        data: datosUsuarios,
        columns: [
            { data: 'id' },
            { data: 'nombre' },
            { data: 'email' },
            { data: 'rol' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                        <button class="btn btn-sm btn-warning btnEditar" data-id="${row.id}">
                          <i class="bi bi-pencil-square"></i>
                        </button>
                        <button class="btn btn-sm btn-danger btnEliminar" data-id="${row.id}">
                          <i class="bi bi-trash"></i>
                        </button>
                      `;
                }
            }
        ]
    });


    // Abrir modal para agregar usuario
    $('#btnAgregarUsuario').on('click', function () {
        $('#formUsuario')[0].reset();
        $('#usuarioId').val('');
        $('#modalUsuarioLabel').text('Agregar Usuario');
        $('#modalUsuario').modal('show');
    });

    // Enviar formulario para agregar o editar usuario
    $('#formUsuario').on('submit', function (e) {
        e.preventDefault();
        var id = $('#usuarioId').val();
        var url = id ? 'backend/editar_usuario.php' : 'backend/agregar_usuario.php';
        $.ajax({
            type: 'POST',
            url: url,
            data: $(this).serialize(),
            success: function (response) {
                $('#modalUsuario').modal('hide');
                tabla.ajax.reload();
            },
            error: function () {
                alert('Ocurrió un error al guardar el usuario.');
            }
        });
    });

    // Editar usuario
    $('#tablaUsuarios tbody').on('click', '.btnEditar', function () {
        var id = $(this).data('id');
        $.ajax({
            type: 'GET',
            url: 'backend/obtener_usuario.php',
            data: { id: id },
            dataType: 'json',
            success: function (data) {
                $('#usuarioId').val(data.id);
                $('#nombre').val(data.nombre);
                $('#email').val(data.email);
                $('#rol').val(data.rol);
                $('#modalUsuarioLabel').text('Editar Usuario');
                $('#modalUsuario').modal('show');
            },
            error: function () {
                alert('Ocurrió un error al obtener los datos del usuario.');
            }
        });
    });

    // Eliminar usuario
    var idEliminar = null;
    $('#tablaUsuarios tbody').on('click', '.btnEliminar', function () {
        idEliminar = $(this).data('id');
        $('#modalEliminar').modal('show');
    });

    $('#btnConfirmarEliminar').on('click', function () {
        if (idEliminar) {
            $.ajax({
                type: 'POST',
                url: 'backend/eliminar_usuario.php',
                data: { id: idEliminar },
                success: function (response) {
                    $('#modalEliminar').modal('hide');
                    tabla.ajax.reload();
                },
                error: function () {
                    alert('Ocurrió un error al eliminar el usuario.');
                }
            });
        }
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

});
