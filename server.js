if (!process.env.NODE_ENV) process.env.NODE_ENV = 'development';
if (process.env.NODE_ENV === 'development') require('dotenv').config();

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const jsonParser = require('body-parser').json();

const app = express();
const server = require('http').Server(app);
const PORT = process.env.SERVER_PORT || 3000;

app.use(cors());

// Parse application/json and look for raw text
app.use(bodyParser.urlencoded({ extended: true }));
app.use(jsonParser);

// Use controllers
app.use(require('./controllers'));
app.use(function (req, res) {
  res.status(404).json({ message: 'Resource not found' });
});

function stop() {
  app.close();
}

server.listen(PORT);
console.log("Listening on port " + PORT);

module.exports = app;
