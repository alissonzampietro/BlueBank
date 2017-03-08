var modelCliente = new (require('../Models/Cliente'));

function Cliente() {
	this.fields = ['id','nome', 'cpf', 'ativo', 'createdAt', 'updatedAt'];
}
Cliente.prototype.obterLista = (callback, fields) => {
	if(fields == undefined) {
		fields = this.fields;
	}
	modelCliente
	.findAll({attributes: fields})
	.then(
		clientes => {
			callback(clientes);
		}
	);
}

Cliente.prototype.insere = (nome,cpf,callback) => {
	modelCliente
	.build({
	    nome: nome,
	    cpf: cpf
	  })
	.save()
	.then(
		retorno => {
			callback(retorno.dataValues);
		}
	);
}

Cliente.prototype.obterPorId = (id, callback, fields) => {
	if(fields == undefined) {
		fields = this.fields;
	}
	modelCliente
	.findOne({
	    where: {
	        id:id
	    },
	    attributes: fields
	 })
	.then(
		clientes => {
			callback(clientes);
		}
	)
}

module.exports = Cliente;