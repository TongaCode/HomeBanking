const mongoose = require('mongoose');
const { generarCBU, generarNumeroAleatorio } = require('../util/util');

//Creo el schema del usuario
const usuarioSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    email: { type: String, required: true, },
    contraseña: { type: String, required: true },
    cbu: { type: String, default: generarCBU }, //Genera numeros aleatorios para el cbu.
    numeroCuentaPesos: { type: String },
    numeroCuentaDolares: { type: String },
    cajaAhorroPesos: { type: Number },
    cajaAhorroDolares: { type: Number },
    cuentaCorrientePesos: { type: Number },
    historialTransacciones: { type: Array }
}, { versionKey: false });//Para sacar el __V de los documentos que guardo.

//Hook pre-save para generar números de cuenta antes de guardar y darle el mismo numero de cuenta a los dos.
usuarioSchema.pre('save', function(next) {
    if (this.isNew || this.isModified('numeroCuentaPesos')) {
        const numero = generarNumeroAleatorio(10);
        this.numeroCuentaPesos = `cta$-${numero}`;
        this.numeroCuentaDolares = `cta$usd-${numero}`;
    }
    next();
});


module.exports = usuarioSchema;
