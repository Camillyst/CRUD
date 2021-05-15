const Sequelize = require('sequelize');
const connection = require('./database');

const CadastroBD = connection.define("usuarios", {
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    sobrenome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    Email: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

//CadastroBD.sync({force: true})

module.exports = CadastroBD;