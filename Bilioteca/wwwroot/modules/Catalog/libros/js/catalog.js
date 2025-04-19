$('#catalogoLibros').DataTable({
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
                  <button class="btn btn-sm btn-outline-danger">
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
