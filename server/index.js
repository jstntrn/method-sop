const express = require('express');
require('dotenv').config();
const massive = require('massive');
const { SERVER_PORT, DB_CONNECTION, SESSION_SECRET } = process.env;
const ctrl = require('./controllers/controller');
const session = require('express-session');

const app = express();
app.use(express.json())

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    maxAge: null
}));

massive(DB_CONNECTION).then(db => {
    app.set('db', db)
    app.listen(SERVER_PORT, () => console.log(`The ship is sailing from port ${SERVER_PORT}`))
})