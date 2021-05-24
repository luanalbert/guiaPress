const Sequelize = require("sequelize");

const connection = new Sequelize('guiapressnew','root','85637156',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: "-03:00"
});

module.exports = connection;