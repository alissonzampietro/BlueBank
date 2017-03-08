var Transacao = require('../Persist/Transacao');
var Conta = require('../Persist/Conta');
var transacao = new Transacao();

var destinatarioExistente = 0;

function debitarContaRemetente(id_remetente, valor, conta) {
	conta.obterPorId(id_remetente, function(retorno) {
		if(retorno != null) {
			var novoSaldo = retorno.saldo - valor;
			conta.alterarSaldo(id_remetente, novoSaldo);
		}else{
			res.json('A conta do remetente não foi encontrada');
		}
	}, ['saldo'])

}
function creditarContaDestinatario(id_destinatario, valor, conta) {
	conta.obterPorId(id_destinatario, function(retorno) {
		if(retorno != null) {
			var novoSaldo = parseInt(retorno.saldo) + parseInt(valor);
			conta.alterarSaldo(id_destinatario, novoSaldo);
		}else{
			res.json('A conta do destinatário não foi encontrada');
		}
	}, ['saldo'])
}
function verificarDestinatarioEFinalizar(id_remetente, id_destinatario, valor, conta, res) {

	conta.obterPorId(id_destinatario, function(retorno) {

		if(retorno != null) {
			debitarContaRemetente(id_remetente, valor, conta);
			creditarContaDestinatario(id_destinatario, valor, conta);
			transacao.insere(id_remetente, id_destinatario, valor, function(retorno){
				res.json(retorno);
			});
		}else{
			res.json('A conta do destinatário não foi encontrada');
		}

	});
}

module.exports = {
	transacionar: (req, res, next) => {
		var id_remetente = req.body.id_remetente;
		var id_destinatario = req.body.id_destinatario;
		var valor = req.body.valor;
		if(id_remetente == undefined || id_destinatario == undefined || valor == undefined)
			return next(new Error(['Algum campo está faltando']));
		
		var conta = new Conta();
		conta.obterPorId(id_remetente, function(retorno) {
			if(retorno == null)	
				return next(new Error(['Sua conta não foi encontrada']));

			if(retorno.saldo >= valor) {
				verificarDestinatarioEFinalizar(id_remetente, id_destinatario, valor, conta, res);
			}else{
				return next(new Error(['Você não possui saldo suficiente para transferir este valor!']));
			}

		}, ['saldo']);
	},
	obterLista: (req, res, next) => {
		transacao.obterLista(function(retorno) {
			res.json(retorno);
		});
	},
	obterPorId: (req, res, next) => {
		var id = req.params.q;
		transacao.obterPorId(id,function(retorno) {
			if(retorno == null){
				res.json('transacao não encontrado')
			}else{
				res.json(retorno);
			}
		});
	}
}