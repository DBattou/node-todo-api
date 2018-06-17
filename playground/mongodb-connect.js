// const MongoClient = require('mongodb').MongoClient;
const {
  MongoClient,
  ObjectId
} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  db = client.db('TodoApp');

  var hello = {
    coucou: 'coucu'
  }

  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // });

  // Insert new doc into Users (name, age, location)
  // db.collection('Users').insertOne({
  //   name: 'Baptiste',
  //   age: 28,
  //   location: '51 quai de Valmy'
  // }, (err, result) => {
  //   if (err) {
  //     return console.log('Unable to add new user');
  //   }
  //
  //   // console.log(JSON.stringify(result.ops, undefined, 2));
  //   console.log(result.ops[0]._id.getTimestamp());
  // });
  client.close();
});