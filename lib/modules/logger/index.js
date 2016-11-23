'use strict';

module.exports.init = function(loggerConfig) {
  return require('./'+loggerConfig.type);
}
