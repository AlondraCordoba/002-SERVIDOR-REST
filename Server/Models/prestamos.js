const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let prestamoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Nombre del usuario que tiene el prestamo obligatorio']
    },
    apellido: {
        type: String,
        required: [true, 'Apellido del usuario que tiene el prestamo obligatorio']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'Estado del usuario que tiene el prestamo obligatorio']
    },
    estado: {
        type: Boolean,
        default: true
    },
    libro: {
        type: Schema.Types.ObjectId,
        required: [true, 'Libro requerido'],
        ref: 'Productos'
    },
    usuarioRegistro: {
        type: Schema.Types.ObjectId,
        required: [true, 'Usuario requerido'],
        ref: 'Usuario'
    }
});

module.exports = mongoose.model('Prestamo', prestamoSchema);