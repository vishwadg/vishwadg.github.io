const express = require('express');
const app = express();
const pug = require('pug');
const db = require('./word-normal');
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
    res.sendFile(__dirname + '/public/dict-normal.html')
})

app.get('/lookup', (req, res) => {
    let lookUpVal = req.query.uInput
    db.word(lookUpVal, (error, results) => {
        console.log("lookup " + JSON.stringify(results))
        res.json(results)
        // res.send(JSON.stringify(results))
    });
})

app.listen(3004, () => {
    console.log('Dictionary server is running at 3002');
})