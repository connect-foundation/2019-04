const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const package = new Schema({
	module: String,
	version: String,
	data: String
});

module.exports = package;
