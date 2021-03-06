require('babel-polyfill');
var api = require('./compiled/api');
var fs = require('fs');

function getLeague(leagueId, name) {
    var LeagueScraper = require('./compiled/scrapers/league.js');
    var league = new LeagueScraper(leagueId);

    var interval = setInterval(function() {
        if (league.isDoneUpdating()) {
            fs.writeFile('./src/server/cache/' + name + '.json',
                JSON.stringify(league.serialize(), null, 2),
                function(err) {
                    if (err) {
                        return console.log(err);
                    }

                    console.log("The file was saved!");
                    clearInterval(interval);
                }
            );
        }
    }, 2000);
}

// Don't want to get locked out of the Dota Api while developing.
function getHeroes() {
    api.getHeroes().then(function(response) {
        fs.writeFile('./src/server/cache/heroes.json', JSON.stringify(response.body.result.heroes, null, 2),
            function(error) {
                if (error) {
                    console.error('error! heroes failed to fetch:', error);
                } else {
                    console.log('The heroes were saved!');
                }
            }
        );
    });
}


function _getCombinations(array, start, storedValues, combinations) {
    if (start === array.length) {
        return;
    }

    combinations.push(storedValues + array[start]);

    _getCombinations(array, start + 1, storedValues + array[start], combinations);
    _getCombinations(array, start + 1, storedValues, combinations);
}

function _generateImageLinks() {
    var BASE_IMAGE_URL = 'http://cdn.dota2.com/apps/dota2/images/heroes/';
    var IMAGE_SUFFIX = '_sb.png';
    var heroes = require('./src/server/cache/heroes.json');
    var heroIdToImageUrlMap = {};

    var imageLinks = heroes.forEach(function(hero) {
        var heroName = hero.name.split('npc_dota_hero_')[1];

        heroIdToImageUrlMap[hero.id] = BASE_IMAGE_URL + heroName + IMAGE_SUFFIX;
    });

    console.log(JSON.stringify(heroIdToImageUrlMap, null, 4));
}
// var combinations = [];
// _getCombinations(['A', 'B', 'C', 'D', 'E'], 0, '', combinations);
//
// console.log(combinations);
// console.log(combinations.length);

// getHeroes();

// _generateImageLinks();

getLeague(4210, 'dotapit_season_4');
