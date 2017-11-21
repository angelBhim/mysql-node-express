var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mysql= require('mysql');
var http = require('http');

var app = express();

/* view engine setup */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* uncomment after placing your favicon in /public */
/*app.use(favicon(path.join(__dirname, 'public', 'favicon.ico'))); */
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* Database connection */
app.use(function(req, res, next){
  global.connection = mysql.createConnection({
      /* host     : 'localhost', */
      /* user     : 'root', */
      /* password : 'root', */
      /* database : 'learn' */
      host     : 'cbg-jupiter-mysql-rdsinstance.cpvsue4umdzy.ap-southeast-1.rds.amazonaws.com',
      user     : 'dev_mganuza',
      password : 'm^6r(SE&',
      database : 'Xavier_Tool'
  });
  connection.connect();
  next();
});


/* Add headers */
app.use(function (req, res, next) {

    /* Website you wish to allow to connect */
    res.setHeader('Access-Control-Allow-Origin', 'http://13.229.28.244');

    /* Request methods you wish to allow */
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    /* Request headers you wish to allow */
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    /* Set to true if you need the website to include cookies in the requests sent */
    /* to the API (e.g. in case you use sessions) */
    res.setHeader('Access-Control-Allow-Credentials', true);

    /* Pass to next layer of middleware */
    next();
});


/* =============== START CONTROLLER */

/* controller defenition */
var index = require('./controller/index');
var stasSummary = require('./controller/stats/summaryController');
var statsServices = require('./controller/stats/servicesController');
var statsGroups = require('./controller/stats/groupsController');

/* routes */
app.use('/', index);
app.use('/api/v1/all', stasSummary);
app.use('/api/v1/services', statsServices);
app.use('/api/v1/groups', statsGroups);

/* ================ END CONTROLLER */

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/* error handler */
app.use(function(err, req, res, next) {
  /* set locals, only providing error in development */
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  /* render the error page */
  res.status(err.status || 500);
  res.render('error');
});

process.env.TZ = 'Asia/Manila';
console.log(new Date());
module.exports = app;
var server = http.createServer(app);
server.listen(4001);