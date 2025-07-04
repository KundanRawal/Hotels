const mongooes = require('mongoose');
//const mongoURL = 'mongodb://localhost:27017/Hotel'
const mongoURL = 'mongodb+srv://KUNKUN02:2850396174@cluster0.wcabvwf.mongodb.net/'
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