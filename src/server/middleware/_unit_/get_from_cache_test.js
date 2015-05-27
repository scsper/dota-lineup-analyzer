/* global describe, it */
var getFromCache = require('../get_from_cache.js');

describe('./get_from_cache', function() {
    it('gets the tournament from the cache', function() {
        // mockery uses paths from the caller, not the test.
        mockery.registerMock('../cache/the_international_2014.json', {
            id: 600,
            matches: [{
                dire: {
                    heroes: [{
                        "id": 42,
                        "name": "Wraith King"
                    }, {
                        "id": 17,
                        "name": "Storm Spirit"
                    }, {
                        "id": 57,
                        "name": "Omniknight"
                    }, {
                        "id": 33,
                        "name": "Enigma"
                    }, {
                        "id": 49,
                        "name": "Dragon Knight"
                    }]
                },
                id: 772548096,
                radiant: {
                    heroes: [{
                        "id": 65,
                        "name": "Batrider"
                    }, {
                        "id": 101,
                        "name": "Skywrath Mage"
                    }, {
                        "id": 81,
                        "name": "Chaos Knight"
                    }, {
                        "id": 91,
                        "name": "Io"
                    }, {
                        "id": 80,
                        "name": "Lone Druid"
                    }]
                },
                winner: "dire"
            }]
        });

        var tournament = getFromCache('the_international_2014');

        expect(tournament).to.be.an.object;
        expect(tournament.id).to.equal(600);
    });

    context('when the tournament does not exist', function() {
        it('returns null', function() {
            var tournament = getFromCache('does_not_exist');

            expect(tournament).to.be.null;
        });

        it('does not throw', function() {
            expect(function() {
                getFromCache('does_not_exist');
            }).to.not.throw;
        });
    });
});
