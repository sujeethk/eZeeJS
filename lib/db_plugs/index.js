'use strict';

var db;

module.exports.init = function(db) {

  db = require('./' + db.type + '/' + db.name);
  return new Promise(function(resolve, reject) {
    db.connect(db)
    .then(db.loadModels(db.tables))
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
