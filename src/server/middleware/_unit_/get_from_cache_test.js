/* global describe, it */
var getFromCache = require('../get_from_cache.js');

describe('./get_from_cache', function() {
    it('gets the tournament from the cache', function() {
        // mockery uses paths from the caller, not the test.
        mockery.registerMock('../cache/the_international_2014.json', require('./cache_fixture.js'));

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
