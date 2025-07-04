const mongooes = require('mongoose');
const mongoURL = process.env.MONGO_URL || process.env.LOCAL;
mongooes.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const db = mongooes.connection;

db.on('error', (err) => {
    console.error('error connecting to DB', err);
})

db.on('connected', () => {
    console.log('connected to DB');
})

db.on('disconnected', () => {
    console.log('disconnected to DB');
})

module.exports = db;