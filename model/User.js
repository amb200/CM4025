const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		trim: true,
		required: 'Name is required'
	},
	email: {
		index: true,
		type: String,
		trim: true,
		unique: true,
		match: [/.+\@.+\..+/, 'Please fill a valid email address'],
		required: 'Email is required'
	},
	password: {
		type: String,
		required: "Password is required"
	}
})

userSchema.index({ username: 1 }, { unique: false });


userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema)
