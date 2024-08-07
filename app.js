const express = require('express');
const mongoose = require('mongoose');
const UsuarioModel = require('./models/usuarioModel');
const crearUsuario = require('./functionUsuario.js/crearUsuario');
const validarCrearUsuario = require('./validators/validarCrearUsuario');
const validarTransferencia = require('./validators/ValidarTransferencia');
const validarDepositoExtraccion = require('./validators/validarDepositoExtraccion');
const validarBuscarUsuario = require('./validators/validarBuscarUsuario');
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Conectar a la base de datos MongoDB
const url = 'mongodb://localhost/homebanking';
mongoose.connect(url, {

})
    .then(() => console.log('Conectado a MongoDB'))
    .catch(err => console.error('Error al conectar a MongoDB:', err));

// Rutas
app.post('/crearUsuario', validarCrearUsuario, async (req, res) => {
    try {
        const { nombre, apellido, email, contraseña } = req.body;

        const user = await UsuarioModel.findOne({ email: email });

        if (user) {
            return res.status(400).json({ error: `El email ${email} ya existe!` });
        };

        const usuarioCreado = await crearUsuario(nombre, apellido, email, contraseña);
        return res.status(201).json({ usuarioCreado });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.get('/buscarUsuario', validarBuscarUsuario, async (req, res) => {

    try {
        const { cbu } = req.body;

        const usuario = await UsuarioModel.findOne({ cbu: cbu }).select('cbu cajaAhorroPesos numeroCuentaPesos cajaAhorroDolares numeroCuentaDolares cuentaCorrientePesos');//Selecciono solo los campos que me interesan traer!.

        if (!usuario) {
            throw new Error('El CBU no existe!.');
        };

        return res.status(200).json({ usuario });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };

});

app.post('/extraccionCajaAhorroPesos', validarDepositoExtraccion, async (req, res) => {

    const { cuentaEmisor, monto } = req.body;
    try {
        const usuario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };
        const transaccion = await usuario.extraccionCajaAhorroPesos(monto);

        return res.status(200).json({ transaccion });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/extraccionCajaAhorroDolares', validarDepositoExtraccion, async (req, res) => {

    const { cuentaEmisor, monto } = req.body;
    try {
        const usuario = await UsuarioModel.findOne({ numeroCuentaDolares: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };
        const transaccion = await usuario.extraccionCajaAhorroDolares(cuentaEmisor, monto);

        return res.status(200).json({ transaccion });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/extraccionCuentaCorriente', validarDepositoExtraccion, async (req, res) => {

    const { cuentaEmisor, monto } = req.body;
    try {
        const usuario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };
        const transaccion = await usuario.extraccionCuentaCorriente(monto);

        return res.status(200).json({ transaccion });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/depositoCajaAhorroPesos', validarDepositoExtraccion, async (req, res) => {

    try {
        const { cuentaEmisor, monto } = req.body;

        const usuario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.depositoCajaAhorroPesos(cuentaEmisor, monto);

        return res.status(200).json({ transaccion });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/depositoCajaAhorroDolares', validarDepositoExtraccion, async (req, res) => {

    try {
        const { cuentaEmisor, monto } = req.body;

        const usuario = await UsuarioModel.findOne({ numeroCuentaDolares: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.depositoCajaAhorroDolares(cuentaEmisor, monto);

        return res.status(200).json({ transaccion });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/depositoCuentaCorriente', validarDepositoExtraccion, async (req, res) => {

    try {
        const { cuentaEmisor, monto } = req.body;

        const usuario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.depositoCuentaCorriente(monto);

        return res.status(200).json({ transaccion });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/transferirCajaAhorroPesos', validarTransferencia, async (req, res) => {
    const { cuentaEmisor, cuentaDestinatario, monto } = req.body;

    try {
        const usuario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.transferirCajaAhorroPesos(cuentaEmisor, cuentaDestinatario, monto);

        return res.status(200).json({ transaccion });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/transferirCajaAhorroDolares', validarTransferencia, async (req, res) => {
    const { cuentaEmisor, cuentaDestinatario, monto } = req.body;

    try {
        const usuario = await UsuarioModel.findOne({ numeroCuentaDolares: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.transferirCajaAhorroDolares(cuentaEmisor, cuentaDestinatario, monto);

        return res.status(200).json({ transaccion });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/transferirCuentaCorriente', validarTransferencia, async (req, res) => {
    const { cuentaEmisor, cuentaDestinatario, monto } = req.body;

    try {
        const usuario = await UsuarioModel.findOne({ numeroCuentaPesos: cuentaEmisor });

        if (!usuario) {
            console.log(usuario);
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.transferirCuentaCorriente(cuentaEmisor, cuentaDestinatario, monto);

        return res.status(200).json({ transaccion });

    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/comprarDolares', async (req, res) => {
    try {
        const { cuentaEmisor, monto } = req.body

        const usuario = await UsuarioModel.findOne({ numeroCuentaDolares: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.comprarDolares(monto);

        return res.status(200).json({ transaccion });


    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

app.post('/venderDolares', async (req, res) => {
    try {
        const { cuentaEmisor, monto } = req.body

        const usuario = await UsuarioModel.findOne({ numeroCuentaDolares: cuentaEmisor });

        if (!usuario) {
            throw new Error('El usuario no existe!.');
        };

        const transaccion = await usuario.venderDolares(monto);

        return res.status(200).json({ transaccion });


    } catch (error) {
        return res.status(400).json({ error: error.message });
    };
});

//Configuración del servidor
//Capturar error de json mal formado
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        // Error de JSON mal formado
        return res.status(400).json({ error: 'JSON mal formado' });
    }
    next(); // Pasa el error al siguiente middleware si no es un error de JSON
});

//Servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
