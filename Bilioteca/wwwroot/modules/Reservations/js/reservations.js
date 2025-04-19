
$(function () {
    // Datos de prueba
    const datos = [
        { id: 1, cliente: 'Ana Gutiérrez', libro: 'El Quijote', inicio: '2025-04-01', fin: '2025-04-10', estado: 'Activo' },
        { id: 2, cliente: 'Luis Martínez', libro: '1984', inicio: '2025-04-05', fin: '2025-04-12', estado: 'Reservado' },
        { id: 3, cliente: 'María Pérez', libro: 'Cien Años...', inicio: '2025-04-08', fin: '2025-04-15', estado: 'Completado' },
        { id: 4, cliente: 'Carlos Ruiz', libro: 'Fahrenheit 451', inicio: '2025-04-10', fin: '2025-04-18', estado: 'Cancelado' }
    ];

    // Inicializa DataTable
    const tabla = $('#tablaReservas').DataTable({
        data: datos,
        columns: [
            { data: 'id' },
            { data: 'cliente' },
            { data: 'libro' },
            { data: 'inicio' },
            { data: 'fin' },
            {
                data: 'estado',
                render: s => {
                    const map = {
                        Reservado: 'badge-reserved',
                        Activo: 'badge-active',
                        Completado: 'badge-complete',
                        Cancelado: 'badge-cancel'
                    };
                    return `<span class="badge ${map[s] || 'bg-secondary'}">${s}</span>`;
                }
            },
            {
                data: null, orderable: false,
                render: function (_, __, row) {
                    return `
            <div class="btn-group" role="group">
              <button class="btn btn-sm btn-outline-primary btnEditar" data-id="${row.id}"
                title="Editar"><i class="bi bi-pencil"></i></button>
              <button class="btn btn-sm btn-outline-success btnFinalizar" data-id="${row.id}"
                title="Finalizar"><i class="bi bi-check2"></i></button>
              <button class="btn btn-sm btn-outline-danger btnCancelar" data-id="${row.id}"
                title="Cancelar"><i class="bi bi-x"></i></button>
            </div>`;
                }
            }
        ]
    });

    let seleccionado = null;

    // Editar
    $('#tablaReservas tbody').on('click', '.btnEditar', function () {
        seleccionado = tabla.row($(this).closest('tr')).data();
        $('#resId').val(seleccionado.id);
        $('#resCliente').val(seleccionado.cliente);
        $('#resLibro').val(seleccionado.libro);
        $('#resInicio').val(seleccionado.inicio);
        $('#resFin').val(seleccionado.fin);
        new bootstrap.Modal($('#modalEditar')).show();
    });

    // Finalizar
    $('#tablaReservas tbody').on('click', '.btnFinalizar', function () {
        seleccionado = tabla.row($(this).closest('tr')).data();
        new bootstrap.Modal($('#modalFinalizar')).show();
    });
    $('#btnDoFinalizar').click(function () {
        seleccionado.estado = 'Completado';
        tabla.row(function (idx, data) { return data.id === seleccionado.id; })
            .data(seleccionado).draw(false);
        $('#modalFinalizar').modal('hide');
    });

    // Cancelar
    $('#tablaReservas tbody').on('click', '.btnCancelar', function () {
        seleccionado = tabla.row($(this).closest('tr')).data();
        new bootstrap.Modal($('#modalCancelar')).show();
    });

    $('#btnDoCancelar').click(function () {
        seleccionado.estado = 'Cancelado';
        tabla.row(function (idx, data) { return data.id === seleccionado.id; })
            .data(seleccionado).draw(false);
        $('#modalCancelar').modal('hide');
    });

    // Guardar edición
    $('#formEditar').submit(function (e) {
        e.preventDefault();
        seleccionado.cliente = $('#resCliente').val();
        seleccionado.libro = $('#resLibro').val();
        seleccionado.inicio = $('#resInicio').val();
        seleccionado.fin = $('#resFin').val();
        tabla.row(function (idx, data) { return data.id === seleccionado.id; })
            .data(seleccionado).draw(false);
        $('#modalEditar').modal('hide');
    });
});