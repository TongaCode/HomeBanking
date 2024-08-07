//Validar transferencia

const validarTransferencia = (req, res, next) => {
    const { cuentaEmisor, cuentaDestinatario, monto } = req.body;
    const prefijoPesos = /^cta\$-/;
    const prefijoDolares = /^cta\$usd-/;

    let problemas = [];

    if (!cuentaEmisor || (cuentaEmisor.trim() === '')) {
        problemas.push('El campo Cuenta Emisor esta vacio!.');
    } else if (!prefijoPesos.test(cuentaEmisor.trim()) && !prefijoDolares.test(cuentaEmisor.trim())) {
        problemas.push('El numero de cuenta no es correcto!.');
    };

    if (!cuentaDestinatario || (cuentaDestinatario.trim() === '')) {
        problemas.push('El campo Cuenta Destinatario esta vacio!.');
    } else if (!prefijoPesos.test(cuentaDestinatario.trim()) && !prefijoDolares.test(cuentaDestinatario.trim())) {
        problemas.push('El numero de cuenta no es correcto!.');
    };

    if (!monto) {
        problemas.push('Monto esta vacio!, ingrese un monto!.');
    } else if (typeof monto !== 'number') {
        problemas.push('El campo monto solo puede ingresar numeros!.');
    } else if (monto === 0) {
        problemas.push('Debe ingresar un monto para Transferir!.');
    } else if (monto < 0) {
        problemas.push('Debe ingresar un monto para transferir!, el monto no puede ser un numero negativo!.');
    };

    if (problemas.length > 0) {
        return res.status(400).json({ error: problemas });
    };
    next();

};

module.exports = validarDepositoExtraccion;