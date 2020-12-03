const express = require('express');
const app = express();
const _ = require('underscore');
const Categoria = require('../Models/categoria');

app.get('/categoria', (req, res) => {
    let desde = req.query.desde || 0;
    let hasta = req.query.hasta || 5;
    // populate = cruzar las tablas (inner)
    Categoria.find({})
        .skip(Number(desde))
        .limit(Number(hasta))
        .populate('usuarios', 'nombre email')
        .exec((err, categorias) => {
            if (err) {
                return res.status(400).json({
                    ok: 400,
                    mensaje: 'Ocurrio un error al listar las categorias.',
                    err
                })
            }
            res.json({
                ok: true,
                msg: 'Categorias listadas con exito.',
                conteo: categorias.length,
                categorias
            })
        })
});

app.post('/categoria', function(req, res) {
    let cat = new Categoria({
        descripcion: req.body.descripcion,
        usuario: req.body.usuario
    });

    cat.save((err, catDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Error al insertar una categoria',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Categoria insertada con exito',
            catDB
        });

    });
})



module.exports = app;