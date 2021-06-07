const express = require('express');
const app = express(); // express -> app
const bodyParser = require('body-parser');
const morgan = require('morgan'); // motira toda a execução ( da um log)
const rotaImoveis = require('./rotas/Imoveis.js');
const rotaUsuarios = require('./rotas/usuarios.js');


app.use(morgan('dev')); // motira toda a execução ( da um log)

app.use(express.urlencoded({ extended: false})); // aceita dados simples
app.use(express.json()); // só aceita formato json como entrada

app.use((req, res, next) => {
    res.header('Acess-Control-Allow-Origin', '*'); // aceito em todos
    res.header('Acess-Control-Allow-Header',
    'Origin, X-Requerested-With, Content-Type, Accept, Authorization' );

    if(req.method === 'OPTIONS') {
        res.header('Acess-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).send({});
    }

    next();
});


app.use('/imoveis', rotaImoveis);
app.use('/usuarios', rotaUsuarios);

// Tratando erros
app.use((req, res , next) => {
    const erro = new Error('Rota não encontrada');
    
    erro.status = 404;
    next(erro);
});

app.use((error, req, res, next) =>{

    res.status(error.status || 500); // pegara o status do erro  caso nao tenha sera o 500
    return res.send({
        erro: {
            mensagem: error.message
        }
    });
});

module.exports = app;
