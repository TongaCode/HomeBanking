//Validar deposito

const validarDeposito = (req, res, next) => {
    const problemas = [];
    const { email, operacion, cuenta, monto } = req.body;
    const expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const expSoloLetras = /^[A-Za-z\s]*$/;
    const expSoloNumeros = /^\d+$/;


     //Validacion email
     if (!email || (email.trim() === '')) {
        problemas.push('El campo Email esta vacio!.');
    } else if (!expEmail.test(email.trim())) {
        problemas.push('El formato del mail es incorrecto.');
    };

    //Validacion operacion
    if (!operacion || (operacion.trim()) === '') {
        problemas.push('El campo Operacion esta vacio!.');
    } else if (operacion != 'deposito') {
        problemas.push('El campo Operacion es incorrecto, debe ingresar deposito!.');
    };

    //Validacion cuenta
    if (!cuenta || (cuenta.trim() === '')) {
        problemas.push('El campo Cuenta esta vacio!.');
    } else if (!expSoloLetras.test(cuenta.trim())) {
        problemas.push('El campo Cuenta es incorrecto, debe ingresar solo letras!.');
    }else if(cuenta !== 'cajaAhorroPesos' && cuenta !== 'cajaAhorroDolares' && cuenta !== 'cuentaCorrientePesos' && cuenta !== 'cuentaCorrienteDolares' ){
        problemas.push('La cuenta no existe!, ingrese una cuenta valida!.');
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

    next();
};

module.exports = validarDeposito;