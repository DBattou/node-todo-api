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
    token: jwt.sign({ _id: user1Id, access: 'auth' }, 'abc123').toString()
  }]
}, {
  _id: user2Id,
  email: 'qsdqsd@qsd.com',
  password: 'MegaPassWordTwo'
}];

const todos = [{
  _id: new ObjectId(),
  text: 'First test todo'
}, {
  _id: new ObjectId(),
  text: 'second test',
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