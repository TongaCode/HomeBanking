//Validar Buscar usuario

const validarBuscarUsuario = (req, res, next) => {
    const problemas = [];
    const { cbu } = req.body;
    const validarCbu = /^CBU-\d{22}$/;


    //Validar cbu.
    if (cbu.trim() === '') {
         problemas.push('El campo CBU  esta vacio!.');
    };

    if (!validarCbu.test(cbu)) {
        problemas.push('El formato del cbu es incorrecto, ingrese un CBU valido!.');
    };



    if (problemas.length > 0) {
        return res.status(400).json({ problemas });
    };

    next();
};

module.exports = validarBuscarUsuario;