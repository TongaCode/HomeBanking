const mongoose = require('mongoose');
const { format } = require('date-fns');
const usuarioSchema = require('../schema/usuarioSchema');

//Metodos separados por operacion.
usuarioSchema.methods.depositoCajaAhorroPesos = async function (monto) {
    try {
        const operacion = 'Deposito Pesos';

        this.cajaAhorroPesos += monto;

        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error(`Error al realizar la operacion. ` + error.message);
    };
};

usuarioSchema.methods.depositoCajaAhorroDolares = async function (monto) {
    try {
        const operacion = 'Deposito Dolares';

        this.cajaAhorroDolares += monto;

        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error(`Error al realizar la operacion. ` + error.message);
    };
};

usuarioSchema.methods.depositoCuentaCorriente = async function (monto) {
    try {
        const operacion = 'Cuenta Corriente Deposito';

        this.cuentaCorrientePesos += monto;

        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error(`Error al realizar la operacion. ` + error.message);
    };
};

usuarioSchema.methods.extraccionCajaAhorroPesos = async function (monto) {

    try {
        const operacion = 'Extraccion Pesos';

        if (this.cajaAhorroPesos < monto) {
            throw new Error('No tienes fondos para realizar esta extraccion!.');
        };

        this.cajaAhorroPesos -= monto;

        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error(`Error al realizar la operacion. ` + error.message);
    };
};

usuarioSchema.methods.extraccionCajaAhorroDolares = async function (monto) {
    try {
        const operacion = 'Extraccion Dolares';

        if (this.cajaAhorroDolares < monto) {
            throw new Error('No tienes fondos para realizar esta extraccion!.');
        };

        this.cajaAhorroDolares -= monto;

        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error(`Error al realizar la operacion. ` + error.message);
    };
};

usuarioSchema.methods.extraccionCuentaCorriente = async function (monto) {

    try {
        const operacion = 'Extraccion Cuenta Corriente';

        if (this.cuentaCorrientePesos === -1500) {
            throw new Error('Alcanzo su negativo permitido!, debe realizar un deposito!.');
        }else if(this.cuentaCorrientePesos - monto < -1500){
            throw new Error('Debe ingresar un monto menor, supera el negativo de -1500 pesos!.');
        };

        this.cuentaCorrientePesos -= monto;

        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error(`Error al realizar la operacion. ` + error.message);
    };
};

usuarioSchema.methods.transferirCajaAhorroPesos = async function (cuentaEmisor, cuentaDestinatario, monto) {

    try {
        const operacion = 'Transferencia pesos'

        const usuarioDestinatario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaDestinatario });


        if (!usuarioDestinatario) {
            throw new Error('El usuario no existe!, o el numero de cuenta es invalido!.')
        };

        if (this.cajaAhorroPesos < monto) {
            throw new Error('No tienes fondos para realizar esta transferecia!.');
        };

        this.cajaAhorroPesos -= monto;
        usuarioDestinatario.cajaAhorroPesos += monto;


        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        this.historialTransacciones.push({ operacion, monto, cuentaDestinatario, fecha: fechaFormateada });
        usuarioDestinatario.historialTransacciones.push({ operacion, monto, cuentaEmisor, fecha: fechaFormateada });
        const transaccionEmisor = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.

        await this.save();
        await usuarioDestinatario.save();

        return transaccionEmisor;
    } catch (error) {
        throw new Error('No se puede realizar la operacion ' + error.message);
    };

};

usuarioSchema.methods.transferirCajaAhorroDolares = async function (cuentaEmisor, cuentaDestinatario, monto) {

    try {
        const operacion = 'Transferencia dolares'

        if (!usuarioDestinatario) {
            throw new Error('El usuario no existe!, o el numero de cuenta es invalido!.');
        };

        if (this.cajaAhorroDolares < monto) {
            throw new Error('No tienes fondos para realizar esta transferecia!.');
        };

        this.cajaAhorroDolares -= monto;
        usuarioDestinatario.cajaAhorroDolares += monto;


        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        this.historialTransacciones.push({ operacion, monto, cuentaDestinatario, fecha: fechaFormateada });
        usuarioDestinatario.historialTransacciones.push({ operacion, monto, cuentaEmisor, fecha: fechaFormateada });
        const transaccionEmisor = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.

        await this.save();
        await usuarioDestinatario.save();

        return transaccionEmisor;
    } catch (error) {
        throw new Error('No se puede realizar la operacion ' + error.message);
    };

};

usuarioSchema.methods.transferirCuentaCorriente = async function (cuentaEmisor, cuentaDestinatario, monto) {

    try {
        const operacion = 'Transferencia Cuenta Corriente'

        const usuarioDestinatario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaDestinatario });

        if (this.cuentaCorrientePesos - monto < -1500) {
            throw new Error('Excede el negativo permitido de -1500, ingrese un monto menor!.');
        };

        this.cuentaCorrientePesos -= monto;
        usuarioDestinatario.cuentaCorrientePesos += monto;


        // Formateo la fecha y la inserto automaticamente.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        this.historialTransacciones.push({ operacion, monto, cuentaDestinatario, fecha: fechaFormateada });
        usuarioDestinatario.historialTransacciones.push({ operacion, monto, cuentaEmisor, fecha: fechaFormateada });
        const transaccionEmisor = this.historialTransacciones.at(-1);//at-1 para que no salga todo el array completo.

        await this.save();
        await usuarioDestinatario.save();

        return transaccionEmisor;
    } catch (error) {
        throw new Error('No se puede realizar la operacion ' + error.message);
    };

};

usuarioSchema.methods.comprarDolares = async function (monto) {

    try {
        const operacion = 'Compra de dolares';

        if (this.cajaAhorroPesos < monto * 1000) {
            throw new Error('No tiene fondos suficientes');
        };

        this.cajaAhorroDolares += monto;
        this.cajaAhorroPesos -= monto * 1000;

        //Agrego fecha formateada.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error('No se pudo realizar la operacion!.' + error.message);
    };

};

usuarioSchema.methods.venderDolares = async function (monto) {

    try {
        const operacion = 'Venta de dolares'

        if (this.cajaAhorroDolares < monto) {
            throw new Error('No tiene fondos suficientes');
        } else if (monto < 10) {
            throw new Error('La venta minima es de 10 dolares!.');
        };

        this.cajaAhorroDolares -= monto;
        this.cajaAhorroPesos += monto * 1000;

        //Agrego fecha formateada.
        const fechaFormateada = format(new Date(), 'dd/MM/yyyy HH:mm:ss');
        await this.historialTransacciones.push({ operacion, monto, fecha: fechaFormateada });
        const transaccion = this.historialTransacciones.at(-1);
        await this.save();

        return transaccion;
    } catch (error) {
        throw new Error('No se pudo realizar la operacion!.' + error.message);
    };

};

//Guardo el modelo
const UsuarioModel = mongoose.model('usuarios', usuarioSchema);

module.exports = UsuarioModel;