const express = require('express');
const router = express.Router();
const Genero = require('../models/genero');

//  Obtener todos los géneros
router.get('/', async (req, res) => {
    try {
        const generos = await Genero.find();
        res.json(generos);
    } catch (error) {
        console.error('Error al obtener los géneros:', error);
        res.status(500).json({ error: 'Error al obtener los géneros' });
    }
});

//  Obtener un género por ID
router.get('/:id', async (req, res) => {
    try {
        const genero = await Genero.findById(req.params.id);
        if (!genero) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }
        res.json(genero);
    } catch (error) {
        console.error('Error al obtener el género:', error);
        res.status(500).json({ error: 'Error al obtener el género' });
    }
});

//  Crear un nuevo género
router.post('/', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const genero = new Genero({ nombre, descripcion });
        await genero.save();
        res.status(201).json(genero);
    } catch (error) {
        console.error('Error al crear el género:', error);
        res.status(500).json({ error: 'Error al crear el género' });
    }
});

//  Actualizar un género
router.put('/:id', async (req, res) => {
    try {
        const { nombre, descripcion } = req.body;
        const genero = await Genero.findByIdAndUpdate(
            req.params.id,
            { nombre, descripcion },
            { new: true, runValidators: true }
        );
        
        if (!genero) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }
        res.json(genero);
    } catch (error) {
        console.error('Error al actualizar el género:', error);
        res.status(500).json({ error: 'Error al actualizar el género' });
    }
});

//  Eliminar un género
router.delete('/:id', async (req, res) => {
    try {
        const genero = await Genero.findByIdAndDelete(req.params.id);
        if (!genero) {
            return res.status(404).json({ error: 'Género no encontrado' });
        }
        res.json({ message: 'Género eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el género:', error);
        res.status(500).json({ error: 'Error al eliminar el género' });
    }
});

module.exports = router;