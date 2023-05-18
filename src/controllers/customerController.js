// Aqui podemos exportar un objeto

const { json } = require("body-parser");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM empleado', (err, empleado) =>{
            if(err){
                res.json(err);
            }
            console.log(empleado);
            res.render('empleados', {
                data:empleado
            });
            });
        }); 
    };

    controller.inicioSesion = (req, res) =>{
        // De esta manera accedemos a los datos del req de manera individual
        const usuario = req.body['usuario'];
        const contrasena = req.body['contrasena'];
        res.send('funciona');
            req.getConnection((err, conn) =>{
                conn.query('SELECT usuario, contrasena FROM empleado WHERE usuario=?', usuario, (err, empleado) => {
                    if(err){
                        res.send('Error en la consulta');
                    } else {
                    console.log(empleado);
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