// wwwroot/js/toast-setup.js
const _Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    iconColor: 'white',
    customClass: { popup: 'colored-toast' },
    showConfirmButton: false,
    timer: 1500,
    timerProgressBar: true,
});  // Configuración base de Toast :contentReference[oaicite:13]{index=13}

const Toast = {};
['success', 'error', 'warning', 'info', 'question'].forEach(type => {
    Toast[type] = message => _Toast.fire({ icon: type, title: message });
});

// Opcional: exponer a nivel global
window.Toast = Toast;
