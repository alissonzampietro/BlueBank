var Sequelize = require('sequelize');

var sequelize = new Sequelize(process.env.DB_DATABASE, process.env.DB_USER, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  pool: {
    max: 5,
    min: 0,
    idle: 10000
  }
});


function Transacao() {
	return sequelize.define('transacoes', {
	  id: {
	  	type: Sequelize.INTEGER,
	  	autoIncrement: true,
        primaryKey: true
	  },
	  fk_conta_remetente: {
	    type: Sequelize.INTEGER,
	    allowNull: false
	  },
	  fk_conta_destinatario: {
	    type: Sequelize.INTEGER,
	    allowNull: false
	  },
	  valor: {
	    type: Sequelize.FLOAT,
	    allowNull: false
	  }
	});
}

sequelize.sync();

module.exports = Transacao;