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


function Conta() {
	return sequelize.define('contas', {
	  id: {
	  	type: Sequelize.INTEGER,
	  	autoIncrement: true,
        primaryKey: true
	  },
	  fk_cliente: {
	    type: Sequelize.INTEGER,
	    allowNull: false
	  },
	  saldo: {
	    type: Sequelize.FLOAT,
	    allowNull: false
	  },
	  ativo: {
	    type: Sequelize.INTEGER,
	    allowNull: false,
	    defaultValue: 1
	  }
	});
}

sequelize.sync();

module.exports = Conta;