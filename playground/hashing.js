const { SHA256 } = require('crypto-js');
const jwt = require('jsonwebtoken');

var data = {
  id: 10,
  coucou: 'Maman',
  dfdfd: 'fdfdd',
  sdqdsqd: 'sdfsdf',
  fdff: 67900
};

var token = jwt.sign(data, '123abc');
console.log(token);


var decoded = jwt.verify(token, '123abc');
console.log(decoded);

//jwt.verify

// var message = 'Hello I am user 3';
// var hash = SHA256(message);
//
// console.log(`message : ${message}`);
// console.log(`hash : ${hash}`);
//
//
// var data = {
//   id: 4,
//
// };
//
// var token = {
//   data,
//   hash: SHA256(JSON.stringify(data)).toString()
// }