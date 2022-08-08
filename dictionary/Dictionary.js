const express = require('express');
const app = express();
const pug = require('pug');
const db = require('./word');
app.set('view engine', 'pug');


app.use(express.json())
app.use(express.urlencoded({ extended: true }));
// to use .html file
app.use(express.static('.'));

// to use .pug file
// app.use(express.static('public'));
// app.use(express.static('css'));

app.get('/', (req, res) => {
    // res.render('dictionary');

    // to use .html file
    console.log('__dirname => ' + __dirname);
    res.sendFile(__dirname + '/public/dict.html')
})

app.get('/lookup', async (req, res) => {
    let lookUpVal = req.query.uInput
    const result = await db.word(lookUpVal);
    // console.log(result)
    res.json(result)
})

app.listen(3002, () => {
    console.log('Dictionary server is running at 3002');
})