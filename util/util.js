
// Función para generar un número aleatorio
function generarNumeroAleatorio(longitud) {
    let numero = '';
    for (let i = 0; i < longitud; i++) {
        numero += Math.floor(Math.random() * 10);
    }
    return numero;
};

// Función para generar CBU aleatorio
function generarCBU() {
    return `CBU-${generarNumeroAleatorio(22)}`; // Un CBU en Argentina tiene 22 dígitos
};

module.exports = { generarNumeroAleatorio, generarCBU};