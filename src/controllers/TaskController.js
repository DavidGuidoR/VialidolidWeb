function index(req, res) {
    res.render('tasks/index');
}

function vusuarios(req, res){
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM ciudadano', (err, tasks) => {
            if (err) {
                res.json(err);
            }
            console.log('aqui me muestra los usuarios')
            res.render('tasks/vusuarios', { tasks });
        })
    });
}

function create(req, res) {
    res.render('tasks/create');
}
function moderacion(req, res) {
    res.render('tasks/moderacion');
}
function vreportes(req, res) {
    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM reporte', (err, tasks) => {
            if (err) {
                res.json(err);
            }
            console.log('aqui me muestra los reportes')
            res.render('tasks/vreportes', { tasks });
        })
    });
}



function edit(req, res) {
    const id_reporte = req.params.id_reporte;
    console.log(id_reporte)

    req.getConnection((err, conn) => {
        conn.query('SELECT * FROM `reporte` WHERE `id_reporte` = ?',[id_reporte], (err, tasks) => {
            conn.query('SELECT * FROM `reporte` WHERE `id_reporte` = ?',[id_reporte], (err1, tasks1) => {

            })
            console.log('Aqui esta el json', tasks);
            console.log('Aqui acaba el json');
            if (err) {
                res.json(err);
                console.log('hay algo malo');
            }
            res.render('tasks/edit', { tasks });
        })
    });
}

module.exports = {
    index: index,
    create: create,
    moderacion: moderacion,
    vreportes: vreportes,
    edit: edit,
    vusuarios: vusuarios
}
