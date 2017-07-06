# Project file structure

* [`app.js`](app.js) - Application starting point
* [`app/server/routes.js`](app/server/routes.js) - URL(HTTP method) to controller mapping and all file paths of jade files are declared
* [`app/server/views/`](app/server/views/) - Contains the view templates for the application
* [`public/js/controllers/homeController.js`](app/public/js/controllers/homeController.js) - Handles the navigation for major buttons
* [`app/server/views/modals/`](app/server/views/modals/) - Alerts in modals
* [`app/server/modules/`](app/server/modules/) - Contains various module/functional managers
* [`app/server/userImages/`](app/server/userImages/) - Contains the user uploaded profile pictures
* [`app/public/`](app/public/) - Contains the js libraries and css dependencies used in the view templates
* [`app/public/css/style.styl`](app/public/css/style.styl) - Stylus style sheet language that compiles down to css
* [`node_modules/`](node_modules/) - Contains all the downloaded dependent node modules
* [`globalconfig.js`](globalconfig.js) - Contains all the global level application configurations
* [`package.json`](package.json) - Contains the dependency configuration for npm managed node modules



## NOSQL Databases
The following databases must be started
- Redis

		$ redis-server
		
	For [redis-gui](https://github.com/joeferner/redis-commander)
	
		$ npm install -g redis-commander
		$ redis-commander

- MongoDB

		$ mongod

- Neo4j

	start the community edition of neo4j

- Rethinkdb

		$ rethinkdb

##### Optional:
If you don't want to use moneo library and would like to use the mongoconnector and neo4j docmanager. Here is the procedure,

1. Start the MongoDB with replicate set

		$ mongod --replSet myDevReplSet

2. Then, star the mongo shell in terminal

		$ mongo
		$ rs.initiate()

3. Make sure neo4j is started and then, in terminal

		$ mongo-connector -m localhost:27017 -t http://localhost:7474/db/data -d neo4j_doc_manager

    mongo-connector command is explained here,

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
* [Jade](http://jade-lang.com/) - HTML Templating Engine
* [Stylus](http://stylus-lang.com/) - CSS Preprocessor
* [EmailJS](http://github.com/eleith/emailjs) - Node.js > SMTP Server Middleware
* [Moment.js](http://momentjs.com/) - Lightweight Date Library
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/) - UI Component & Layout Library

##### databases
| NOSQL database | Type          | Usage in the project |
| -------------- | ------------- | -------------------- |
| [MongoDb](http://mongodb.org/) | Document store | Storing Author data and blog tags |
| [Neo4j](https://neo4j.com/) | Graph database | Recommending blog tags to authors  |
| [Redis](https://redis.io/) | Key Value / Tuple Store | Storing blog data |
| [Rethinkdb](https://www.rethinkdb.com/) | Document store | Session storage |


## Installation & Setup
1. Install [Node.js](https://nodejs.org/) and [MongoDB](https://www.mongodb.org/) if you haven't already.
2. Go into the project folder.

		$ cd project

3. Install the dependencies.

		$ npm install -save

3. In a separate shell start the MongoDB daemon, Redis DB, Neo4j DB.

		$ mongod

		$ redis-server

		start the community edition of neo4j

		$ rethinkdb

4. From within the node-login directory, start the server.

		$ node app

	For development use nodemon.

		$nodemon app

5. Open a browser window and navigate to: [http://localhost:3000](http://localhost:3000)

## Password Retrieval

To enable the password retrieval feature it is recommended that you create environment variables for your credentials instead of hard coding them into the [email dispatcher module](https://github.com/braitsch/node-login/blob/master/app/server/modules/email-dispatcher.js).

To do this on OSX you can simply add them to your .profile or .bashrc file.

	export EMAIL_HOST='smtp.gmail.com'
	export EMAIL_USER='your.email@gmail.com'
	export EMAIL_PASS='1234'

[![node-login](./readme.img/retrieve-password.jpg?raw=true)](https://nodejs-login.herokuapp.com)

### Recomended literature
* Regarding architecture
[some thoughts about the app's architecture.](http://kitchen.braitsch.io/building-a-login-system-in-node-js-and-mongodb/)
