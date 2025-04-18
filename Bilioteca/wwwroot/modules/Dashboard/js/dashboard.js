// Datos de ejemplo
const datosKPI = {
    ventas: 1200,
    usuarios: 350,
    ingresos: 75000
};

// Actualizar las tarjetas KPI
document.getElementById('ventasKPI').textContent = datosKPI.ventas;
document.getElementById('usuariosKPI').textContent = datosKPI.usuarios;
document.getElementById('ingresosKPI').textContent = `$${datosKPI.ingresos.toLocaleString()}`;

// Configuración de los gráficos
const ventasCtx = document.getElementById('ventasChart').getContext('2d');
const usuariosCtx = document.getElementById('usuariosChart').getContext('2d');
const ingresosCtx = document.getElementById('ingresosChart').getContext('2d');

const ventasChart = new Chart(ventasCtx, {
    type: 'bar',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Ventas',
            data: [120, 150, 180, 200, 170, 190],
            backgroundColor: 'rgba(54, 162, 235, 0.6)'
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const usuariosChart = new Chart(usuariosCtx, {
    type: 'line',
    data: {
        labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
        datasets: [{
            label: 'Usuarios',
            data: [30, 45, 60, 50, 70, 65],
            borderColor: 'rgba(255, 99, 132, 1)',
            fill: false
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

const ingresosChart = new Chart(ingresosCtx, {
    type: 'doughnut',
    data: {
        labels: ['Producto A', 'Producto B', 'Producto C'],
        datasets: [{
            label: 'Ingresos',
            data: [30000, 25000, 20000],
            backgroundColor: [
                'rgba(255, 206, 86, 0.6)',
                'rgba(75, 192, 192, 0.6)',
                'rgba(153, 102, 255, 0.6)'
            ]
        }]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false
    }
});

