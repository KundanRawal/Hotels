const express = require('express')
const app = express();
const port = 3000;
const db = require('./db');
const person = require('./models/person');
const menuitems = require('./models/menuitems');
const bodyParser = require('body-parser');
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.send('Hello World!')
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}!`)
})

const personrouter = require('./routes/personr');
app.use('/person', personrouter);

const menuitemrouter = require('./routes/menuitemsr');
app.use('/menuitem', menuitemrouter);