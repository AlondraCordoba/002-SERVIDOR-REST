require('./Config/config')
const express = require('express');
// Conexion a BD (mongoDB)
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.get('/', function(req, res) {
    res.send('<h1> Bienvenido a mi Servidor REST</h1>')
})

// Usar o importar todas las rutas que se tengan en el archivo mencionado en la ruta.
app.use(require('./Routes/usuario'));
app.use(require('./Routes/categoria'));
app.use(require('./Routes/login'));
app.use(require('./Routes/prestamos'));
app.use(require('./Routes/libro'));


// Conexion BD (MongoBD)
// mongoose (objeto, constante que importamos). connect (funcion)('parametro de la muncion, en este caso url de conexion') por estantar es mongodb://localhost, dominio o IP del servidor : puerto (el puerto de Mongo siempre es 27017 y en SQL 3306) /nombre de BD (si no la encuentra entinces la crea), {JSON}
/*await*/
// srv = servidor
mongoose.connect('mongodb+srv://admin:AlondraMongoDBAdmin0729@cluster0.cn9sh.mongodb.net/biblioteca', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}, (err, res) => {
    if (err) throw err;
    // Conexion exitosa a la BD
    console.log('Base de datos Online');
});
// Conexion a HEROKU
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