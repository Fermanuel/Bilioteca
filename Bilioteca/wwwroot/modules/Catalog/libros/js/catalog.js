$('#catalogoLibros').DataTable({
    ajax: {
        url: '/Catalog/GetAllBook',
        type: 'GET',
        dataSrc: ''
    },
    columns: [
        { data: 'titulo' },
        { data: 'autor' },
        { data: 'genero' },
        { data: 'anio' },
        { data: 'disponibilidad' },
        { data: 'acciones' }
    ],
    columnDefs: [
        { targets: [2, 4, 5], visible: false }
    ],
    language: {
        url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json'
    }
});
