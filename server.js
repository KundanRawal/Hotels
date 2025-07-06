const express = require('express')
const app = express();
const port = process.env.PORT || 3000;
require('dotenv').config();

const db = require('./db');
const person = require('./models/person');
const menu = require('./models/menu');
const passport = require('./Auth');
const localAuthMiddelware = passport.authenticate('local', { session: false });
app.use(passport.initialize());


const bodyParser = require('body-parser');
app.use(bodyParser.json());

const logRequest = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] Request received: ${req.originalUrl}`);
    next();
}

app.use(logRequest);

app.get('/', function (req, res) {
    res.send('Hotel foods')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

const personrouter = require('./routes/personr');
app.use('/person', personrouter);

const menurouter = require('./routes/menur');
app.use('/menu', localAuthMiddelware, menurouter);