'use strict';

var db;

module.exports.init = function(config) {

  db = require('./' + config.db.type + '/' + config.db.name);
  return new Promise(function(resolve, reject) {
    db.connect(config)
    .then(db.loadModels(config))
    .then(function() {
      resolve();
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
