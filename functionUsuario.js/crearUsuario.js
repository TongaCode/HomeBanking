const UsuarioModel = require('../models/usuarioModel');
// Función para crear un nuevo usuario
const crearUsuario = async (nombre, apellido, email, contraseña) => {


    try {
        const usuario = new UsuarioModel({
            nombre,
            apellido,
            email,
            contraseña,
            cajaAhorroPesos: 1000, // Ejemplo de valores por defecto
            cuentaCorrientePesos: 0,
            cajaAhorroDolares: 1000,
            historialTransacciones: []
        });

        const resultado = await usuario.save();
        return resultado;
    } catch (error) {
        throw new Error('Error al crear usuario: ' + error.message);
    };
};

module.exports = crearUsuario;