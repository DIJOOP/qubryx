const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
	{
		name: {
			type: String,
			required: [ true, 'Please enter a name' ],
			maxlength: [ 30, 'name must be maximum 30 characters' ],
			minlength: [ 3, 'name must be minimum 3 charectors' ]
		},
		email: {
			type: String,
			required: [ true, 'plaese enter your email' ],
			unique: true,
			validate: [ validator.isEmail, 'please enter valid email' ]
		},

		password: {
			type: String,
			select: false,
			required: [ true, 'please enter your password' ],
			minlength: [ 8, 'password must be minimum 8 charectors' ],
			
			
		},
		role: {
			type: String,
			default: 'User'
		},

	},
	{ timestamps: true }
);

// BCRYPT PASSWORD
userSchema.pre('save', async function(next) {
	if (!this.isModified('password')) {
		next();
	}
	this.password = await bcrypt.hash(this.password, 10);
});

// COMPARE PASSWORD

userSchema.methods.comparePassword = async function(password) {
	return await bcrypt.compare(password, this.password);
};


// JWT TOKEN
userSchema.methods.getJWTtoken = function() {
	return jwt.sign(
		{
			id: this._id
		},
		process.env.JWT_SECRET_KEY,
		{ expiresIn: process.env.JWT_EXPIRE }
	);
};

module.exports = mongoose.model('User', userSchema);
