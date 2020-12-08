const express = require('express');
const _ = require('underscore');
const app = express();
const Productos = require('../Models/libro');

app.get('/libro', (req, res) => {
    Productos.find({ disponible: true })
        .populate('usuario', 'nombre')
        .exec((err, productos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al consultar los libros',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de libros obtenida con éxito',
                conteo: productos.length,
                productos
            });
        });
});

app.post('/libro', (req, res) => {
    let body = req.body;
    let pro = new Productos({
        nombre: body.nombre,
        autor: body.autor,
        precioU: body.precioU,
        categoria: body.categoria,
        usuario: body.usuario
    });
    pro.save((err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un libro',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Libro insertado con éxito',
            proDB
        })
    });
});

app.put('/libro/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'precioU', 'categoria', 'disponible', 'usuario', 'autor']);

    Productos.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El libro fue actualizado con éxito',
            proDB
        });
    });
});

app.delete('/libro/:id', function(req, res) {
    let id = req.params.id;

    Productos.findByIdAndUpdate(id, { disponible: false }, { new: true, runValidators: true, context: 'query' }, (err, proDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar'
            });
        }
        res.json({
            ok: true,
            msg: 'Libro eliminado con exito',
            proDB
        });
    })
});

module.exports = app;
