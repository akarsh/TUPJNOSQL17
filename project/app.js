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
//Remove after fixing session issue with rethinkDB - START
var MongoStore = require('connect-mongo')(session);
//Remove after fixing session issue with rethinkDB - END

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

//Create connection to mongoose
var mongoose = require('mongoose');
var options = { server: { socketOptions: { keepAlive: 1 } } };
global.mongoosedb = mongoose.connect('mongodb://localhost/blog-mongoose', options);
global.mongoosedbconn = mongoosedb.connection;

//Create moneo instance and export for schema plugin 
//global.moneo = require("moneo")({url:'http://localhost:7474'});
global.moneo = require("moneo");

global.UserModel 	= require('./app/server/model/userModel')(moneo, mongoosedb);

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
global.RDBStore = require('session-rethinkdb')(session);

// rethinkDB session store
var r = require('rethinkdbdash')({
    servers: [
        {host: 'localhost',
        port: 28015}
    ]
});
var store = new RDBStore(r,  {
    browserSessionsMaxAge: 5000, // optional, default is 60000 (60 seconds). Time between clearing expired sessions.
    table: 'session' // optional, default is 'session'. Table to store sessions in.
});
/*
app.use(session({
    // https://github.com/expressjs/session#options
    secret: 'keyboard cat',
    cookie: {
        maxAge: 600000
    },
    store: store,
    resave: true,
    saveUninitialized: true
}));
*/

//Remove after fixing session issue with rethinkDB - START
app.use(session({
	secret: 'faeb4453e5d14fe6f6d04637f78077c76c73d1b4',
	proxy: true,
	resave: true,
	saveUninitialized: true,
	store: new MongoStore({ url: 'mongodb://localhost:27017/blog-mongoose' })
	})
);
//Remove after fixing session issue with rethinkDB - END

require('./app/server/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});

module.exports = app;