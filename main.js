const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const config = require('./config');

mongoose.connect(config.database.url, function (err) {
    if (err) {
        console.log('Error connecting to database');
    } else {
        console.log('Connected to database');
    }
});

const app = express();

// Body parse incoming request
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Schema's
var User = mongoose.model('User', require('./database/schemas/user'));

app.get('/', function (req, res) {
    res.send('<a href="/login">Login</a> <a href="/register">Register</a>');
});

app.get('/login', function (req, res) {
    res.send('<form method="POST" action="/login"><input type="text" name="email" /> <input type="password" name="password" /><input type="submit" /></form>');
});

app.get('/register', function (req, res) {
    res.send('<form method="POST" action="/register"><input type="text" name="email" /> <input type="password" name="password" /> <input type="password" name="re-password" /> <input type="submit" /></form>');
});

app.post('/login', function (req, res) {	    
    const form = req.body;
    
    User.find({ email: form.email }, function (err, users) {
        if (users.length > 0) {
            res.json(users[0]);
        } else {
            res.json({ err: 'User not found' });
        }
    });
});

app.post('/register', function (req, res) {
    const form = req.body;
    const user = new User({
        email: form.email,
        password: form.password
    });
    
    user.save();
    res.redirect('/login');
});

app.listen(config.port, function () {
    console.log('Running on ' + config.port + ' baby!');
});