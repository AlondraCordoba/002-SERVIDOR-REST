/* npm init --- npm i express --save 
 Expess nos ayuda  a levantar nuestros servidores tipo REST
 ARCHIVO PRINCIPAL 
 Codigo necesario para crear un servidor */
// Programando un AVC (altas,bajas,consultas)

//CONSTANTES / IMPORTACIONES
require('./Config/config')
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

/* app servidor y esta preparado para recibir peticiones del cliente(GET), ruta raiz(/), una funcion con dos parametros (request (recibir/cachar), response(mandar))
 res(objeto que puede tener varias funciones) como; send (envie un texto con mas o menos un formato html), json (se respondra en formato JSON al cliente) */
// GET (consultar)
app.get('/', function(req, res) {
    res.send('<h1> Bienvenido a mi Servidor REST </h1>')
})

/* ruta saludo 
app.get('/saludo', function(req, res) {
    res.json({
        ok: '200',
        mensaje: 'Bienvenida Alondra'
    })
})*/

/* ruta user */
app.get('/user', function(req, res) {
    // res.send('<h1> Bienvenido a Usuarios </h1>')
    res.json({
        ok: 200,
        mensaje: 'Usuarios consultados con exito.'
    })
})

// POST (insertar)
app.post('/user', function(req, rest) {
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
app.put('/user/:id/:nombre', function(req, rest) {
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
app.delete('/user/:id', function(req, rest) {
    let id = req.params.id;
    rest.json({
        ok: '200',
        mensaje: 'Usuario eliminado con exito',
        id: id
    })
})

/* app.listen (la app siempre va a escuchar por el puerto 3000
 Funcion tipo flecha, la cual tendra un console.log para conocer si el servidor esta en linea. */
/* Se cambia el 3000, llamando la variable de config.js, y para que se reconozca se tiene que importar. */
app.listen(process.env.PORT, () => {
        console.log('El servidor esta en linea por el puerto', process.env.PORT);
    })
    /* Levantar el servidor en consola es como levantar una app, es decir con nodemon nombre del archivo principal(con o sin la direccion de donde se encuentra)
    La consola nos dira el estatus, postman nos dira si las APIs estan bien diseñadas, etc...
    Si el servidor es tipo REST la consola ya no nos servira, para ello necesitaremos aydua de terceros.*/
    /*localhost:3000/
    localhost:3000/user
    localhost:3000/saludo
    Esto obtendra respuesta tanto en el navegador como en postman
    */