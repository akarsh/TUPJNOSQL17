# Project file structure

* `app.js` - [Application starting point](app.js)
* `app/server/routes.js` - [URL(HTTP method) to controller mapping and all file paths of jade files are declared](app/server/routes.js)
* `app/server/views/` - [Contains the view templates for the application](app/server/views/)
* `public/js/controllers/homeController.js` - [Handles the navigation for major buttons](app/public/js/controllers/homeController.js)
* `app/server/views/modals/` - [Alerts in modals](app/server/views/modals/)
* `app/server/modules/` - [Contains various module/functional managers](app/server/modules/)
* `app/server/userImages/` - Contains the user uploaded profile pictures
* `app/public/` - [Contains the js libraries and css dependencies used in the view templates](app/public/)
* `app/public/css/style.styl` - [Stylus style sheet language that compiles down to css](app/public/css/style.styl)
* `node_modules/` - [Contains all the downloaded dependent node modules](node_modules/)
* `globalconfig.js` - [Contains all the global level application configurations](globalconfig.js)
* `package.json` - [Contains the dependency configuration for npm managed node modules](package.json)



## NOSQL Databases
- Redis

		$ redis-server

- MongoDB

		$ mongod --replSet myDevReplSet

	- mongo-shell

		$ rs.initiate()


- Neo4j

	start the community edition of neo4j
	- in terminal or shell
		
		$ mongo-connector -m localhost:27017 -t http://localhost:7474/db/data -d neo4j_doc_manager
		
The mongo-connector command is explained here,

    -m provides the MongoDB endpoint
    -t specifies the Neo4j endpoint
    -d specifies Neo4j Doc Manager as the doc manager


		
### A basic account management system built in Node.js with the following features:

* New User Account Creation
* Secure Password Reset via Email
* Ability to Update / Delete Account
* Session Tracking for Logged-In Users
* Local Cookie Storage for Returning Users
* Blowfish-based Scheme Password Encryption


### Node-Login is built on top of the following libraries :

* [Node.js](http://nodejs.org/) - Application Server
* [Express.js](http://expressjs.com/) - Node.js Web Framework
* [MongoDb](http://mongodb.org/) - Database Storage
* [Jade](http://jade-lang.com/) - HTML Templating Engine
* [Stylus](http://stylus-lang.com/) - CSS Preprocessor
* [EmailJS](http://github.com/eleith/emailjs) - Node.js > SMTP Server Middleware
* [Moment.js](http://momentjs.com/) - Lightweight Date Library
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library


## Installation & Setup
1. Install [Node.js](https://nodejs.org/) & [MongoDB](https://www.mongodb.org/) if you haven't already.
2. Clone this repository and install its dependencies.
		
		> git clone git://github.com/braitsch/node-login.git node-login
		> cd node-login
		> npm install
		
3. In a separate shell start the MongoDB daemon.

		> mongod

4. From within the node-login directory, start the server.

		> node app
		
5. Open a browser window and navigate to: [http://localhost:3000](http://localhost:3000)

## Password Retrieval

To enable the password retrieval feature it is recommended that you create environment variables for your credentials instead of hard coding them into the [email dispatcher module](https://github.com/braitsch/node-login/blob/master/app/server/modules/email-dispatcher.js).

To do this on OSX you can simply add them to your .profile or .bashrc file.

	export EMAIL_HOST='smtp.gmail.com'
	export EMAIL_USER='your.email@gmail.com'
	export EMAIL_PASS='1234'

[![node-login](./readme.img/retrieve-password.jpg?raw=true)](https://nodejs-login.herokuapp.com)

# Regarding architecture
[some thoughts about the app's architecture.](http://kitchen.braitsch.io/building-a-login-system-in-node-js-and-mongodb/)
