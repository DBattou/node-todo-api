const { ObjectId } = require('mongodb');
const { Todo } = require('../../models/todo');
const { User } = require('../../models/user');
const jwt = require('jsonwebtoken')
const user1Id = new ObjectId();
const user2Id = new ObjectId();

const users = [{
  _id: user1Id,
  email: 'baptiste@doucerain.com',
  password: 'MegaPassWord',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: user1Id, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
}, {
  _id: user2Id,
  email: 'qsdqsd@qsd.com',
  password: 'MegaPassWordTwo',
  tokens: [{
    access: 'auth',
    token: jwt.sign({ _id: user2Id, access: 'auth' }, process.env.JWT_SECRET).toString()
  }]
}];

const todos = [{
  _id: new ObjectId(),
  text: 'First test todo',
  _creator: user1Id
}, {
  _id: new ObjectId(),
  text: 'second test',
  _creator: user2Id,
  completed: true,
  completedAt: 333
}]

const populateTodos = (done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
};

const populateUsers = (done) => {
  User.remove({}).then(() => {
    var userOne = new User(users[0]).save();
    var userTwo = new User(users[1]).save();

    return Promise.all([userOne, userTwo]);
  }).then(() => done());
}

module.exports = { todos, populateTodos, users, populateUsers };
