'use strict';

var db;

module.exports.init = function(dbPath) {

  var config;
  db = require('./' + dbPath.type + '/' + dbPath.name);
  return new Promise(function(resolve, reject) {
    db.connect(dbPath).then(function(value){
      return selectConfig(dbPath.statement);
    }).then(function(config){
      return db.loadModels(config[0]);
    }).then(function(config) {
      resolve(config);
    }).catch(function(err) {
      reject(err);
    });
  });
}

module.exports.execute = function(statement) {
  return db.execute(statement);
}

function selectConfig(statement) {
  return module.exports.execute(statement);
}
