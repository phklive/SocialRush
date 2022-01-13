const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
	id: String,
	name: String,
	email: String,
	password: String,
	score: Number,
})

const CardSchema = new Schema({
	title: String,
	text: String,
	answer: Boolean,
	author: String,
})

const User = mongoose.model('User', UserSchema)
const Card = mongoose.model('Card', CardSchema)

exports.User = User
exports.Card = Card
