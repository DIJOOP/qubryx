const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema(
	{
		user: {
			type: mongoose.Schema.ObjectId,
			ref: 'User',
			required: true
		},
		filename: {
			type: String,
			required: true,
           
		},
		file: [
			{
				productdate: {
					type: Date,
					required: true
				},
				product: {
					type: String,
					required: true
				},
				ticketnumber: {
					type: Number,
					required: true
				},
				opendate: {
					type: Date,
					required: true
				},
				closedate: {
					type: Date,
					required: true
				},
				
				openreading: {
					type: Number,
					required: true
				}
			}
		]
	},
	{ timestamps: true }
);


module.exports=mongoose.model('Data',dataSchema)