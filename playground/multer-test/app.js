const express = require('express');
// const multer = require('multer');

const port = 3000;

let app = express();

app.use(express.static('./public'));

app.get('/', (req, res) => {
    res.send('YOOOOLOOOO');
})

// app.post('/upload/:file', (req, res)=>{
//     let path = req
// })

app.get('/download/:file', (req, res) => {
    let file = req.params.file;
    return res.download('./public/' + file);
})

app.listen(port, () => console.log(`app listen on port ${port}`));