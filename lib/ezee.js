'use strict';

var dbPlug = require('./db_plugs');
var express = require('express');
var chalk = require('chalk');
var app = express();

module.exports.startServer = function (dbPath) {
  //Initiate DB connection and get config
  dbPlug.init(dbPath).then(function(config) {
    // Start the app by listening on <port> at <host>
    app.listen(config.server.port, config.server.host, function () {
      // Create server URL
      var server = (config.server.env === 'PROD' ? 'https://' : 'http://') + config.server.host + ':' + config.server.port;
      // Logging initialization
      console.log('--');
      console.log(chalk.green(config.app.title));
      console.log();
      console.log(chalk.green('Environment:     ' + config.server.env));
      console.log(chalk.green('Server:          ' + server));
      console.log(chalk.green('Database:        ' + config.db.uri));
      console.log(chalk.green('App version:     ' + config.app.version));
    });
  }).then(function(config) {
    //register routes
    return registerRoutes(config);
  }).catch(function(err) {
    console.error(err);
  });
}

function registerRoutes(config) {

}
