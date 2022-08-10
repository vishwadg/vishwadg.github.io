const express = require('express');
const app = express();
const mysql = require('mysql2');

let result;
let pool;

pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'entries',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

pool.getConnection(function (err, conn) {
    if (err) {
        console.log(err);
        return []
    }
    // console.log(conn);
    pool.releaseConnection(conn);
})

const word = async (userInput) => {
    let param = `SELECT * FROM entries where word = '${userInput}'`
    const results = await pool.promise().query({ sql: param })
    // console.log(results[0]);
    return results[0];
}

exports.word = word;



