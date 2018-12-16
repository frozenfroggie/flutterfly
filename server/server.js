const helmet = require('helmet');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(helmet());

const logger = require('./startup/logger');
require('./startup/routes')(app);
require('./startup/db')();

let logFormat = 'combined';
if (process.env.NODE_ENV !== 'production') {
  logFormat = 'dev';
}
app.use(morgan(logFormat, {stream: logger.stream}));

app.get('/api/test', (req, res) => {
  logger.error('ERROR');
  logger.warn('WARNING');
  logger.info('INFO');
  res.send('oks!');
});

const PORT = process.env.PORT || 3001;
const server = app.listen(PORT, () => {
  logger.info(`Listening on port ${PORT}...`);
});

module.exports = server;
