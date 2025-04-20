// Inicializa el DataTable
var table = $('#catalogoLibros').DataTable({
    ajax: {
        url: '/Catalog/GetAllBook',
        type: 'GET',
        dataSrc: ''
    },
    columns: [
        { data: 'titulo' },
        { data: 'autor' },
        { data: 'cantidad' },
        { data: 'isbn' },
        { data: 'ubicacion' },
        {
            data: null,
            render: function (data, type, row) {
                return `
                  <button class="btn btn-sm btn-outline-primary">
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

// Maneja el clic en el botón de eliminar
$('#catalogoLibros tbody').on('click', '.btn-delete', function () {
    var button = $(this);
    var row = button.closest('tr');
    var data = table.row(row).data();
    var id = data.id;

    Swal.fire({
        title: '¿Estás seguro?',
        text: "Esta acción no se puede deshacer.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Realiza la solicitud AJAX para eliminar el registro
            $.ajax({
                url: `/Catalog/DeleteBook/${id}`,
                type: 'DELETE',
                success: function (response) {
                    // Elimina la fila de la tabla
                    table.row(row).remove().draw();

                    // Muestra el mensaje del controlador en un toast
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
                    // Intenta obtener el mensaje de error del controlador
                    var errorMessage = 'No se pudo eliminar el libro.';
                    if (xhr.responseJSON && xhr.responseJSON.message) {
                        errorMessage = xhr.responseJSON.message;
                    }

                    // Muestra el mensaje de error en un toast
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

