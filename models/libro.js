const mongoose = require('mongoose');

const libroSchema = new mongoose.Schema({
    titulo: {
        type: String,
        required: true,
        trim: true
    },
    editorial: {
        type: String,
        trim: true
    },
    id_autor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Autor',
        required: true
    },
    id_genero: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Genero',
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Libro', libroSchema);