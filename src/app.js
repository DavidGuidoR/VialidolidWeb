//Este es nuestro archivo de configuración Inicial

// Mandamos a llamar a express para su uso y lo asignamos a la constante app
const express = require('express');
const path = require('path'); //extendemos el modulo path para los directorios
const morgan = require('morgan');
const mysql=require('mysql');
const myConnection = require('express-myconnection');
const session = require('express-session');

const app = express();

//importando rutas
const customerRoutes = require('./routes/customer'); //direccion del archivo customer


//configuraciones
// Establecemos que la  variable port almacene el puerto que se esta escuchando, en este caso lo declaramos como el 3000
app.set('port',process.env.PORT || 4000);
//Utilizamos un motor de plantillas de ejs el cual nos permite renderizar nuestros html en node
app.set('view engine', 'ejs');  //configuración de uso de las plantillas
app.set('views', path.join(__dirname, 'views'));    //Aqui establecemos la ruta de nuestra carpeta view mediante el modulo path, concatenando la ruta de app.js(_dirname) con view  
app.set('layout', 'layout');

//middlewares: Funciones se ejecutan entre la recepcion de una solicitud y el envió de una respuesta basicamente es un intermediario entre el cliente y el servidor
app.use(morgan('dev'))  //mostrar mensajes por consola con dev
app.use(myConnection(mysql,{
    host:'137.117.123.255',
    user: 'root',
    password: '12345678A',
    port: 3306,
    database: 'vialidolid',
    connectTimeout: 3600000,
}, 'single'));  //Aqui establecemos la conexion a nuestra base de datos y establecemos la configuracion de acceso de la misma.


app.use(session({
    secret: '12345678',
    resave: true,
    saveUninitialized: true

}));

app.use((req, res, next) => {
    res.locals.session = req.session;
    next();
  });
  
//middleware obtención de datos formulario
app.use(express.urlencoded({extend: false}));

//routes: rutas que el cliente puede solicitar a los archivos
app.use('/', customerRoutes);

//archivos estaticos: complementos para imagenes, css, frameworks, etc: Estos nos permite usar los archivos en todo nuestro proyecto, por ejemplo podemos usar el mismo CSS para todo el proyecto
app.use(express.static(path.join(__dirname, 'public')));

//Nos permite que Node este escuchando al puerto 300 y ademas nos notifica mediante un mensaje en consola que esta activo y en que puerto
app.listen(4000, ()=>{
    console.log('Servidor escuchando el puerto 4000');
});
