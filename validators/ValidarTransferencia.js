//Validad tranferencia.

const validarTransferencia = (req, res, next) => {
    const problemas = [];
    const { cuentaEmisor, cuentaDestinatario, monto } = req.body;
    const expSoloNumeros = /^\d+$/;
    const prefijoPesos = /^cta\$-/;    // Verificar 'cta$-'
    const prefijoDolares = /^cta\$usd-/; // Verificar 'cta$usd-'

    //Validacion emisor
    if (!cuentaEmisor || (cuentaEmisor.trim() === '')) {
        problemas.push('El campo Emisor esta vacio!.');
    } else if (!expEmail.test(cuentaEmisor.trim())) {
        problemas.push('El campo cuentaEmisor es incorrecto, debe ingresar un formato de email!.');
    };

    //Validacion destinatario
    if (!cuentaDestinatario || (cuentaDestinatario.trim() === '')) {
        problemas.push('El campo Destinatario esta vacio!.');
    } else if (!expEmail.test(cuentaDestinatario.trim())) {
        problemas.push('El campo Destinatario es incorrecto, debe ingresar un formato de email!.');
    };

    //Validacion monto
    if (!monto) {
        problemas.push('El campo Monto esta vacio!.');
    } else if (!expSoloNumeros.test(monto)) {
        problemas.push('El campo Monto es incorrecto, debe ingresar solo numeros!.');
    };

    if (problemas.length > 0) {
        return res.status(400).json({ error: problemas })
    };

    if (!prefijoPesos.test(cuentaEmisor)) {
        problemas.push('Cuenta Emisor invalida!, ingrese una cuenta valida.');
    } else if (prefijoDolares.test(cuentaDestinatario)) {
        problemas.push('Cuenta Destinatario invalida!, ingrese una cuenta valida.');
    };

    next();
};

module.exports = validarTransferencia;