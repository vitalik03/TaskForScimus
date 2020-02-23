const bodyParser = require('body-parser');
const cors = require('cors');
const express = require('express');
const mysql = require('mysql');

const userRoute = require('./routes/users');
const loginRoute = require('./auth/index');

const db = require('./config/database');

db.authenticate()
    .then(() => console.log("db Connected"))
    .catch((err) => console.log("Error" + err))

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));


app.use('/users', loginRoute);
app.use('/users', userRoute);

app.listen('3000', ()=> {
    console.log('Server started on port 3000')
});
