'use strict';

module.exports.init = function(loggerConfig) {
  var logger = require('./'+loggerConfig.type);
  return logger.setup(loggerConfig);
}
