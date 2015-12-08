import express from 'express';
import {getLeagueMatches, getMatchDetails} from './api/index.js';
import {getFromCache} from './middleware/get_from_cache.js';
import path from 'path';
import 'babel-polyfill';

const app = express();

app.set('views', 'src/server/views/');
app.set('view engine', 'jade');

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/tournaments', (req, res) => {
    let tournament = getFromCache('the_international_203423235');
    res.send('hello');
});

app.get('/matches', (req, res) => {
    let leagueId = req.query.leagueId;

    getLeagueMatches(leagueId).then(response => {
        try {
            const jsonResponse = JSON.parse(response.text);
            res.send(jsonResponse);
        } catch(e) {
            res.send({
                error: 'ERROR: Failed to parse JSON given by dota2 API.'
            });
        }
    });
});

app.get('/match', (req, res) => {
    getMatchDetails(1512153177).then(response => {
        res.send(response);
    });
});

module.exports = app;
