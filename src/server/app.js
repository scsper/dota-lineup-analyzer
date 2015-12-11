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
    let heroes = getFromCache('heroes');
    console.log(heroes);
    res.render('index', {
        heroes: heroes
    });
});

app.get('/tournaments', (req, res) => {
    let tournamentName = req.query.tournamentName;
    let tournament = getFromCache(tournamentName);
    res.send(tournament);
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
