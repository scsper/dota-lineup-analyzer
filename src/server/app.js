var express = require('express'),
    app = express(),
    api = require('./api/index.js'),
    getFromCache = require('./middleware/get_from_cache.js');

app.get('/tournaments', function (req, res) {
    var tournament = getFromCache('the_international_203423235');
    res.send('hello');
});

app.get('/api', function (req, res) {
    api.getLeagueMatches(2733).then(function(response) {
        res.send(response);
    });
});

app.get('/match', function (req, res) {
    api.getMatchDetails(1507683951).then(function(response) {
        res.send(response);
    });
});

module.exports = app;
