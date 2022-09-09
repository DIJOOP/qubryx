const Data = require('../models/DataModel');
const asyncHandler = require('express-async-handler');

exports.addExcellData = asyncHandler(async (req, res) => {
	req.body.user = req.user._id;

	const data = await Data.create(req.body);

	res.status(200).json({
		success: true
	});
});

exports.getMyFiles = asyncHandler(async (req, res) => {

	const userid = req.user._id;
	const files = await Data.find(
		{ user: userid },
		{
			filename: 1,
			user: 1,
			_id: 1,
			createdAt: 1
		}
	);

	res.status(200).json({
		success: true,
		files
	});
});

exports.getSingleFile = asyncHandler(async (req, res) => {
	const file = await Data.findById(req.params.id);

	res.status(200).json({
		success: true,
		file
	});
});
