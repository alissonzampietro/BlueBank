var Cliente = require('../Persist/Cliente');
var cliente = new Cliente();

module.exports = {
	cadastrar: (req, res, next) => {
		var nome = req.body.nome;
		var cpf = req.body.cpf;
		if(nome == undefined || cpf == undefined)
			return next(new Error(['Algum campo está faltando']));
		cliente.insere(nome, cpf, function(retorno){
			res.json(retorno);
		});
	},
	obterLista: (req, res, next) => {
		cliente.obterLista(function(retorno) {
			res.json(retorno);
		});
	},
	obterInfoGeral: (req, res, next) => {
		cliente.obterLista(function(retorno) {
			res.json(retorno);
		});
	},
	obterPorId: (req, res, next) => {
		var id = req.params.q;
		cliente.obterPorId(id,function(retorno) {
			if(retorno == null){
				res.json('Cliente não encontrado')
			}else{
				res.json(retorno);
			}
		});
	}
}