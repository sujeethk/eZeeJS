'use strict';

var dbPlug = require('./db_plugs'),
  express = require('express'),
  chalk = require('chalk'),
  morgan = require('morgan'),
  logger = require('./modules/logger'),
  bodyParser = require('body-parser'),
  session = require('express-session'),
  favicon = require('serve-favicon'),
  compress = require('compression'),
  methodOverride = require('method-override'),
  cookieParser = require('cookie-parser'),
  helmet = require('helmet'),
  flash = require('connect-flash'),
  path = require('path'),
  _ = require('lodash'),
  lusca = require('lusca');

var app = express();

module.exports.startServer = function (config) {
  initMiddleware(config);
  dbPlug.init(config.db)
  .then(registerRoutes(config.server.routes))
  .then(listen(config))
  .catch(function(err) {
    console.error(chalk.red(err));
  });
}

function registerRoutes(routes) {

}

function listen(config) {
  app.get('/', function (req, res) {
    res.send('Hello World')
  });

 app.listen(config.server.port, config.server.host, function () {
   // Create server URL
   var server = (process.env.NODE_ENV === 'production' ? 'https://' : 'http://') + config.server.host + ':' + config.server.port;
   // Logging initialization
   console.log('--');
   console.log(chalk.green(config.app.title));
   console.log();
   console.log(chalk.green('Environment:     ' + process.env.NODE_ENV));
   console.log(chalk.green('Server:          ' + server));
   console.log(chalk.green('Database:        ' + config.db.uri));
 });
}

function initMiddleware(config) {
    logger = logger.init(config.server.log);
    if(!logger.setupFileLogger(config.server.log)) {
      console.log('Error Initiating Logger');
    }

    // Should be placed before express.static
    app.use(compress({
      filter: function (req, res) {
        return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
      },
      level: 9
    }));

    // Initialize favicon middleware
    app.use(favicon(config.app.favicon));

    // Enable logger (morgan) if enabled in the configuration file
    if (config.server.log.format) {
      app.use(morgan(logger.getLogFormat(), logger.getMorganOptions()));
    }

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
      // Disable views cache
      app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
      app.locals.cache = 'memory';
    }

    // Request body parsing middleware should be above methodOverride
    app.use(bodyParser.urlencoded({
      extended: true
    }));
    app.use(bodyParser.json());
    app.use(methodOverride());

    // Add the cookie parser and flash middleware
    app.use(cookieParser());
    app.use(flash());

}
