const errorHandler = (err, req, res, next) => {
	const statusCode = res.statusCode
	const message=err.message
	

	if(err.code=="11000"){
		res.status(500).json({
			status: false,
			message:"email already exists"
		});

	  }
	 
	res.status(statusCode).json({
		status: false,
		message
	});
};

module.exports={errorHandler}