const { ObjectId } = require('mongodb');

const { mongoose } = require('../server/db/mongoose');
const { Todo } = require('../server/models/todo');
const { User } = require('../server/models/user');

//
// Todo.remove({}).then((result) => {
//   console.log(result);
// });
//
//
// Todo.findOneAndRemove()
// Todo.findByIdAndRemove()

//
// Todo.findByIdAndRemove('5b2965901028a4514861bb1b').then((todo) => {
//   console.log(todo);
// });


Todo.findOneAndRemove({ _id: '5b2965df1028a4514861bb5b' }).then((todo) => {
  console.log(todo);
})