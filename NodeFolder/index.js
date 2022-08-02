const express = require('express');
const app = express();
const path = require('path');


app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use(express.static('css'))

app.get('/add-product', (req, res, next) => {
    console.log('In the middleware!');
    res.sendFile(__dirname + '/add-product.html');
});

app.post('/result', (req, res, next) => {
    console.log(req.body);
    let fNum = parseInt(req.body.num1);
    let lNum = parseInt(req.body.num2);
    let choice = req.body.calc;
    let result;
    switch (choice) {
        case 'add':
            result = fNum + lNum;
            break;
        case 'sub':
            result = fNum - lNum;
            break;
        case 'divide':
            result = fNum / lNum;
            break;
        case 'mult':
            result = fNum * lNum;
            break;
        default:
            break;
    }
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Get Product</title>
        <link href="calc.css" rel="stylesheet"/>
    </head>
    <body>
        <div class="result">
            <h3>The Answer is: ${result.toPrecision(4)}</h3>  
            <a href="/add-product">Another Calculation</a>
        </div>
           
    </body>
    
    </html>
    `)
    
})

app.listen(3000, () => {
    console.log('Server running');
})