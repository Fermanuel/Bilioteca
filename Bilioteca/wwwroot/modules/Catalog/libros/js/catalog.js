$(document).ready(function () {
    $('#catalogoLibros').DataTable({
        ajax: {
            url: '/Catalog/GetAllBook',
            type: 'GET',
            dataSrc: ''
        },
        columns: [
            { data: 'titulo' },
            { data: 'autor' },
            { data: 'anio' }
        ],
        language: {
            url: '//cdn.datatables.net/plug-ins/1.13.5/i18n/es-ES.json'
        }
    });
});
