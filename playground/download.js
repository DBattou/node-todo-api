const express = require('express');

const port = 3000;

const app = express();

app.get('/download', function(req, res){
    var file = __dirname + '/downloadable.txt';
    res.download(file); // Set disposition and send it.
});

app.listen(port, () => {
    console.log(`App started on port ${port}`);
    }
);