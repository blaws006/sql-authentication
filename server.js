var express = require('express');
var passport = require('passport');
var session = require('express-session');
var bodyParser = require('body-parser');



var app = express();

//middleware

//Body Parser
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//For Passport

app.use(session({
    secret: 'b-law',
    resave: true,
    saveUninitialized: true
})) // session secret

app.use(passport.initialize());

app.use(passport.session());

app.get('/', function (req, res) {

    res.send('Welcome to Passport with Sequelize');

});


app.listen(5000, function (err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});