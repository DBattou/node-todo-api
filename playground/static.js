// app.use(express.static('public')); permet de servir des fichiers statiques dans Express
// Documentation : http://expressjs.com/fr/starter/static-files.html

//Exemple
const express = require('express');
var fs = require('fs');

let app = express();

// Declare middleware app.use()
app.use(express.static(__dirname + 'public/'));

// You can now access files in the public folder by usging request like : http://localhost:3000/kitten.jpg
// The name of the static folder IS NOT in the url. http://localhost:3000/public/kitten.jpg for instance is wrong

// Test return obj of static request
fs.readFile(__dirname + '/public/image.jpg', function (err, data) {
  if (err) {
    throw err;
  }
  console.log(typeof data)
  console.log(data);
});

app.listen(3000);
