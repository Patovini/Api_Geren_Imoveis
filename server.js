const http = require('http'); 
const app = require('./app.js');
const port = process.env.PORT || 3000; // caso nao esteja marcada ja vai na porta 3000(padrao)
const server = http.createServer(app); // cria o app dentro do server

server.listen(port); // onde ele procura o serviço 


