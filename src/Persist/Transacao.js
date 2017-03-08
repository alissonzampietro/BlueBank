var modelTransacao = new (require('../Models/Transacao'));
var Cli = new (require('../Models/Cliente'));

function Transacao() {
	this.fields = ['id','fk_conta_remetente','fk_conta_destinatario','valor','createdAt','updatedAt'];
}
Transacao.prototype.obterLista = (callback, fields) => {
	if(fields == undefined)
		fields = this.fields;
	modelTransacao
	.findAll({
	    attributes: fields,
	    order: 'createdAt DESC'
	})
	.then(
		transacoes => {
			callback(transacoes);
		}
	);
}

Transacao.prototype.insere = (id_remetente, id_destinatário, valor, callback) => {
	modelTransacao
	.build({
	    fk_conta_remetente: id_remetente,
	    fk_conta_destinatario: id_destinatário,
	    valor: valor
	  })
	.save()
	.then(
		retorno => {
			callback(retorno.dataValues);
		}
	);
}

Transacao.prototype.obterPorId = (id, callback, fields) => {
	if(fields == undefined)
		fields = this.fields;

	modelTransacao
	.findOne({
	    where: {
	        id:id
	    },
	    attributes: fields
	 })
	.then(
		transacoes => {
			callback(transacoes);
		}
	)
}

module.exports = Transacao;