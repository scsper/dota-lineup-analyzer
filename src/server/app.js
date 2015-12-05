import express from 'express';
import api from './api/index.js';
import getFromCache from './middleware/get_from_cache.js';
import 'babel-polyfill';

const app = express();

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
    api.getMatchDetails(1512153177).then(function(response) {
        res.send(response);
    });
});

module.exports = app;
