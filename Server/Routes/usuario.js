const express = require('express');
const bcrypt = require('bcrypt');
const Usuario = require('../Models/usuario');
const app = express();
const _ = require('underscore');

app.get('/usuario', function(req, res) {

    Usuario.find({ estado: true })
        .exec((err, usuarios) => {
            // Validar un error
            if (err) {
                return res.status(400).json({
                    ok: 400,
                    mensaje: 'Ocurrio un error al momento de consultar.',
                    err
                })
            }
            // Respuesta correcta, si no se manda un status aqui por default se manda un 200.
            // Conteo de ecuantos registros hay en la conexion de usuarios. (cuantas posiciones encontro en el array)
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
    // Recibir variables del body para ello necesitamos un paquete de body 
    // npm i body-parser --save
    // let nombre = req.body.nombre;
    /*
        let apellidoPaterno = req.body.apellidoPaterno;
        let apellidoMaterno = req.body.apellidoMaterno;
        let edad = req.body.edad;
        let sexo = req.body.sexo;*/
    // Todo el body
    let body = req.body;

    let usr = new Usuario({
        nombre: body.nombre,
        apellido: body.apellido,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10)
    });
    //         password: body.password
    // hashSync Cualquier campo o el campo que se especifique se va a encriptar.

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

    /*if (nombre == undefined) {
        //Codigo de estado (status)
        res.status(400).json({
            ok: 400,
            mensaje: "Favor de enviar el nombre"
        })
    } else {
        rest.json({
            ok: 200,
            mensaje: 'Usuario insertado con exito.',
            nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            edad: edad,
            sexo: sexo
            body: body 
        }) 
    } */
})


// PUT (administrar, actualizar)
// /:id se concatena el id, el usuario lo ingresara. Eso es una variable, para cacharla se tiene que hacer una variable local.
// Cachar valores por params, body (postman)
app.put('/usuario/:id/', function(req, res) {
    /* let id = req.params.id;
     let nombre = req.params.nombre;

     rest.json({
         ok: 200,
         mensaje: 'Usuario actualizado con exito',
         id: id,
         nombre: nombre
     })*/

    // Funcion que nos ayudara a filtrar ciertos campos.
    // Cuando hablamos de params, se tiene que declarar en la ruta y en el query no.
    // pick solo tomar algunos campos. [Los campos que queremos en este caso el body]
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'appellido']);
    // Parametros para que la consulta trabaje con mayor eficiencia. Si no encuentra un usuario lo crea (new)
    // runValidators : Siempre revise las validaciones que se tienen en el modelo.
    // context: La consulta se mandara como tipo query
    // La consulta puede tener errores o actualiza el usuario.
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

// Se instala npm underscore, donde provee algunas funciones sin tienes que importanr unas funciones nucleo de JS
// Ahorran mucho codigo, tiene funciones de ordenamiento, entre otros.