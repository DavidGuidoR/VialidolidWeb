// Aqui podemos exportar un objeto

const { json } = require("body-parser");
const { route } = require("../routes/customer");

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

    controller.pantallaMenuPrincipal = (req,res) => {
        res.render('menuPrincipal');
        }
    
    controller.plantillaModeracion = (req,res) => {
        res.render('plantillamoderacion');
        }   
    
    controller.pantallaAdministracion = (req,res) => {
        res.render('administracion');
        }   
    
    controller.administracionEncargado_dependencias = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT r.id_encargado, r.nombre, r.apellido_paterno, r.apellido_materno, c.nombre AS nombre_dependencia, r.usuario, r.contrasena FROM encargado_dependencia r JOIN dependencia c ON r.id_dependencia = c.id_dependencia', (err, encargados) => {
                if (err) {
                    res.json(err);
                } else{
                    console.log(encargados)
                res.render('administracionencargado_dependencias',{data:encargados});
                }
            })
        });
        }
    
    controller.administracionEmpleados = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM empleado', (err, empleados) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('administracionmoderadores',{data:empleados});
                }
            })
        });
        }
    
    controller.administracionDependencias = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM dependencia', (err, dependencias) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('administraciondependencias',{data:dependencias});
                }
            })
        });
        }
    
    controller.administracionCiudadanos = (req,res) => {
        req.getConnection((err, conn) => {
            conn.query('SELECT * FROM ciudadano', (err, usuarios) => {
                if (err) {
                    res.json(err);
                } else{
                res.render('administracionusuarios',{data:usuarios});
                }
            })
        });
        }
    
    controller.administracionReportes = (req,res) => {
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
                res.render('administracionreportes',{data:reportes, formatDate: formatDate});
                }  
            })
        });
    }

    controller.pantallaReportesRevisados = (req,res) => {
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
                res.render('moderacionreportesrevisados',{data:reportes, formatDate: formatDate});
                }  
            })
        });
        }
    
    controller.pantallaReportesEntrantes = (req,res) => {
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
                res.render('moderacionreportesentrantes',{data:reportes, formatDate: formatDate});
                }  
            })
        });
        }

    controller.insert = (req,res) => {
        const data = req.body;
        const tabla = req.params.tabla;
        console.log(tabla);
        const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1)+'s';
        const ruta ='/administracion'+ tablaCapitalizada;
        const consulta = 'INSERT INTO ' + tabla + ' set ?';

        req.getConnection((err, conn) => {
        conn.query(consulta, [data], (err, data) => {
            if(err){
                res.send('Registro fallido')
            } else{
                res.redirect(ruta);
            }
        });
    }); 
    }

    controller.delete = (req, res) => {
        const id = req.params.id;
        const tabla = req.params.tabla;
        if(tabla=='encargado_dependencia'){
            puntero = 'id_encargado'
        } else{ puntero = 'id_'+ tabla;}
        const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1)+'s';
        const ruta ='/administracion'+ tablaCapitalizada;
        const consulta = 'DELETE FROM '+ tabla + ' WHERE '+ puntero+ ' = ?';

        req.getConnection((err, conn) => {
          if (err) {
            console.error('Error al obtener la conexión:', err);
            return;
          }
          
          conn.query(consulta, [id], (err, data) => {
            if (err) {
              console.error('Error al ejecutar la consulta:', err);
              return;
            } else{
                res.redirect(ruta);
                }
            });
          });
        }

    // Seccion edición de registros dinámicos
    controller.pantallaEdit = (req,res) =>{
        const tabla = req.params.tabla;
        var puntero = '';
        const id = req.params.id;
        if(tabla=='encargado_dependencia'){
            puntero = 'id_encargado'
        } else{ puntero = 'id_'+ tabla;}
         
        const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1)+'s';
        const ruta ='/administracion'+ tablaCapitalizada;
        const consulta = 'SELECT * FROM '+ tabla + ' WHERE '+ puntero+ ' = ?';


        req.getConnection((err, conn) => {
            if (err) {
              console.error('Error al obtener la conexión:', err);
              return;
            }
            conn.query(consulta, [id], (err, data) => {
              
                let inputsHTML = '';
                switch (tabla) {
                
                case 'dependencia':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_dependencia" value="'+data[0].id_dependencia+'" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="'+data[0].nombre+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="colonia" value="'+data[0].colonia+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="calle" value="'+data[0].calle+'"></div>';
            // Otros campos para empleados
                    break;
      
                case 'ciudadano':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_ciudadano" value="'+data[0].id_ciudadano+'" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="'+data[0].nombre+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_paterno" value="'+data[0].apellido_paterno+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_materno" value="'+data[0].apellido_materno+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="correo" value="'+data[0].correo+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="contrasena" value="'+data[0].contrasena+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="telefono" value="'+data[0].telefono+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="estado" value="'+data[0].estado+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="ciudad" value="'+data[0].ciudad+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="n_penalizaciones" value="'+data[0].n_penalizaciones+'"></div>';
            // Otros campos para usuarios
                    break;

                case 'encargado_dependencia':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_encargado" value="'+data[0].id_encargado+'"readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="'+data[0].nombre+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_paterno" value="'+data[0].apellido_paterno+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_materno" value="'+data[0].apellido_materno+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_dependencia" value="'+data[0].id_dependencia+'" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="usuario" value="'+data[0].usuario+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="contrasena" value="'+data[0].contrasena+'"></div>';
                    break;
          // Otros casos para diferentes tipos de registros
                case 'empleado':
                    inputsHTML += '<div class="cajastexto"><input type="text" name="id_empleado" value="'+data[0].id_empleado+'" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="cargo" value="'+data[0].cargo+'" readonly></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="nombre" value="'+data[0].nombre+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_paterno" value="'+data[0].apellido_paterno+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="apellido_materno" value="'+data[0].apellido_materno+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="usuario" value="'+data[0].usuario+'"></div>';
                    inputsHTML += '<div class="cajastexto"><input type="text" name="contrasena" value="'+data[0].contrasena+'"></div>';
                break;
          
          default:
                    break;
        }
              
                if (err) {
                console.error('Error al ejecutar la consulta:', err);
                return;
                } else{
                  res.render('administracionedit', { data: data, inputsHTML,tabla });
                  }
        });

    });
    }

    controller.edit = (req,res) => {
        const tabla = req.params.tabla;
        const datos = req.body;
        const puntero = 'id_'+ tabla;
        var id='';
        switch (tabla) {

            case 'dependencia': id = req.body.id_dependencia;
                break;
            
            case 'empleado': id = req.body.id_empleado;
                break;
            case 'ciudadano': id = req.body.id_ciudadano;
                break;
            case 'encargado_dependencia': id = req.body.id_encargado;
                break;
            default: console.log('error en el ID');
                break;
        }
    
        const tablaCapitalizada = tabla.charAt(0).toUpperCase() + tabla.slice(1)+'s';
        const ruta ='/administracion'+ tablaCapitalizada;
        const consulta = 'UPDATE '+tabla+' set ? WHERE '+puntero+ '= ?'
        req.getConnection((err,conn) =>{
            conn.query(consulta,[datos,id], (err,data) =>{
                if(err){
                    res.send('error en la actualización');
                    console.log(err);
                } else{
                    res.redirect(ruta);
                }

            })
        })
    }

    controller.inicioSesion = (req, res) => {
        // Obtenemos el usuario y la contraseña del cuerpo de la solicitud
        const usuario = req.body['usuario'];
        const contrasena = req.body['contrasena'];
      
        // Establecemos la conexión con la base de datos
        req.getConnection((err, conn) => {
          // Consultamos la base de datos y obtenemos los datos del empleado
          conn.query('SELECT usuario, contrasena, cargo FROM empleado WHERE usuario=?', usuario, (err, empleado) => {
            // Verificamos si se produjo un error en la consulta
            if (err) {
              res.send('Error en la consulta');
              console.log(err);
            } else {
              // Verificamos si se encontró un empleado con el usuario proporcionado
              if (empleado.length > 0) {
                // Extraemos los datos de la consulta
                const usuarioConsulta = empleado[0].usuario;
                const contrasenaConsulta = empleado[0].contrasena;
                const cargo = empleado[0].cargo;
      
                // Comparamos el usuario y la contraseña con los datos de la consulta
                if (usuario === usuarioConsulta && contrasena === contrasenaConsulta) {
                  // Redirigimos a la página correspondiente según el cargo
                  req.session.usuario = usuario;
                  req.session.cargo = cargo;
                  if (cargo === "moderador") {
                    res.render('moderacion',{data:empleado});
                  } else if (cargo === "administrador") {
                    res.render('administracion',{data:empleado});
                  } else {
                    res.send('Cargo no reconocido');
                  }
                } else {
                  res.send('Inicio de sesión fallido');
                }
              } else {
                res.send('Usuario no encontrado');
              }
            }
          });
        });
      };
      


module.exports=controller;