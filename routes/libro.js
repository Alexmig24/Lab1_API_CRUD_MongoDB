const express = require('express');
const router = express.Router();
const Libro = require('../models/libro');
const Autor = require('../models/autor');
const Genero = require('../models/genero');

// Obtener libros por autor
router.get("/autor/:id_autor", async (req, res) => {
    try {
        const { id_autor } = req.params;
        const libros = await Libro.find({ id_autor })
            .populate('id_autor')
            .populate('id_genero');
        
        if (libros.length === 0) {
            return res.status(404).json({ error: 'No se encontraron libros para el autor especificado' });
        }
        res.json(libros);
    } catch (error) {
        console.log('Error al obtener los libros por autor:', error);
        res.status(500).json({ error: 'Error al obtener los libros por autor' });
    }
});

//  Obtener libros por género
router.get("/genero/:id_genero", async (req, res) => {
    try {
        const { id_genero } = req.params;
        const libros = await Libro.find({ id_genero })
            .populate('id_autor')
            .populate('id_genero');
        
        if (libros.length === 0) {
            return res.status(404).json({ error: 'No se encontraron libros para el género especificado' });
        }
        res.json(libros);
    } catch (error) {
        console.log('Error al obtener los libros por género:', error);
        res.status(500).json({ error: 'Error al obtener los libros por género' });
    }
});

//  Obtener todos los libros
router.get('/', async (req, res) => {
    try {
        const libros = await Libro.find()
            .populate('id_autor')
            .populate('id_genero');
        res.json(libros);
    } catch (error) {
        console.error('Error al obtener los libros:', error);
        res.status(500).json({ error: 'Error al obtener los libros' });
    }
});

// Obtener un libro por ID
router.get('/:id', async (req, res) => {
    try {
        const libro = await Libro.findById(req.params.id)
            .populate('id_autor')
            .populate('id_genero');
        
        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.json(libro);
    } catch (error) {
        console.error('Error al obtener el libro:', error);
        res.status(500).json({ error: 'Error al obtener el libro' });
    }
});

//  Crear un nuevo libro
router.post('/', async (req, res) => {
    try {
        const { titulo, editorial, id_autor, id_genero } = req.body;
        
        // Verificar que el autor existe
        const autor = await Autor.findById(id_autor);
        if (!autor) {
            return res.status(404).json({ error: 'Autor no existe' });
        }
        
        // Verificar que el género existe
        const genero = await Genero.findById(id_genero);
        if (!genero) {
            return res.status(404).json({ error: 'Género no existe' });
        }
        
        const libro = new Libro({ titulo, editorial, id_autor, id_genero });
        await libro.save();
        
        // Populate para devolver los datos relacionados
        await libro.populate('id_autor');
        await libro.populate('id_genero');
        
        res.status(201).json(libro);
    } catch (error) {
        console.error('Error al crear el libro:', error);
        res.status(500).json({ error: 'Error al crear el libro' });
    }
});

//  Actualizar un libro
router.put('/:id', async (req, res) => {
    try {
        const { titulo, editorial, id_autor, id_genero } = req.body;
        
        // Verificar que el libro existe
        const libroExistente = await Libro.findById(req.params.id);
        if (!libroExistente) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        
        // Verificar que el autor existe (si se está actualizando)
        if (id_autor) {
            const autor = await Autor.findById(id_autor);
            if (!autor) {
                return res.status(404).json({ error: 'Autor no existe' });
            }
        }
        
        // Verificar que el género existe (si se está actualizando)
        if (id_genero) {
            const genero = await Genero.findById(id_genero);
            if (!genero) {
                return res.status(404).json({ error: 'Género no existe' });
            }
        }
        
        const libro = await Libro.findByIdAndUpdate(
            req.params.id,
            { titulo, editorial, id_autor, id_genero },
            { new: true, runValidators: true }
        ).populate('id_autor').populate('id_genero');
        
        res.json(libro);
    } catch (error) {
        console.error('Error al actualizar el libro:', error);
        res.status(500).json({ error: 'Error al actualizar el libro' });
    }
});

// Eliminar un libro
router.delete('/:id', async (req, res) => {
    try {
        const libro = await Libro.findByIdAndDelete(req.params.id);
        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el libro:', error);
        res.status(500).json({ error: 'Error al eliminar el libro' });
    }
});

module.exports = router;