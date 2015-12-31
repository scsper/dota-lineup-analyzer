import express from 'express';
import {getLeagueMatches, getMatchDetails} from './api/index.js';
import {getFromCache} from './middleware/get_from_cache.js';
import leagueIdsToLeagueNames from './enums/league_ids_to_league_names';
import path from 'path';
import 'babel-polyfill';

const app = express();

app.set('views', 'src/server/views/');
app.set('view engine', 'jade');

app.use(express.static(path.resolve(__dirname, '../public')));

// TODO move this to a more appropriate place
function getLeagueFromPatch(patch) {
    let patchToLeagues = getFromCache('patch_to_leagues');
    let leagueIds = patchToLeagues[patch];

    let tournaments = {};

    leagueIds.forEach(leagueId => {
        let leagueName = leagueIdsToLeagueNames[leagueId].cacheName;
        tournaments[leagueId] = getFromCache(leagueName);
    });

    return tournaments;
}

app.get('/', (req, res) => {
    const heroes = getFromCache('heroes');
    const patchToLeagues = getFromCache('patch_to_leagues');
    const currentPatch = '6.86';
    const tournaments = getLeagueFromPatch(currentPatch);

    res.render('index', {
        heroes: heroes,
        patchToLeagues: patchToLeagues,
        tournaments: tournaments,
        currentPatch: currentPatch,
        leagueIdsToLeagueNames: leagueIdsToLeagueNames
    });
});

app.get('/tournaments', (req, res) => {
    const patch = req.query.patch;
    const tournaments = getLeagueFromPatch(patch);

    res.send(tournaments);
});

app.get('/matches', (req, res) => {
    const leagueId = req.query.leagueId;

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
