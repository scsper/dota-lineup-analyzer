require('babel-polyfill');

var fs = require('fs'),
    LeagueScraper = require('./compiled/scrapers/league.js'),
    league = new LeagueScraper(3671);

var interval = setInterval(function() {
    if (league.isDoneUpdating()) {
        fs.writeFile("./src/server/cache/frankfurt_major_2015.json",
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
