require('../../../app');
var IM = require('./image-manager');

var crypto 		= require('crypto');
var moment 		= require('moment');

mongoosedbconn.open(function (e, d) {
	if (e) {
		console.log(e);
	} else {
		if (process.env.NODE_ENV == 'live') {
			mongoosedbconn.authenticate(process.env.DB_USER, process.env.DB_PASS, function (e, res) {
				if (e) {
					console.log('mongo :: error: not authenticated', e);
				}
				else {
					console.log('mongo :: authenticated and connected to database :: "' + dbName + '"');
				}
			});
		} else {
			console.log('mongo :: connected to database :: "' + dbName + '"');
		}
	}
});

var accounts = mongoosedbconn.collection('accounts');

/* login validation methods */

exports.autoLogin = function (user, pass, callback) {
	UserModel.findOne({ user: user }, function (e, o) {
		if (o) {
			o.pass == pass ? callback(o) : callback(null);
		} else {
			callback(null);
		}
	});
}

exports.manualLogin = function (user, pass, callback) {
	UserModel.findOne({ user: user }, function (e, o) {
		if (o == null) {
			callback('user-not-found');
		} else {
			validatePassword(pass, o.pass, function (err, res) {
				if (res) {
					callback(null, o);
				} else {
					callback('invalid-password');
				}
			});
		}
	});
}

/* record insertion, update & deletion methods */

exports.addNewAccount = function (req, callback) {

	//Don't save the image, but fetch the save path
	var imageSavePath = IM.saveImage(req, false);
	var newUserData = {
		name: req.body['name'],
		email: req.body['email'],
		user: req.body['user'],
		pass: req.body['pass'],
		country: req.body['country'],
		image: imageSavePath,
		tags: [],
		blogposts: []
	};

	UserModel.find({ user: newUserData.user }, function (e, o) {
		if (o.length != 0) {
			callback('username-taken');
		} else {
			UserModel.find({ email: newUserData.email }, function (e, o) {
				if (o.length != 0) {
					callback('email-taken');
				} else {
					saltAndHash(newUserData.pass, function (hash) {
						newUserData.pass = hash;
						newUserData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						//Save the image only after all the validation has been done
						IM.saveImage(req, true);
						new UserModel(newUserData).save(function (err) {
							callback(err);
						});
					});
				};
			});
		};
	});
}

exports.updateAccount = function (req, callback) {

	var newUserData = {
		id: req.session.user._id,
		name: req.body['name'],
		email: req.body['email'],
		pass: req.body['pass'],
		country: req.body['country'],
		image: imageSavePath,
		tags: [],
		blogposts: []
	};

	UserModel.findOne({ _id: getObjectId(newUserData.id) }, function (e, o) {
		o.name		= newUserData.name;
		o.email		= newUserData.email;
		o.country	= newUserData.country;
		console.log('newUserData.image = '+toString(newUserData.image));
		if(newUserData.image != '' && newUserData.image != null){
			o.image	= newUserData.image;
		};
		if (newUserData.pass == '') {
			accounts.save(o, { safe: true }, function (e) {
				if (e) callback(e);
				else callback(null, o);
			});
		} else {
			saltAndHash(newUserData.pass, function (hash) {
				o.pass = hash;
				accounts.save(o, { safe: true }, function (e) {
					if (e) callback(e);
					else callback(null, o);
				});
			});
		}
	});
}

exports.updatePassword = function (email, newPass, callback) {
	accounts.findOne({ email: email }, function (e, o) {
		if (e) {
			callback(e, null);
		} else {
			saltAndHash(newPass, function (hash) {
				o.pass = hash;
				accounts.save(o, { safe: true }, callback);
			});
		}
	});
}

/* account lookup methods */

exports.deleteAccount = function (id, callback) {
	accounts.remove({ _id: getObjectId(id) }, callback);
}

exports.getAccountByEmail = function (email, callback) {
	accounts.findOne({ email: email }, function (e, o) { callback(o); });
}

exports.validateResetLink = function (email, passHash, callback) {
	accounts.find({ $and: [{ email: email, pass: passHash }] }, function (e, o) {
		callback(o ? 'ok' : null);
	});
}

exports.getAllRecords = function (callback) {
	accounts.find().toArray(
		function (e, res) {
			if (e) callback(e)
			else callback(null, res)
		});
}

exports.delAllRecords = function (callback) {
	accounts.remove({}, callback); // reset accounts collection for testing //
}

/* private encryption & validation methods */

var generateSalt = function () {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function (str) {
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function (pass, callback) {
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

var validatePassword = function (plainPass, hashedPass, callback) {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

var getObjectId = function (id) {
	return new require('mongodb').ObjectID(id);
}

var findById = function (id, callback) {
	accounts.findOne({ _id: getObjectId(id) },
		function (e, res) {
			if (e) callback(e)
			else callback(null, res)
		});
}

var findByMultipleFields = function (a, callback) {
	// this takes an array of name/val pairs to search against {fieldName : 'value'} //
	accounts.find({ $or: a }).toArray(
		function (e, results) {
			if (e) callback(e)
			else callback(null, results)
		});
}