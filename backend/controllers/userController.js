const User = require('../models/UserModel');
const sendToken = require('../utils/jwtToken');
const asyncHandler = require('express-async-handler');







exports.registerUser = asyncHandler(async (req, res) => {
	console.log(req.body);

	const { confirmPassword, password } = req.body;
	if (!confirmPassword || confirmPassword != password) {

		res.status(404);
		throw new Error('entererd passwords doesnt match');
	}

	const userdata={
		name:req.body.name,
		email:req.body.email,
		password:req.body.password

	}


	const user = await User.create(userdata);


	sendToken(user, 200, res)
});



exports.userLogin = asyncHandler(async (req, res) => {
	const { email, password } = req.body;

	if (!email || !password) {
		res.status(404);
		throw new Error('enter valid email and password');
	}
	const user = await User.findOne({ email }).select('+password');

	if (!user) {
		res.status(401);
		throw new Error('user doesnt exists');
	}

	const isPasswordMatched = await user.comparePassword(password);

	if (!isPasswordMatched) {
		res.status(401);
		throw new Error('invalid password');
	}
	sendToken(user, 200, res);
});

exports.userLogout = asyncHandler(async (req, res) => {
	res
		.status(200)
		.cookie('token', null, {
			expires: new Date(Date.now()),
			httpOnly: true
		})
		.json({ success: true, message: 'loggedOut successfully' });
});

exports.getUserDetail = asyncHandler(async (req, res) => {
	console.log(req.user.id);
	const user = await User.findById(req.user.id);

	if (!user) {
		res.status(404);
		throw new Error('please Login');
	}

	res.status(200).json({ success: true, user });
});
