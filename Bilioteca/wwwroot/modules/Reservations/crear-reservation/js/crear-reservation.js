$(function () {
    // Datos de ejemplo
    const datos = [
        { id: 1, cliente: 'Ana Gutiérrez', libro: 'El Quijote', inicio: '2025-04-01', fin: '2025-04-10', estado: 'Activo' },
        { id: 2, cliente: 'Luis Martínez', libro: '1984', inicio: '2025-04-05', fin: '2025-04-12', estado: 'Reservado' },
        { id: 3, cliente: 'María Pérez', libro: 'Cien Años…', inicio: '2025-04-08', fin: '2025-04-15', estado: 'Completado' }
    ];

    // Inicializar DataTable
    const tabla = $('#tablaReservas').DataTable({
        data: datos,
        columns: [
            { data: 'id' },
            { data: 'cliente' },
            { data: 'libro' },
            { data: 'inicio' },
            { data: 'fin' },
            {
                data: 'estado', render: s => {
                    const map = {
                        Reservado: 'badge-reserved',
                        Activo: 'badge-active',
                        Completado: 'badge-complete'
                    };
                    return `<span class="badge ${map[s]}">${s}</span>`;
                }
            },
            {
                data: null, orderable: false, render: (_, __, row) => `
                  <button class="btn btn-sm btn-warning btnEditar" data-id="${row.id}" title="Editar">
                    <i class="bi bi-pencil"></i>
                  </button>
                  <button class="btn btn-sm btn-danger btnEliminar" data-id="${row.id}" title="Eliminar">
                    <i class="bi bi-trash"></i>
                  </button>`
            }
        ]
    });

    // Abrir modal Nueva Reserva (se asocia automáticamente con data-bs-attrs)

    // Crear nueva reserva
    $('#formNuevaReserva').submit(function (e) {
        e.preventDefault();
        const nueva = {
            id: tabla.data().count() + 1,
            cliente: $('#n_resCliente').val(),
            libro: $('#n_resLibro').val(),
            inicio: $('#n_resInicio').val(),
            fin: $('#n_resFin').val(),
            estado: 'Reservado'
        };
        tabla.row.add(nueva).draw();
        $(this).trigger('reset');
        $('#modalNuevaReserva').modal('hide');
    });
});