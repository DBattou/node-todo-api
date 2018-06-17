const { mongoose } = require('./db/mongoose');
var bodyParser = require('body-parser');
var express = require('express');

var { Todo } = require('./models/todo');
var { User } = require('./models/user');

var app = express();

app.use(bodyParser.json());

app.get('/hello', (req, res) => {
  res.send('Hello world');
  console.log('HelloWorld');
});

app.post('/todos', (req, res) => {
  var todo = new Todo({
    text: req.body.text
  });

  todo.save().then((doc) => {
    res.status(200).send(doc);
  }, (e) => {
    res.status(400).send(e);
  });
});

app.listen(3000, () => {
  console.log('App started on port 3000');
});

module.exports = { app };