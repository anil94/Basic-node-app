var Sequelize = require('sequelize');
var sequelize = new Sequelize('SecondDatabase', 'root', 'root');

var Users = {}
Users.local = sequelize.define('Users', {
	Username : {
		type : Sequelize.STRING,
		allowNull : false,
		unique: true,
		validate:  {
			isAlphanumeric: true,
			notEmpty: true,
			min: 6
		}
	},
	Email : {
		type : Sequelize.STRING,
		allowNull : false,
		unique: true,
		validate : {
			isEmail: true,
			notEmpty: true
		}
	},
	PasswordHash : {
		type : Sequelize.STRING,
		allowNull : false,
		validate : {
			notEmpty: true,
			min: 6
		}
	},
	ProfilePhoto : {
		type : Sequelize.STRING,
		defaultValue: '/url/to/photo'
	},
	IsAdmin : {
		type : Sequelize.BOOLEAN,
		defaultValue: false
	}
}, {
	comment: "Users table is used for storing the personal details of a User."
});

Users.google = sequelize.define('GoogleUser', {
	GoogleId : {
		type : Sequelize.STRING,
		allowNull : false
	},
	Token : {
		type : Sequelize.STRING,
		allowNull : false
	},
	Email : {
		type : Sequelize.STRING,
		allowNull : false,
		unique: true,
		validate : {
			isEmail: true,
			notEmpty: true
		}
	},
	Name : {
		type : Sequelize.STRING
	}
});

sequelize.sync()

module.exports = {'Sequelize' : sequelize, 'Users' : Users };