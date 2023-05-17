// Aqui podemos exportar un objeto

const { json } = require("body-parser");

const controller = {};

controller.list = (req, res) => {
    req.getConnection((err, conn) =>{
        conn.query('SELECT * FROM empleado', (err, empleados) =>{
            if(err){
                res.json(err);
            }
            console.log(empleados);
            res.render('empleados', {
                data:empleados
            });
            });
        }); 
    };

    controller.ver = (req, res) =>{
        req.getConnection((err, conn) =>{
            conn.query('SELECT usuario, contrasena FROM empleado where usuario = ?', [data], (err, empleado) )
            console.log(req.body);
            res.send('encontrado');
        })
    }

controller.insert = (req, res) =>{
    
    const data = req.body;

    req.getConnection((err, conn) => {
        
        console.log(req.body);
        conn.query('INSERT INTO empleado set ?', [data], (err, empleado) => {

            res.send('works');
            console.log(empleado);
            if(err){
                console.log('error del registro');  
            }

        });
    })
    
}

module.exports=controller;