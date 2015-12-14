import express from 'express';
import {getLeagueMatches, getMatchDetails} from './api/index.js';
import {getFromCache} from './middleware/get_from_cache.js';
import leagueMapper from './enums/league_ids_to_league_names';
import path from 'path';
import 'babel-polyfill';

const app = express();

app.set('views', 'src/server/views/');
app.set('view engine', 'jade');

app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
    let heroes = getFromCache('heroes');
    let patchToLeagues = getFromCache('patch_to_leagues');

    res.render('index', {
        heroes: heroes,
        patchToLeagues: patchToLeagues
    });
});

app.get('/tournaments', (req, res) => {
    let patch = req.query.patch;
    let patchToLeagues = getFromCache('patch_to_leagues');
    let leagueIds = patchToLeagues[patch];

    let tournaments = {};

    leagueIds.forEach(leagueId => {
        let leagueName = leagueMapper[leagueId];
        tournaments[leagueId] = getFromCache(leagueName);
    });

    res.send(tournaments);
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
