var Conta = require('../Persist/Conta');
var Cliente = require('../Persist/Cliente');
var Conta = new Conta();

module.exports = {
	cadastrar: (req, res, next) => {
		var cliente = req.body.cliente;
		if(cliente == undefined)
			return next(new Error(['O campo cliente está em branco']));
		var cli = new Cliente();
		cli.obterPorId(cliente, function(retorno){
			if(retorno != null) {
				Conta.insere(cliente, function(retorno){
					res.json(retorno);
				});
			}else{
				return next(new Error("Cliente não encontrado! É necessário cadastrar um cliente antes de cadastrar uma conta"));
			}
		})
	},
	deletar: (req, res, next) => {
		var id_conta = req.body.conta;
		if(id_conta == undefined)
			return next(new Error(['O campo cliente está em branco']));

		Conta.obterPorId(id_conta, function(conta){
			if(conta == null){
				res.json('Nenhuma conta com ID ' +id_conta+ ' foi encontrada');
				return;
			}

			if(conta.saldo === 0) {
				Conta.delete(id_conta, function(retorno){
						res.json('Conta com id '+id_conta+' excluída com sucesso!');
				});	
			}else {
				res.json('Não podemos excluir uma conta que tenha saldo!');
			}

		}, ['saldo']);
	},
	obterLista: (req, res, next) => {
		Conta.obterLista(function(retorno) {
			res.json(retorno);
		});
	},
	obterPorId: (req, res, next) => {
		var id = req.params.q;
		Conta.obterPorId(id,function(retorno) {
			if(retorno == null){
				res.json('Conta não encontrado')
			}else{
				res.json(retorno);
			}
		});
	}
}