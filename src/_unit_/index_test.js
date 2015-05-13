var index = require('../index.js'),
    helper = require('../../test/setup/unit');

describe('./index.js', function() {
    it('equals 1', function() {
        expect(index()).to.equal(1);
    });
});
