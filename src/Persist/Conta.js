var modelConta = new (require('../Models/Conta'));
var Cli = new (require('../Models/Cliente'));

function Conta() {
	this.fields = ['id','fk_cliente', 'saldo', 'ativo', 'createdAt', 'updatedAt'];
}
Conta.prototype.obterLista = (callback) => {
	modelConta.belongsTo(Cli, {foreignKey: 'fk_cliente'});
	Cli.hasMany(modelConta, {foreignKey: 'fk_cliente'});
	modelConta
	.findAll({
		include: {model: Cli, attributes: ['nome', 'cpf'], paranoid: false, required: true}
	})
	.then(
		Contas => {
			callback(Contas);
		}
	);
}

Conta.prototype.insere = (cliente,callback) => {
	modelConta
	.build({
	    fk_cliente: cliente,
	    saldo: 0
	  })
	.save()
	.then(
		retorno => {
			callback(retorno.dataValues);
		}
	);
}

Conta.prototype.delete = (id,callback) => {
	modelConta
	.destroy({
	    where: {
	       id:id
	    }
	  })
	.then(
		retorno => {
			callback(retorno);
		}
	);
}

Conta.prototype.obterPorId = (id, callback, fields) => {
	if(fields == undefined) {
		fields = this.fields;
	}
	modelConta
	.findOne({
	    where: {
	        id:id
	    },
	    attributes: fields
	 })
	.then(
		retorno => {
			callback(retorno);
		}
	);
}



Conta.prototype.alterarSaldo = (id_conta, novoValor, callback) => {

	modelConta
	.update(
		{ saldo: novoValor },
		{ 
			where: { 
				id: id_conta 
			} 
		}
	)
	.then(
		retorno => {
			callback(retorno);
		}
	)
	.catch(
		err => {
			return new Error(['Houve um problema ao realizar a transferência']);
		}
	);
}

Conta.prototype.obterPorConta = (fk_cliente, callback, fields) => {
	if(fields == undefined) {
		fields = this.fields;
	}
	modelConta
	.findOne({
	    where: {
	        fk_cliente:fk_cliente
	    },
	    attributes: fields
	 })
	.then(
		Contas => {
			callback(Contas);
		}
	)
}

module.exports = Conta;