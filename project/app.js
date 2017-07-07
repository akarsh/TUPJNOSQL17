/**
	* Node.js Login Boilerplate
	* More Info : http://kitchen.braitsch.io/building-a-login-system-in-node-js-and-mongodb/
	* Copyright (c) 2013-2016 Stephen Braitsch
	* Copyright (c) 2017 Akarsh Seggemu
**/

require('./globalconfig');
var http = require('http');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload');
//Create connection to mongoose
var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1 } } };
global.mongoosedb = mongoose.connect('mongodb://localhost/blog-mongoose', options);
global.mongoosedbconn = mongoosedb.connection;
//Create moneo instance and export for schema plugin
global.moneo = require("moneo")({url:'http://localhost:7474'});
//Create connection to Redis
var redis = require("redis");
global.redisclient = redis.createClient();
redisclient.on('ready',function() {
 console.log("Redis is ready");
});
redisclient.on("error", function (err) {
    console.log("Error " + err);
});
redisclient.on('connect', function() {
    console.log('Connected to redis');
});
//Create connection to neo4j
global.neo4j = require('neo4j');
//Create a rethinkDB session store
// global.RDBStore = require('express-session-rethinkdb')(session);
// global.thinky = require('thinky')({db: "test"});
// Create a mongo session store
var MongoStore = require('connect-mongo')(session);

// connection settings passed to user model
global.UserModel = require('./app/server/model/userModel')(moneo, mongoosedb);

var app = express();

app.locals.pretty = true;
app.set('port', process.env.PORT || appPort);
app.set('views', __dirname + '/app/server/views');
app.set('view engine', 'jade');
app.use(cookieParser());
app.use(bodyParser.json());
app.use(fileUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('stylus').middleware({ src: __dirname + '/app/public' }));
app.use(express.static(__dirname + '/app/public'));
app.use(express.static(__dirname + '/app/server/userImages'));

// rethinkDB session store
// var rdbStore = new RDBStore({
//   connection: thinky.r,
//   table: 'session',
//   sessionTimeout: 86400000,
//   flushInterval: 60000,
//   debug: false
// });
//
// app.use(session({
//   key: 'sid',
//   secret: 'my5uperSEC537(key)!',
//   cookie: { maxAge: 860000 },
//   store: rdbStore,
//   resave: true,
//   saveUninitialized: true
// }));

// mongo session store
app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: 'mongodb://localhost:27017/blog-mongoose' })
	})
);

require('./app/server/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;
