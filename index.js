const express = require('express')
const bodyParser = require('body-parser');
const app = express();
const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({extended: false});

app.listen(8900, ()=>{
    console.log("running server ");
})

// app.use((req, res, next) =>{
//     console.log('This is always on');
// })

app.use('/add-product', (req, res, next) =>{
    console.log('In the middleware!');
    res.statusCode = 200;
    res.setHeader("Content-type", "text/html");
    res.send(`<h1> The "Add Product" Page </h1>`);
    res.send(`<form action="/product method="post">
<input name ="title"> <button type ="submit"> Submit</button>
    </form>`)
    res.end();
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/')
})

app.use('/', (req, res, next) => {
    console.log(`In another middleware!`);
    res.send(`<h1> Hello from Express</h1>`);
});