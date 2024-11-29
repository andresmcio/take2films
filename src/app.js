require('dotenv').config();
const { readFileSync } = require('fs');
const { resolve } = require('path');
const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const i18n = require('./config/i18n.config');
const languageMiddleware = require('./middlewares/language.middleware');
const app = express();
const { port, callback } = require('./modules/port');

const options = {
    key: readFileSync('./take2films_key.pem'),
    cert: readFileSync('./take2films_cert.pem')
}

app.set('views', resolve(__dirname, './views'));
app.set('view engine', 'ejs');

app.use(cookieParser());
app.use(i18n.init);
app.use(languageMiddleware);

app.use(require('./modules/public'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', require('./routes/main.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('*', require('./routes/404.routes'));

https.createServer(options, app).listen(port, () => {
    callback(port); 
});