require('dotenv').config();
const { resolve } = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const app = express();
const { port, callback } = require('./modules/port');

app.set('views', resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(require('./modules/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/main.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('*', require('./routes/404.routes'));

app.listen( port, callback(port));