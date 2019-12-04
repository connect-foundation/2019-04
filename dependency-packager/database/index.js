const mongoose = require('mongoose');
const { package } = require('./schema');

mongoose.connect(process.env.DEV_DATABASE_URI, { useNewUrlParser: true });

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {});

const Package = mongoose.model('Package', package);

module.exports = { Package };
