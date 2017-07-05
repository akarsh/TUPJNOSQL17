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
// Rethink db session store
var RDBStore = require('session-rethinkdb')(session);
// mongoose
var mongoose = require('mongoose');
// neo4j
var neo4j    = require('neo4j');
// moneo
var moneo = require("moneo")({url:'http://localhost:7474'});

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

// Rethink db session store
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

require('./app/server/routes')(app);

http.createServer(app).listen(app.get('port'), function(){
	console.log('Express server listening on port ' + app.get('port'));
});
