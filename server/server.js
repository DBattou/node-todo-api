require('./config/config');

const express = require('express');
const { ObjectId } = require('mongodb');
const bodyParser = require('body-parser');
const _ = require('lodash');

const { mongooseStart } = require('./db/mongoose');
const { BAD_REQUEST, NOT_FOUND, OK } = require('./ressources/http-status-codes');
const { Todo } = require('./models/todo');
const { User } = require('./models/user');
const { authenticate } = require('./middleware/authenticate');

mongooseStart();
const app = express();
const port = process.env.PORT;

app.use(bodyParser.json());

app.post('/todos', authenticate, (req, res) => {
  const todo = new Todo({
    text: req.body.text,
    _creator: req.user._id
  });

  todo.save().then((doc) => {
    res.status(OK).send(doc);
  }).catch(e => res.status(BAD_REQUEST).send(e));
});

app.get('/todos', authenticate, (req, res) => {
  Todo.find({ _creator: req.user._id })
    .then(todos => res.send({ todos }))
    .catch(e => res.status(BAD_REQUEST).send(e));
});

app.get('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;

  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).send();
  }

  Todo.findOne({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(NOT_FOUND).send();
    }
    return res.status(OK).send({ todo });
  }).catch(e => res.status(BAD_REQUEST).send(e));
});


app.delete('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).send();
  }

  Todo.findOneAndRemove({
    _id: id,
    _creator: req.user._id
  }).then((todo) => {
    if (!todo) {
      return res.status(NOT_FOUND).send();
    }
    res.status(OK).send({ todo });
  }).catch(e => res.status(BAD_REQUEST).send(e));
});

app.patch('/todos/:id', authenticate, (req, res) => {
  const id = req.params.id;
  const body = _.pick(req.body, ['text', 'completed']);

  if (!ObjectId.isValid(id)) {
    return res.status(NOT_FOUND).send();
  }

  if (_.isBoolean(body.completed) && body.completed) {
    body.completedAt = new Date().getTime();
  } else {
    body.completed = false;
    body.completedAt = null;
  }

  Todo.findOneAndUpdate({
    _id: id,
    _creator: req.user._id
  }, { $set: body }, { new: true }).then((todo) => {
    if (!todo) {
      return res.status(NOT_FOUND).send();
    }

    res.send({ todo });
  }).catch(e => res.status(BAD_REQUEST).send(e));
});

app.post('/users', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);
  const user = new User(body);

  user.generateAuthToken().then((token) => {
    res.header('x-auth', token).send(user);
  }).catch(e => res.status(BAD_REQUEST).send(e));
});

app.get('/users/me', authenticate, (req, res) => {
  res.send(req.user);
});

app.post('/users/login', (req, res) => {
  const body = _.pick(req.body, ['email', 'password']);

  User.findByCredentials(body.email, body.password).then((user) => {
    return user.generateAuthToken().then((token) => {
      res.header('x-auth', token).send(user);
    });
  }).catch(e => res.status(BAD_REQUEST).send(e));
});

app.delete('/users/me/token', authenticate, (req, res) => {
  req.user.removeToken(req.token).then(() => {
    res.status(OK).send();
  }, () => {
    res.status(BAD_REQUEST).send();
  });
});

app.listen(port, () => {
  console.log(`App started on port ${port}`); // eslint-disable-line
});

module.exports = { app };
