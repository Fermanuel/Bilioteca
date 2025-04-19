
$(document).ready(function () {
    $('.counter').each(function () {
        var $this = $(this),
            countTo = parseInt($this.text().replace(/,/g, ''), 10);
        $({ countNum: 0 }).animate({ countNum: countTo }, {
            duration: 2000,
            easing: 'swing',
            step: function () {
                $this.text(Math.floor(this.countNum).toLocaleString());
            },
            complete: function () {
                $this.text(this.countNum.toLocaleString());
            }
        });
    });
});


$(document).ready(function () {
    // Gráfica de Préstamos Mensuales
    var lineCtx = $('#lineChart');
    new Chart(lineCtx, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Préstamos',
                data: [120, 150, 180, 200, 170, 190],
                backgroundColor: 'rgba(74, 144, 226, 0.2)',
                borderColor: 'rgba(74, 144, 226, 1)',
                borderWidth: 2,
                tension: 0.4
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true,
                    position: 'top'
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: '#eaeaea'
                    },
                    beginAtZero: true
                }
            }
        }
    });

    // Gráfica de Préstamos por Categoría
    var barCtx = $('#barChart');
    new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: ['Ficción', 'No Ficción', 'Ciencia', 'Historia', 'Arte'],
            datasets: [{
                label: 'Préstamos',
                data: [300, 150, 200, 180, 120],
                backgroundColor: [
                    'rgba(74, 144, 226, 0.8)',
                    'rgba(80, 227, 194, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(153, 102, 255, 0.8)'
                ],
                borderColor: [
                    'rgba(74, 144, 226, 1)',
                    'rgba(80, 227, 194, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(153, 102, 255, 1)'
                ],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    grid: {
                        color: '#eaeaea'
                    },
                    beginAtZero: true
                }
            }
        }
    });
});
