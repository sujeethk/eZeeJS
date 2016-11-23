'use strict';

var dbPlug;

module.exports.init = function(db) {

  dbPlug = require('./' + db.type + '/' + db.name);
  return new Promise(function(resolve, reject) {
    dbPlug.connect(db)
    .then(dbPlug.loadModels(db.tables))
    .then(function() {
      resolve();
    }).catch(function(err) {
      reject(err);
    });
  });
}

module.exports.execute = function(statement) {
  return dbPlug.execute(statement);
}
