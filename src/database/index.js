const Sequelize = require('sequelize');
const dbConfig = require('../config/database');


const Categories = require('../modals/Categories')
const Commands = require('../modals/Commands')

const connection = new Sequelize(dbConfig);

/*try{
    connection.authenticate();
    console.log('Connection has been established successfully');
} catch (error){
    console.error('Unable to connect to the database', error);
}*/

Categories.init(connection);
Commands.init(connection);


module.exports = connection;