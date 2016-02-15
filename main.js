const express = require('express');

const app = express();

const config = require('./config');

app.get('/', function (req, res) {
    res.send('Hello world!');
});

app.listen(config.port, function () {
    console.log('Running on ' + config.port + ' baby!');
});