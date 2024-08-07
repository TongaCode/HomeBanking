//Validar extraccion

const validarExtraccionCajaAhorroPesos = (req, res, next) => {
    const { cuentaEmisor, monto } = req.body;
    const prefijoPesos = /^cta\$-/;    // Verificar 'cta$-'

    let problemas = [];

    if (!cuentaEmisor || (cuentaEmisor.trim() === '')) {
        problemas.push('El campo Cuenta emisor esta vacio!.');
    } else if (!prefijoPesos.test(cuentaEmisor.trim())) {
        problemas.push('El numero de cuenta no es correcto, ingrese un numero de cuenta en pesos!.');
    };


    if (!monto) {
        problemas.push('Monto esta vacio!, ingrese un monto!.');
    } else if (typeof monto !== 'number') {
        problemas.push('El campo monto solo puede ingresar numeros!.');
    };

    if (monto === 0) {
        problemas.push('Debe ingresar un monto para extraer!.');
    } else if (monto < 0) {
        problemas.push('Debe ingresar un monto para extraer!, el monto no puede ser un numero negativo!.');
    };

    if (problemas.length > 0) {
        return res.status(400).json({ error: problemas });
    };
    next();

};

module.exports = validarExtraccionCajaAhorroPesos;