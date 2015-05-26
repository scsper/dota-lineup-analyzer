var express = require('express'),
    app = express(),
    getFromCache = require('./middleware/get_from_cache.js');

app.get('/tournaments', function (req, res) {
    var tournament = getFromCache('the_international_203423235');

    res.send('hello');
});

module.exports = app;
