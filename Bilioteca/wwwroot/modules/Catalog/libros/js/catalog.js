$(document).ready(function () {
    var table = $('#catalogoLibros').DataTable({
        ajax: {
            url: '/Catalog/GetAllBook',
            type: 'GET',
            dataSrc: ''
        },
        columns: [
            { data: 'id', visible: false },
            { data: 'titulo' },
            { data: 'autor' },
            { data: 'cantidad' },
            { data: 'isbn' },
            { data: 'ubicacion' },
            {
                data: null,
                render: function (data, type, row) {
                    return `
                      <button class="btn btn-sm btn-outline-primary btn-edit" data-id="${row.id}">
                        <i class="bi bi-pencil"></i>
                      </button>
                      <button class="btn btn-sm btn-outline-danger btn-delete" data-id="${row.id}">
                        <i class="bi bi-trash"></i>
                      </button>
                    `;
                }
            }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json'
        }
    });

    // Abrir modal al clicar editar
    $('#catalogoLibros tbody').on('click', '.btn-edit', function () {
        var data = table.row($(this).closest('tr')).data();
        // Rellenar formulario
        $('#edit-id').val(data.id);
        $('#edit-titulo').val(data.titulo);
        $('#edit-autor').val(data.autor);
        $('#edit-cantidad').val(data.cantidad);
        $('#edit-isbn').val(data.isbn);
        $('#edit-ubicacion').val(data.ubicacion);
        // Mostrar modal
        var modal = new bootstrap.Modal(document.getElementById('editBookModal'));
        modal.show();
    });

    // Enviar formulario de edición
    $('#editBookForm').on('submit', function (e) {
        e.preventDefault();
        var id = $('#edit-id').val();
        var updatedBook = {
            id: id,
            titulo: $('#edit-titulo').val(),
            autor: $('#edit-autor').val(),
            cantidad: $('#edit-cantidad').val(),
            isbn: $('#edit-isbn').val(),
            ubicacion: $('#edit-ubicacion').val()
        };

        $.ajax({
            url: `/Catalog/UpdateBook/${id}`,
            type: 'PUT',
            contentType: 'application/json',
            data: JSON.stringify(updatedBook),
            success: function (response) {
                table.ajax.reload(null, false);
                bootstrap.Modal.getInstance(document.getElementById('editBookModal')).hide();
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'success',
                    title: response.message || 'Libro actualizado correctamente.',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            },
            error: function (xhr) {
                var errorMessage = 'Error al actualizar el libro.';
                if (xhr.responseJSON && xhr.responseJSON.message) {
                    errorMessage = xhr.responseJSON.message;
                }
                Swal.fire({
                    toast: true,
                    position: 'top-end',
                    icon: 'error',
                    title: errorMessage,
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true
                });
            }
        });
    });

    // Manejo de borrado (mantener tu código previo)
    $('#catalogoLibros tbody').on('click', '.btn-delete', function () {
        var button = $(this);
        var row = button.closest('tr');
        var data = table.row(row).data();
        var id = data.id;
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                $.ajax({
                    url: `/Catalog/DeleteBook/${id}`,
                    type: 'DELETE',
                    success: function (response) {
                        table.row(row).remove().draw();
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'success',
                            title: response.message || 'Libro eliminado correctamente.',
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                    },
                    error: function (xhr) {
                        var errorMessage = 'No se pudo eliminar el libro.';
                        if (xhr.responseJSON && xhr.responseJSON.message) {
                            errorMessage = xhr.responseJSON.message;
                        }
                        Swal.fire({
                            toast: true,
                            position: 'top-end',
                            icon: 'error',
                            title: errorMessage,
                            showConfirmButton: false,
                            timer: 3000,
                            timerProgressBar: true
                        });
                    }
                });
            }
        });
    });
});