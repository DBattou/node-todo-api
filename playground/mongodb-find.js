// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectId } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, client) => {
  if (err) {
    return console.log('Unable to connect to MongoDB');
  }
  console.log('Connected to MongoDB server');
  db = client.db('TodoApp');

  // db.collection('Todos').find({
  //   _id: new ObjectId('5b25490a16e62121abafe591')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log(err);
  // });
  // db.collection('Todos').find().count().then((count) => {
  //   console.log('count : ' + count);
  // }, (err) => {
  //   console.log(err);
  // });

  db.collection('Users').find({ name: 'Baptiste' }).count().then((count) => {
    console.log('count : ' + count);
  }, (err) => {
    console.log(err);
  });
  //client.close();
});