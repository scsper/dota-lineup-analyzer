var chaiHelper = require('./helpers/chai'),
    sinonHelper = require('./helpers/sinon');

function helpers() {
    chaiHelper();
    sinonHelper();
}

module.exports = helpers();
