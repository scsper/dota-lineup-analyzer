var express = require('express');
var app = express();
var getMessage = require('./middleware/message.js');

app.get('/', getMessage, function (req, res) {
    res.send(req.message);
});

module.exports = app;
