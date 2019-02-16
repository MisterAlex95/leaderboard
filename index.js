if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();

const app = express();
const server = require('http').Server(app);

app.use(cors());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(jsonParser);
const PORT = process.env.SERVER_PORT || 3000;

app.use(require('./controllers'));
app.use(function (req, res) {
  res.json({ error: { code: 404, message: 'Resource not found' } });
});

server.listen(PORT);
