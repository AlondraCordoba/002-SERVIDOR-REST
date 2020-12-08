const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../Models/usuario');
const app = express();
const _ = require('underscore');

app.get('/usuario', function(req, res) {
    Usuario.find({ estado: true })
        .exec((err, usuarios) => {
            if (err) {
                return res.status(400).json({
                    ok: 400,
                    mensaje: 'Ocurrio un error al momento de consultar.',
                    err
                })
            }
            res.json({
                ok: true,
                msg: 'Lista de usuarios obtenida con exito.',
                conteo: usuarios.length,
                usuarios
            })
        })
})


// POST (insertar)
app.post('/usuario', function(req, res) {
    let body = req.body;

    let usr = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });

    usr.save((err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error',
                err
            });
        }

        res.json({
            ok: true,
            msg: 'Usuario insertado con exito',
            usrDB
        });

    });

})


// PUT (administrar, actualizar)
app.put('/usuario/:id', function(req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'apellido', 'role', 'estado', 'google']);
    Usuario.findByIdAndUpdate(id, body, { new: true, runValidators: true, context: 'query' },
        (err, usrDB) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Ocurrio un error al momento de actualizar',
                    err
                });
            }

            res.json({
                ok: true,
                msg: 'Usuario actualizado con exito',
                usuario: usrDB
            })
        })
});

// DELETE (borrar)
app.delete('/usuario/:id', function(req, res) {
    let id = req.params.id;

    Usuario.findByIdAndUpdate(id, { estado: false }, { new: true, runValidators: true, context: 'query' }, (err, usrDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                msg: 'Ocurrio un error al momento de eliminar'
            });
        }
        res.json({
            ok: true,
            msg: 'Usuario eliminado con exito',
            usrDB
        });
    })
});
//Exportar nuestro servidor / todas las rutas.
module.exports = app;