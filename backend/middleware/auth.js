const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const User = require('../models/UserModel');

exports.isAuthenticatedUser = asyncHandler(async (req, res, next) => {
	const { token } = req.cookies;
	
	if (!token) {
		res.status(401);
		throw new Error('please login to access');
	}
	const decodeData = jwt.verify(token, process.env.JWT_SECRET_KEY);

	req.user = await User.findById(decodeData.id);

	next();
});

exports.isAdmin = (req, res, next) => {
	const role = req.user.role;
	if (role !== "Admin") {
		res.status(403);
		throw new Error(`Role:${role} not authorized to access here`);
	}
	next();
};
