import express from 'express';
import {getLeagueMatches, getMatchDetails} from './api/index.js';
import {getFromCache} from './middleware/get_from_cache.js';
import path from 'path';
import 'babel-polyfill';

const app = express();

app.set('views', 'src/server/views/');
app.set('view engine', 'jade');

console.log(__dirname);
app.use(express.static(path.resolve(__dirname, '../public')));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/tournaments', (req, res) => {
    let tournament = getFromCache('the_international_203423235');
    res.send('hello');
});

app.get('/api', (req, res) => {
    getLeagueMatches(2733).then(response => {
        res.send(response);
    });
});

app.get('/match', (req, res) => {
    getMatchDetails(1512153177).then(response => {
        res.send(response);
    });
});

module.exports = app;
