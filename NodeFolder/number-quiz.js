const express = require('express');
const sessions = require('express-session');
const cookieParser = require('cookie-parser');
const { v4: uuidv4 } = require('uuid');

const app = express();
const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
    secret: "abc123@123#@!!@#",
    sessionId: uuidv4(),
    saveUninitialized: true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(sessions({
    genid: (req) => {
        return uuidv4();
    }
}))

app.use(express.json())
app.use(express.urlencoded({extended: true}));
app.use(express.static('css'));
app.use(cookieParser())


app.set("view engine", "pug");

const ques = [
    "3, 1, 4, 1, 5",
    "1, 1, 2, 3, 5",
    "1, 4, 9, 16, 25",
    "2, 3, 5, 7, 11",
    "1, 2, 4, 8, 16"
]

const ans = [9, 8, 36, 13, 32];
let score = 0;
var pos = 0;
var session;
var isReset = false;

app.get('/', (req, res) => {
    // req.session.sessionId  = uuidv4();
    session = req.session;
    if (pos >= 5) {
        isReset = true;
    }
    console.log("score " + session.score + " POS => " + pos)
    console.log(session.sessionId);
    res.render('number-quiz', { ques: ques[pos], point: session.score ? session.score : 0, isReset, sessionId: session.sessionId });
});

app.post('/submit', (req, res, next) => {

    if (!req.session.score) {
        console.log(11111111);
        req.session.score = 0;
    }
    session = req.session;
    var userAns = parseInt(req.body.ans);
    var ansVal = ans[pos];

    console.log(userAns === ansVal);
    if (userAns === ansVal) {
        console.log(22222222);
        req.session.score = req.session.score + 1;
    }
    pos++;
    res.redirect("/");
});

app.post('/reset', (req, res, next) => {
    console.log(1221);
    pos = 0;
    isReset = false;
    req.session.destroy()
    res.redirect("/");
})


app.listen(3002, () => {
    console.log("Number quiz server running");
});
