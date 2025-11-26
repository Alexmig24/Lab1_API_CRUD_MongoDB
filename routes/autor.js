const express = require('express');
const router = express.Router();
const Autor = require('../models/autor');

// Obtener todos los autores
router.get('/', async (req, res) => {
    try {
        const autores = await Autor.find();
        res.json(autores);
    } catch (error) {
        console.error('Error al obtener los autores:', error);
        res.status(500).json({ error: 'Error al obtener los autores' });
    }
});

//  Obtener un autor por ID
router.get('/:id', async (req, res) => {
    try {
        const autor = await Autor.findById(req.params.id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.json(autor);
    } catch (error) {
        console.error('Error al obtener el autor:', error);
        res.status(500).json({ error: 'Error al obtener el autor' });
    }
});

//  Crear un nuevo autor
router.post('/', async (req, res) => {
    try {
        const { nombre, nacionalidad } = req.body;
        const autor = new Autor({ nombre, nacionalidad });
        await autor.save();
        res.status(201).json(autor);
    } catch (error) {
        console.error('Error al crear el autor:', error);
        res.status(500).json({ error: 'Error al crear el autor' });
    }
});

//  Actualizar un autor
router.put('/:id', async (req, res) => {
    try {
        const { nombre, nacionalidad } = req.body;
        const autor = await Autor.findByIdAndUpdate(
            req.params.id,
            { nombre, nacionalidad },
            { new: true, runValidators: true }
        );
        
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.json(autor);
    } catch (error) {
        console.error('Error al actualizar el autor:', error);
        res.status(500).json({ error: 'Error al actualizar el autor' });
    }
});

//  Eliminar un autor
router.delete('/:id', async (req, res) => {
    try {
        const autor = await Autor.findByIdAndDelete(req.params.id);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no encontrado' });
        }
        res.json({ message: 'Autor eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el autor:', error);
        res.status(500).json({ error: 'Error al eliminar el autor' });
    }
});

module.exports = router;