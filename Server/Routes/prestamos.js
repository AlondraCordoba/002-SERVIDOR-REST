const express = require('express');
const _ = require('underscore');
const app = express();
const Prestamo = require('../Models/prestamos');

app.get('/prestamo', (req, res) => {
    Prestamo.find({ estado: true })
        .populate('productos', 'nombre')
        .exec((err, prestamos) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al consultar los prestamos',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Lista de prestamos obtenida con éxito',
                conteo: prestamos.length,
                prestamos
            });
        });
});

app.post('/prestamo', (req, res) => {
    let body = req.body;
    let pre = new Prestamo({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        libro: body.libro,
        usuarioRegistro: body.usuarioRegistro
    });
    pre.save((err, preDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar un prestamos',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Prestamos insertado con éxito',
            preDB
        })
    });
});

app.put('/prestamo/:id', (req, res) => {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'apellido', 'libro', 'estado', 'usuarioRegistro', 'email']);

    Prestamo.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' }, (err, preDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de actualizar',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'El prestamo fue actualizado con éxito',
            preDB
        });
    });
});

app.delete('/prestamo/:id', function(req, res) {
    let id = req.params.id;

    Prestamo.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, preDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar'
            });
        }
        res.json({
            ok: true,
            msg: 'Prestamo eliminado con exito',
            preDB
        });
    })
});

module.exports = app;
