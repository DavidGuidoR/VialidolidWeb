// Aqui podemos exportar un objeto

const { json } = require("body-parser");

const controller = {};

    controller.render = (req, res) => {
        res.render('menuPrincipal');
            }

    controller.pantallaSesion = (req,res) => {
        res.render('inicioSesion');
        }

    controller.pantallaRegistro = (req,res) => {
        res.render('registro');
        }

    controller.pantallaUsuarios = (req, res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM ciudadano', (err, usuarios) => {
                if (err) {
                    res.json(err);
                } else{
                console.log(usuarios);
                res.render('moderacionusuarios',{data:usuarios});
                }
            })
        });
    }

    controller.pantallaReportes = (req, res) => {
        function formatDate(date) {
            const options = { day: '2-digit', month: '2-digit', year: '2-digit' };
            const formattedDate = new Date(date).toLocaleDateString('es-ES', options);
            return formattedDate;
          }
        req.getConnection((err, conn) => {
            conn.query('SELECT r.id_reporte, r.fecha, r.descripcion, r.latitud, r.longitud, r.n_apoyos, r.estatus, r.n_denuncias, r.referencias, c.id_ciudadano AS nombre_ciudadano, d.nombre AS nombre_dependencia, r.tipo_reporte FROM reporte r JOIN ciudadano c ON r.id_ciudadano = c.id_ciudadano JOIN dependencia d ON r.id_dependencia = d.id_dependencia', (err, reportes) => {
                if (err) {
                    res.json(err);
                } else{
                    console.log('Separacion en console log-------------------------------------------------------------------------');
                console.log(reportes);
                res.render('moderacionreportes',{data:reportes, formatDate: formatDate});
                }  
            })
        });
    }

        

    controller.inicioSesion = (req, res) =>{
        // De esta manera accedemos a los datos del req de manera individual
        const usuario = req.body['usuario'];
        const contrasena = req.body['contrasena'];

            //Establecemos la conexion con la base de datos
            req.getConnection((err, conn) =>{
                //consulta a base de datos y nos envia el parametro de la consulta en empleado
                conn.query('SELECT usuario, contrasena FROM empleado WHERE usuario=?', usuario, (err, empleado) => {
                    //extraemos los datos de consulta
                    const usuarioConsulta = empleado[0].usuario; 
                    const contrasenaConsulta = empleado[0].contrasena;
                    console.log(empleado);
                    
                    if(err){
                        res.send('Error en la consulta');
                    } else {
                        //si usuario y contraseña es igual nos redirige a empleados en este caso seria un inicio de sesion exitoso
                        if (usuario==usuarioConsulta && contrasena==contrasenaConsulta){
                            //redirige a la pagina empleados
                            res.render('moderacion');
                        }
                        //si el usuario no es igual marca inicio de sesion fallido
                        else{
                            res.send('inicio de sesion fallido');
                        }
                    }
                });
            });
    };

controller.insert = (req, res) =>{
    
    const data = req.body;

    req.getConnection((err, conn) => {
        
        console.log(req.body);
        conn.query('INSERT INTO empleado set ?', [data], (err, empleado) => {
            console.log(empleado);
            if(err){
                res.send('Registro fallido')
            } else{
                res.render('empleados',{
                    data:empleado
                });  
            }
        });
    });  
};

module.exports=controller;