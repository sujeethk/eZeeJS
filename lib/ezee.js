'use strict';

var dbPlug = require('./db_plugs');
var express = require('express');

var app = express();

module.exports.startServer = function (config) {
  //Initiate DB connection and get config
  dbPlug.init(config).then(function() {
    // Start the app by listening on <port> at <host>
    app.listen(config.server.port, config.server.host, function () {
      console.log('==============');
      console.log(config.app.title);
      console.log();
      console.log('App listening at ' + config.server.host + ':' + config.server.port);
      console.log('==============');
    });
  }).then(function() {
    //register routes
    return registerRoutes(config);
  }).catch(function(err) {
    console.error(err);
  });
}

function registerRoutes(config) {

}
