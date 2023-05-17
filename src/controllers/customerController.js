// Aqui podemos exportar un objeto

const controller = {};

controller.list = (req, res) => {
    res.send('hello world');
};

module.exports=controller;