

var env = require('dotenv').load();

//Expressjs
var express = require('express');
var app = express();

//middleware

//Body Parser
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//For Passport
var passport = require('passport');
var session = require('express-session');

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

//Synch Database
var models = require("./app/models");

models.sequelize.sync().then(function() {
  console.log("Nice! Database looks fine!")  
})
.catch(function(err){
    console.log(err, "Something went wrong with the database Update!")
});


//Handlebars 

var exphbs = require('express-handlebars');

app.set('views', './app/views')
app.engine('hbs', exphbs({
    extname: '.hbs'
}));
app.set('view engine', '.hbs');

var authRoute = require('./app/routes/auth.js')(app);

app.listen(5000, function (err) {

    if (!err)
        console.log("Site is live");
    else console.log(err)

});