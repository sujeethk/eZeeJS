'use strict';

var dbPlug = require('./db_plugs');
var express = require('express');
var logger = require('./modules/logger');

var app = express();

module.exports.startServer = function (config) {
  console.log('==============');
  console.log(config.app.title);
  console.log();
  console.log('Starting server...');
  logger.init(config.server.logger)
  .then(dbPlug.init(config.db))
  .then(app.listen(config.server.port, config.server.host, function () {
      console.log('App listening at ' + config.server.host + ':' + config.server.port);
      console.log('==============');
  })).then(function() {
    //register routes
    return registerRoutes(config);
  }).catch(function(err) {
    console.error(err);
  });
}

function registerRoutes(config) {

}
