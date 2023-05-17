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
            conn.query('SELECT usuario, contrasena FROM empleado where usuario = ?', [data[0].usuario], (err, empleado) )
            console.log(req.body);
            res.send('encontrado');
        })
    }

controller.insert = (req, res) =>{
    req.getConnection((err, conn) => {
        conn.query('INSERT INTO empleado set ?', [data], (err, data))
        console.log(req.body);
        res.send('works');
    });
    
}

module.exports=controller;