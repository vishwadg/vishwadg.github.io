const mysql = require('mysql');

let conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'entries'
})

const word = (userInput, onDataFound) => {
    conn.query(`SELECT * FROM entries where word = '${userInput}'`, (error, results) => {
        if (error) console.log(error);
        else onDataFound(true, results);
    });
}

exports.word = word;



