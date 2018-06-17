const { ObjectId } = require('mongodb')
const { mongoose } = require('../server/db/mongoose')
const { Todo } = require('../server/models/todo');

var id = '6b268fc9b185a72e47727869coucou';

//ObjectId.isValid();

if (!ObjectId.isValid(id)) {
  console.log('Id not valid');
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos : ', todos);
// });
//
// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo : ', todo);
// });

Todo.findById(id).then((todo) => {
  if (!todo) {
    return console.log('Id not found');
  }
  console.log('Todo byId: ', todo);
}).catch((e) => {
  console.log(e);
});