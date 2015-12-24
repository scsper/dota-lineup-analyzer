require('babel-polyfill');
var api = require('./compiled/api');

var fs = require('fs');
    LeagueScraper = require('./compiled/scrapers/league.js'),
    league = new LeagueScraper(2922);

// var interval = setInterval(function() {
//     if (league.isDoneUpdating()) {
//         fs.writeFile("./src/server/cache/wca_2015.json",
//             JSON.stringify(league.serialize(), null, 2),
//             function(err) {
//                 if (err) {
//                     return console.log(err);
//                 }

//                 console.log("The file was saved!");
//                 clearInterval(interval);
//             }
//         );
//     }
// }, 2000);

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

// var combinations = [];
// _getCombinations(['A', 'B', 'C', 'D', 'E'], 0, '', combinations);
//
// console.log(combinations);
// console.log(combinations.length);

getHeroes();
