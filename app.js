var express = require('express');
var app = express();
var bodyParser = require('body-parser');
require('./env');
var Transacao = require("./src/Controllers/Transacao");
var Cliente = require("./src/Controllers/Cliente");
var Conta = require("./src/Controllers/Conta");

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app
	.get('/transacao', Transacao.obterLista)
	.post('/transacao', Transacao.transacionar)

	.get('/cliente/:q', Cliente.obterPorId)
	.get('/cliente', Cliente.obterLista)
	.get('/geral', Cliente.obterInfoGeral)
	.post('/cliente', Cliente.cadastrar)

	.delete('/conta', Conta.deletar)
	.get('/conta/:q', Conta.obterPorId)
	.get('/conta', Conta.obterLista)
	.post('/conta', Conta.cadastrar);


app.listen(3000);