const express = require('express');
const app = express();

/* app servidor y esta preparado para recibir peticiones del cliente(GET), ruta raiz(/), una funcion con dos parametros (request (recibir/cachar), response(mandar))
 res(objeto que puede tener varias funciones) como; send (envie un texto con mas o menos un formato html), json (se respondra en formato JSON al cliente) */

// GET (consultar)
/*app.get('/', function(req, res) {
    res.send('<h1> Bienvenido a mi Servidor REST</h1>')
})*/

/* ruta saludo 
app.get('/saludo', function(req, res) {
    res.json({
        ok: '200',
        mensaje: 'Bienvenida Alondra'
    })
})*/

/* ruta user */
app.get('/usuario', function(req, res) {
    // res.send('<h1> Bienvenido a Usuarios </h1>')
    res.json({
        ok: 200,
        mensaje: 'Usuarios consultados con exito.'
    })
})

// POST (insertar)
app.post('/usuario', function(req, rest) {
    // Recibir variables del body para ello necesitamos un paquete de body 
    // npm i body-parser
    let nombre = req.body.nombre;
    /*
        let apellidoPaterno = req.body.apellidoPaterno;
        let apellidoMaterno = req.body.apellidoMaterno;
        let edad = req.body.edad;
        let sexo = req.body.sexo;*/
    // Todo el body
    let body = req.body;
    if (nombre == undefined) {
        //Codigo de estado (status)
        res.status(400).json({
            ok: 400,
            mensaje: "Favor de enviar el nombre"
        })
    } else {
        rest.json({
            ok: 200,
            mensaje: 'Usuario insertado con exito.',
            /*nombre: nombre,
            apellidoPaterno: apellidoPaterno,
            apellidoMaterno: apellidoMaterno,
            edad: edad,
            sexo: sexo*/
            body: body
        })
    }
})


// PUT (administrar, actualizar)
// /:id se concatena el id, el usuario lo ingresara. Eso es una variable, para cacharla se tiene que hacer una variable local.
// Cachar valores por params, body (postman)
app.put('/usuario/:id/:nombre', function(req, rest) {
    let id = req.params.id;
    let nombre = req.params.nombre;

    rest.json({
        ok: 200,
        mensaje: 'Usuario actualizado con exito',
        id: id,
        nombre: nombre
    })
})

// DELETE (borrar)
app.delete('/usuario/:id', function(req, rest) {
    let id = req.params.id;
    rest.json({
        ok: '200',
        mensaje: 'Usuario eliminado con exito',
        id: id
    })
})

//Exportar nuestro servidor / todas las rutas.
module.exports = app;