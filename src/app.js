require('dotenv').config();
const { resolve } = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const i18n = require('./config/i18n.config');
const languageMiddleware = require('./middlewares/language.middleware');
const app = express();
const { port, callback } = require('./modules/port');

app.set('views', resolve(__dirname, './views'));
app.set('view engine', 'ejs');

// Render terminates TLS at its edge proxy, so the visitor's address arrives in
// X-Forwarded-For rather than on the socket. Trust exactly one hop: `true`
// would trust the whole chain and let a client forge the header, which would
// defeat the contact form's per-IP rate limit.
app.set('trust proxy', 1);

app.use(cookieParser());
app.use(i18n.init);
app.use(languageMiddleware);

app.use(require('./modules/public'));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', require('./routes/main.routes'));
app.use('/users', require('./routes/users.routes'));
app.use('*', require('./routes/404.routes'));

app.listen(port, callback(port));