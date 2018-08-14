const express = require('express');
const multer = require('multer');
const ejs = require('ejs');
const path = require('path');

const port = 3000;

let app = express();

app.set('view engine', 'ejs');

app.use(express.static('./public'));

app.get('/', (req, res) => res.render('index'));

app.listen(port, () => console.log(`app listen on port ${port}`));