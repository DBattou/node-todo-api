const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

let mongooseStart = () => {
	mongoose.connect(process.env.MONGODB_URI);
}

module.exports = { mongooseStart };