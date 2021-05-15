const Sequelize = require('sequelize');

const connection = new Sequelize("CadastroBD", "root", "teixeira02", {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection;