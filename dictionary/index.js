const express = require('express');
const app = express();
const mysql = require('mysql2');
const pug = require('pug');
app.set('view engine', 'pug');

// let connection;
let result;
let pool;

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(express.static('css'));

app.get('/', (req, res) => {
    pool = mysql.createPool({
        host: 'localhost',
        user: 'root',
        password: 'Root@123',
        database: 'entries',
        waitForConnections: true,
        connectionLimit: 10,
        queueLimit: 0
    });

    // For pool initialization, see above
    pool.getConnection(function (err, conn) {
        if (err) {
            console.log(err);
            result = 'Database connection error!'
        }
        res.render('dict', { result: result });
        pool.releaseConnection(conn);
    })
})

app.post('/lookup', (req, res) => {

    let userInput = req.body.uinput ? req.body.uinput : '';
    console.log("user input =>  ", userInput);
    pool.query('SELECT * FROM `entries` where `word` = ?', [userInput], (error, results, fields) => {
        if (error) {
            console.log(error);
            result = 'No result found!';
        } else {
            console.log("results -> ", JSON.stringify(results));
            result = results;
        }
        // res.send(JSON.stringify(results))
        res.redirect('/');
    })
})

app.listen(3002, () => {
    console.log('Dictionary server is running at 3002');
})