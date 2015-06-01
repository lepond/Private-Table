var Sequelize = require('sequelize');
var fs = require('fs');

if (process.env.DATABASE_URL) {
  var match = process.env.DATABASE_URL.match(/postgres:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/(.+)/);
  var sequelize = new Sequelize(match[5], match[1], match[2], {
    dialect: 'postgres',
    protocol: 'postgres',
    port: match[4],
    host: match[3],
    logging: console.log,
    dialectOptions: {
      ssl: true
    }
  });
} else {
  var username = String(fs.readFileSync(__dirname + '/databaseusername'));
  var password = String(fs.readFileSync(__dirname + '/databasepassword'));
  var databaseName = String(fs.readFileSync(__dirname + '/databasename'));
  var sequelize = new Sequelize('devdev', 'tester', 'testpw', /*databaseName, username, password,*/ {
    dialect: 'postgres',
    protocol: 'postgres',
    port: '5432',
    host: 'localhost', //'ec2-23-23-81-221.compute-1.amazonaws.com',
    logging: console.log,
    /*dialectOptions: {
      ssl: true
    }*/
  });
}

module.exports = sequelize;
