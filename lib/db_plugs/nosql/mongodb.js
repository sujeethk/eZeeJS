'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var connect = function(dbPath) {
  return new Promise(function(resolve, reject) {
    mongoose.connect(dbPath.uri, dbPath.options, function (err) {
      if (err) {
        reject(err);
      } else {
        var configSchema = new Schema({
          title: Schema.Types.Mixed
        });

        mongoose.model('config', configSchema, 'config');
        resolve();
      }
    });
  });
}

var loadModels = function(config) {
  return new Promise(function(resolve, reject) {
    config = JSON.parse(JSON.stringify(config));
    config.tables.forEach(function(table) {
      var Schema = mongoose.Schema;
      var tableSchema = {};
      table.fields.forEach(function(field) {
        tableSchema[field.name]= {
          type: field.type,
          default: field.default,
          trim: field.trim,
          required: field.required
        };
      });
      mongoose.model(table.name, tableSchema);
    });
    resolve(config);
  });
}

var execute = function(statement) {
  switch(statement.command) {
    case 'select':
      return select(statement);
      break;

    case 'create':
      create(statement);
      break;

    case 'insert':
      insert(statement);
      break;

    case 'update':
      update(statement);
      break;

    case 'delete':
      remove(statement);
      break;

    default:
      return new Error('Invalid database command');
  }
}

function select(statement) {
  return new Promise(function(resolve, reject) {
    var Table = mongoose.model(statement.table);
    Table.find({}, function (err, items) {
      if(err) {
        reject(err);
      } else {
        resolve(items);
      }
    });
  });
}

function create(statement) {

}

function insert(statement) {

}

function update(statement) {

}

function remove(statement) {

}

module.exports = {
  connect: connect,
  loadModels: loadModels,
  execute: execute
}
