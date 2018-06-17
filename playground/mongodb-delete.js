// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  db = client.db('TodoApp');

  //delete many
  // db.collection('Todos').deleteMany({ text: 'eat lunch' }).then((result) => {
  //   console.log(result);
  // });

  // deleteOne
  // db.collection('Todos').deleteOne({ text: 'eat lunch' }).then((result) => {
  //   console.log(result);
  // });

  // findOne and delete
  db.collection('Todos').findOneAndDelete({ text: 'eat lunch' }).then((result) => {
    console.log(JSON.stringify(result, undefined, 2));
  });


});