//validar usuario
const validarCrearUsuario = (req, res, next) => {

    const problemas = [];


    const { nombre, apellido, email, contraseña } = req.body;

    //Expresiones Regulares
    const expSoloLetras = /^[A-Za-z\s]*$/;
    const expEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validación del JSON vacío
    if (req.body === undefined || Object.keys(req.body).length === 0) {
        problemas.push('El JSON está vacío.');
    };

    //Validacion Nombre
    if (!nombre || (nombre.trim() === '')) {
        problemas.push('El campo Nombre está vacío.');
    } else if (!expSoloLetras.test(nombre.trim())) {
        problemas.push('El campo Nombre solo puede ingresar letras.');
    }

    //Validacion Apellido
    if (!apellido || (apellido.trim() === '')) {
        problemas.push('El campo Apellido esta vacio!.');
    } else if (!expSoloLetras.test(apellido.trim())) {
        problemas.push('El campo Apellido solo puede ingresar letras!..');
    };

    //Validacion email
    if (!email || (email.trim() === '')) {
        problemas.push('El campo Email esta vacio!.');
    } else if (!expEmail.test(email.trim())) {
        problemas.push('El formato del mail es incorrecto.');
    };

    // Validación Contraseña
    const contraseñaTrimmed = contraseña.trim(); // Eliminar espacios al principio y al final

    if (contraseñaTrimmed === '') {
        problemas.push('El campo Contraseña está vacío.');
    } else if (contraseñaTrimmed.length < 6) {
        problemas.push('La Contraseña debe tener mínimo 6 caracteres.');
    }

    if (problemas.length > 0) {
        return res.status(400).json({ error: problemas });
    };
    next();
};

module.exports = validarCrearUsuario;